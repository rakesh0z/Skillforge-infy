import React, { useState } from 'react';
import axios from '../../api/axiosConfig';

const CourseForm = () => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/courses', { title });
      alert('Course created');
    } catch (err) {
      console.error(err);
      alert('Create failed');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create / Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CourseForm;
