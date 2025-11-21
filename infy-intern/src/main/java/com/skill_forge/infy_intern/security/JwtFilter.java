package com.skill_forge.infy_intern.security;

import com.skill_forge.infy_intern.model.User;
import com.skill_forge.infy_intern.service.AuthService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public JwtFilter(AuthService authService, JwtUtil jwtUtil) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res, FilterChain chain)
            throws ServletException, IOException {

        String path = req.getRequestURI();

        // Skip auth endpoints
        if (path.startsWith("/api/auth/")) {
            chain.doFilter(req, res);
            return;
        }

        String authHeader = req.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // return 401 Unauthorized (no header)
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.setContentType("application/json");
            res.getWriter().write("{\"error\":\"Missing or invalid Authorization header\"}");
            return;
        }

        String token = authHeader.substring(7);

        try {
            // Check token format first (this might throw exception)
            if (!jwtUtil.isTokenValidFormat(token)) {
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                res.setContentType("application/json");
                res.getWriter().write("{\"error\":\"Invalid token format\"}");
                return;
            }
            
            // Check if token is expired (handles ExpiredJwtException internally)
            if (jwtUtil.isTokenExpired(token)) {
                res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                res.setContentType("application/json");
                res.getWriter().write("{\"error\":\"Token expired. Please log in again.\"}");
                return;
            }

            // Extract email and role (these should work if token is valid and not expired)
            String email = jwtUtil.extractEmail(token);
            String role = jwtUtil.extractRole(token);

            // Validate token format and expiration (already checked above)
            // Note: validateToken checks activeSessions which is lost on server restart
            // For now, we'll allow valid tokens even if not in activeSessions
            // You can enable strict session validation by uncommenting the check below
            /*
            if (!authService.validateToken(token)) {
                res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                res.setContentType("application/json");
                res.getWriter().write("{\"error\":\"Session invalid or expired (logged in from another device)\"}");
                return;
            }
            */

            if (email != null && role != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                // Verify user exists in database
                User user = authService.getUserByEmail(email);
                if (user == null) {
                    res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    res.setContentType("application/json");
                    res.getWriter().write("{\"error\":\"User not found\"}");
                    return;
                }

                // Verify role matches
                if (!role.equals(user.getRole().name())) {
                    res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                    res.setContentType("application/json");
                    res.getWriter().write("{\"error\":\"Role mismatch\"}");
                    return;
                }

                // build authorities from role claim
                List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role));

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(user, null, authorities);

                SecurityContextHolder.getContext().setAuthentication(auth);
            }
            
            // If email or role is null, deny access (even if authentication was already set)
            if (email == null || role == null) {
                res.setStatus(HttpServletResponse.SC_FORBIDDEN);
                res.setContentType("application/json");
                res.getWriter().write("{\"error\":\"Invalid token: missing email or role\"}");
                return;
            }

        } catch (ExpiredJwtException e) {
            res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            res.setContentType("application/json");
            res.getWriter().write("{\"error\":\"Token expired. Please log in again.\"}");
            return;
        } catch (Exception e) {
            res.setStatus(HttpServletResponse.SC_FORBIDDEN);
            res.setContentType("application/json");
            res.getWriter().write("{\"error\":\"Invalid token or unauthorized access.\"}");
            return;
        }

        chain.doFilter(req, res);
    }
}
