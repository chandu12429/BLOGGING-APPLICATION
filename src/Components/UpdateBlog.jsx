import React, { useState } from 'react';
import axios from 'axios';
import './UpdateBlog.css'; // Importing CSS

const UpdateBlog = () => {
  const [blogId, setBlogId] = useState(''); // State to store the input ID
  const [blog, setBlog] = useState(null); // State to store the blog data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state
  const [success, setSuccess] = useState(''); // Success state for update confirmation

  // Function to fetch the blog by ID
  const fetchBlogById = async () => {
    if (!blogId) {
      setError('Please enter a blog ID');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.get(`http://localhost:2255/api/blogs/getById/${blogId}`);
      setBlog(response.data);
    } catch (err) {
      setError('Blog with the given ID not found.');
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission (update the blog)
  const handleUpdateBlog = async (e) => {
    e.preventDefault();

    if (!blog) return;

    try {
      await axios.put(`http://localhost:2255/api/blogs/updateById/${blogId}`, blog);
      setSuccess('Blog updated successfully!');
      setError('');
    } catch (err) {
      setError('Failed to update blog. Please try again.');
    }
  };

  // Handle input changes and update blog state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  return (
    <div className="update-blog-container">
      <h1>Update Blog</h1>

      {/* Input field to enter the blog ID */}
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter Blog ID"
          value={blogId}
          onChange={(e) => setBlogId(e.target.value)}
          className="id-input"
        />
        <button onClick={fetchBlogById} className="fetch-button">Fetch Blog</button>
      </div>

      {/* Loading and Error Handling */}
      {loading && <p>Loading blog details...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Blog Details Form for Updating */}
      {blog && (
        <form onSubmit={handleUpdateBlog} className="update-form">
          <div className="form-group">
            <label>ID</label>
            <input type="number" value={blog.id} readOnly className="form-input" />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={blog.title}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              value={blog.content}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Summary</label>
            <input
              type="text"
              name="summary"
              value={blog.summary}
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Publication Date</label>
            <input
              type="date"
              name="publicationDate"
              value={new Date(blog.publicationDate).toISOString().split('T')[0]} // Format date to 'YYYY-MM-DD'
              onChange={handleInputChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="update-button">Update Blog</button>
        </form>
      )}
    </div>
  );
};

export default UpdateBlog;
