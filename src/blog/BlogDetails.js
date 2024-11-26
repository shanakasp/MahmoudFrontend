import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { BLOG_BASE_URL } from "../services/blogService";
import Loading from "../utils/Loading";
import "./BlogStyle.css";

const BlogDetails = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const [blog, setBlog] = useState({
    title: "",
    blogImage: "",
    summary: "",
    description: "",
    facebookLink: "",
    linkedInLink: "",
    githubLink: "",
    author: "",
    createdAt: new Date(),
  });

  // Function to properly format the image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    // Remove any leading dots or slashes and ensure proper path formatting
    const cleanPath = imagePath.replace(/^\.\.\//, "").replace(/^\//, "");
    return `${BLOG_BASE_URL}/${cleanPath}`;
  };

  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`${BLOG_BASE_URL}/api/blogs/list/${id}`);
      setBlog(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to fetch blog data!");
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (e, _id) => {
    e.preventDefault();

    try {
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmResult.isConfirmed) {
        const response = await fetch(
          `${BLOG_BASE_URL}/api/blogs/list/delete/${_id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const json = await response.json();
          throw new Error(json.error || "Failed to delete blog post!");
        }

        await Swal.fire({
          title: "Deleted!",
          text: "Blog has been deleted.",
          icon: "success",
          timer: 2000,
        });

        navigate("/api/blogs");
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete blog post!",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <section className="blog-details text-muted">
      {blog && (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {!imageError ? (
                <img
                  src={`http://localhost:5000/${blog.blogImage}`}
                  alt={blog.title || "Blog image"}
                  className="img-fluid blog-img"
                  onError={(e) => {
                    console.error("Image failed to load:", e);
                    setImageError(true);
                  }}
                  style={{
                    maxHeight: "500px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  className="text-center p-4 bg-light"
                  style={{
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <i className="fa fa-image fa-3x mb-3"></i>
                    <p>Image could not be loaded</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="row social-icons mt-4">
            <div className="col-md-12">
              <h1 className="blog-title">{blog.title}</h1>

              <div className="d-flex flex-wrap align-items-center gap-3 text-muted my-3">
                {blog.author && (
                  <span className="d-inline-flex align-items-center">
                    <i className="fa fa-user-circle me-1"></i>
                    {blog.author}
                  </span>
                )}

                {blog.facebookLink && (
                  <span className="d-inline-flex align-items-center">
                    <a
                      href={blog.facebookLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i className="fa fa-facebook-official me-1"></i>
                      Facebook
                    </a>
                  </span>
                )}

                {blog.linkedInLink && (
                  <span className="d-inline-flex align-items-center">
                    <a
                      href={blog.linkedInLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i className="fa fa-linkedin-square me-1"></i>
                      LinkedIn
                    </a>
                  </span>
                )}

                {blog.githubLink && (
                  <span className="d-inline-flex align-items-center">
                    <a
                      href={blog.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted"
                    >
                      <i className="fa fa-github me-1"></i>
                      Github
                    </a>
                  </span>
                )}

                <span className="d-inline-flex align-items-center">
                  <i className="fa fa-calendar me-1"></i>
                  {format(new Date(blog.createdAt), "MMMM d, yyyy")}
                </span>
              </div>

              <hr />

              <div className="blog-content">
                <ReactMarkdown>{blog.description || ""}</ReactMarkdown>
              </div>
            </div>
          </div>

          <hr />

          <div className="row">
            <div className="col">
              <Link to="/api/blogs" className="btn btn-outline-warning btn-lg">
                <i className="fa fa-chevron-left me-2"></i>
                Back
              </Link>
            </div>
            <div className="col text-end">
              <button
                onClick={(e) => deleteBlog(e, blog._id)}
                className="btn btn-danger btn-lg"
              >
                <i className="fa fa-trash me-2"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogDetails;
