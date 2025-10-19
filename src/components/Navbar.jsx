import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>SkillForge</div>
      <div style={styles.links}>
        <Link to="/">Home</Link>
        <Link to="/student">Student</Link>
        <Link to="/instructor">Instructor</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 1rem',
    background: '#282c34',
    color: 'white',
    alignItems: 'center',
  },
  brand: { fontWeight: 'bold', fontSize: '1.2rem' },
  links: { display: 'flex', gap: '1rem' },
};

export default Navbar;
