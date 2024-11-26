import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BLOG_BASE_URL } from "../services/blogService"; // Ensure this is correctly set
import Loading from "../utils/Loading";
import "./BlogStyle.css";

const BlogList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Search Term
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, blogs]);

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`${BLOG_BASE_URL}/api/blogs/list`);
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="alert alert-danger">
        Error loading blogs: {error.message}
      </div>
    );
  }

  return (
    <section className="blog-list">
      <div className="container mt-3">
        <div className="row">
          <div className="col">
            {blogs.length === 0 && (
              <div className="alert alert-warning mt-4 d-flex" role="alert">
                <div className="text-center lead h5">
                  <i className="fa fa-warning"></i> No blogs found!!
                  &nbsp;&nbsp;
                  <Link
                    className="btn btn-outline-success btn-sm"
                    to="/api/dashboard/create"
                  >
                    Add blog.
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="row p-3">
          <div className="col">
            {blogs.length > 0 && (
              <>
                <h1 className="text-dark fw-bold text-uppercase mt-4">
                  Explore the Latest Tech Articles
                </h1>
                <hr />
              </>
            )}
            <div className="data-list">
              <div className="search_term">
                <input
                  type="text"
                  className="form-control form-control-lg search-term"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleChange}
                />
              </div>
            </div>

            {searchResults.length === 0 && searchTerm !== "" ? (
              <div className="alert alert-danger">
                <i className="fa fa-warning"></i> &nbsp; The searched term of
                &nbsp;
                <b>
                  <Link to="/api/blogs">{searchTerm}</Link>
                </b>
                &nbsp; is not found!
              </div>
            ) : (
              searchResults.map((blog) => (
                <div className="row" key={blog._id}>
                  <div className="col-md-4 mb-2">
                    <Link
                      to={`/api/blogs/blog-details/${blog._id}/${blog.title}`}
                    >
                      <img
                        src={`http://localhost:5000/${blog.blogImage}`}
                        alt={blog.title || "blog post image"}
                        className="img-fluid bg-white img-thumbnail mb-1"
                      />
                    </Link>
                  </div>
                  <div className="col-md-7">
                    <Link
                      to={`/api/blogs/blog-details/${blog._id}/${blog.title}`}
                      className="text-secondary"
                    >
                      <h1>{blog.title}</h1>
                    </Link>
                    <p>{blog.summary}</p>

                    <p className="text-muted">
                      <small>
                        <b>
                          <i
                            className="fa fa-user-circle"
                            aria-hidden="true"
                            title={blog && blog.author}
                          ></i>
                          &nbsp; &nbsp;
                        </b>
                        {blog ? blog.author : "Anonymous"} &nbsp;&nbsp; |
                        &nbsp;&nbsp;
                      </small>
                      <small>
                        <b>
                          <i className="fa fa-calendar" aria-hidden="true"></i>
                        </b>
                        &nbsp; &nbsp;
                        {format(new Date(blog.createdAt), "MMMM d, yyyy")}{" "}
                      </small>
                    </p>

                    <hr />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
