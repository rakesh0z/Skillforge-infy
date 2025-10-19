export const isLoggedIn = () => !!localStorage.getItem('token');

export const getUserRole = () => {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user.role;
  } catch (e) {
    return null;
  }
};
