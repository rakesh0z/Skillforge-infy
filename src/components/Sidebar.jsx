import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside style={styles.side}>
      <ul style={styles.ul}>
        <li><Link to="/student">Dashboard</Link></li>
        <li><Link to="/student/analytics">Analytics</Link></li>
        <li><Link to="/student/quiz">Attempt Quiz</Link></li>
      </ul>
    </aside>
  );
};

const styles = {
  side: {
    width: '200px',
    padding: '1rem',
    background: '#f4f4f4',
    minHeight: 'calc(100vh - 56px)'
  },
  ul: { listStyle: 'none', padding: 0 }
};

export default Sidebar;
