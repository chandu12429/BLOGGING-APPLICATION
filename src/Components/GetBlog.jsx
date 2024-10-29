import React, { useState } from 'react';
import axios from 'axios';
import './GetBlog.css'; // Importing CSS

const GetBlog = () => {
  const [id, setId] =useState(''); // State to store the input ID
  const [blog, setBlog] =useState(null); // State to store the fetched blog data
  const [loading, setLoading] =useState(false); // Loading state
  const [error, setError] =useState(''); // Error state

  // Function to handle blog fetch by ID
  const fetchBlog = async () => {
    if (!id) {
      setError('Please enter a blog ID');
      return;
    }

    setLoading(true);
    setError(''); // Clear previous errors

    try {
      const response = await axios.get(`http://localhost:2255/api/blogs/getById/${id}`);
      setBlog(response.data);
    } catch (err) {
      setError('Blog with the given ID not found.');
      setBlog(null); // Clear the blog data if there's an error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="get-blog-container">
      <h1>Retrieve Blog by ID</h1>

      {/* Input field to enter the blog ID */}
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter Blog ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="id-input"
        />
        <button onClick={fetchBlog} className="fetch-button">Get Blog</button>
      </div>

      {/* Loading and Error Handling */}
      {loading && <p>Loading blog details...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Blog Details */}
      {blog && (
        <div className="blog-details">
          <h2>{blog.title}</h2>
          <p><strong>ID:</strong> {blog.id}</p>
          <p><strong>Summary:</strong> {blog.summary}</p>
          <p><strong>Content:</strong> {blog.content}</p>
          <p><strong>Publication Date:</strong> {new Date(blog.publicationDate).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default GetBlog;
