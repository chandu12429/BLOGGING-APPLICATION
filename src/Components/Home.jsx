import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importing Link for navigation
import './Home.css'; // Importing CSS for styling

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [deleteError, setDeleteError] = useState(''); // Error message state for delete

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:2255/api/blogs/getAllBlogs');
        setBlogs(response.data);
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Function to handle deleting a blog
  const handleDelete = async (id) => {
    setDeleteError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      await axios.delete(`http://localhost:2255/api/blogs/deleteBlog/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id)); // Remove deleted blog from list
      setSuccessMessage('Blog deleted successfully!');
    } catch (err) {
      setDeleteError('Failed to delete blog. Please try again.');
    } finally {
      setLoading(false);
      // Hide the success or error message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
        setDeleteError('');
      }, 3000);
    }
  };

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>

      {loading && <p>Loading blogs...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Add Blog Button */}
      <div className="add-blog-container">
        <Link to="/add-blog" className="add-blog-button">+ Add Blog</Link>
      </div>

      {/* Success and error messages for delete */}
      {successMessage && <p className="success-message">{successMessage}</p>}
      {deleteError && <p className="error-message">{deleteError}</p>}

      {!loading && !error && blogs.length > 0 && (
        <div className="table-container">
          <h2>All Blogs</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Summary</th>
                <th>Published Date</th>
                <th>Actions</th> {/* Added column for actions */}
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.id}</td>
                  <td>{blog.title}</td>
                  <td>{blog.content}</td>
                  <td>{blog.summary}</td>
                  <td>{new Date(blog.publicationDate).toLocaleDateString()}</td>
                  <td className="actions">
                    {/* Styled Links for actions */}
                    <Link to={`/getBlog/`} className="get-blog-link">Get Blog</Link>
                    <Link to={`/updateBlog/`} className="update-blog-link">Update Blog</Link>
                    {/* Delete Blog Button */}
                    <button 
                      className="delete-blog-button" 
                      onClick={() => handleDelete(blog.id)} 
                      disabled={loading}
                    >
                      {loading ? 'Deleting...' : 'Delete Blog'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && blogs.length === 0 && <p>No blogs available.</p>}
    </div>
  );
};

export default Home;
