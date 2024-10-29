import React, { useState } from 'react';
import axios from 'axios';
import './AddBlog.css'; // Assuming you'll add some styling here

const AddBlog = () => {
  // State to manage form inputs
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [summary, setSummary] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs (e.g., title and content must not be empty)
    if (!title || !content || !summary || !publicationDate) {
      setError('All fields are required.');
      return;
    }

    // Clear any previous errors
    setError('');

    // Data to send to the backend
    const newBlog = {
      title,
      content,
      summary,
      publicationDate,
    };

    try {
      // Sending POST request to backend
      const response = await axios.post('http://localhost:2255/api/blogs/save', newBlog);
      setSuccess('Blog added successfully!');
      
      // Clear form fields after successful submission
      setTitle('');
      setContent('');
      setSummary('');
      setPublicationDate('');
    } catch (err) {
      setError('Failed to add blog. Please try again.');
    }
  };

  return (
    <div className="add-blog-container">
      <h1>Add a New Blog</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter blog content"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="summary">Summary:</label>
          <input
            type="text"
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Enter blog summary"
          />
        </div>

        <div className="form-group">
          <label htmlFor="publicationDate">Publication Date:</label>
          <input
            type="date"
            id="publicationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-btn">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
