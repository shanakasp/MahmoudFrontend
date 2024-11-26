import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BLOG_BASE_URL } from "../services/blogService";
import "./BlogStyle.css";

const AddBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    description: "",
    author: "",
    facebookLink: "",
    linkedInLink: "",
    githubLink: "",
    blogImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
    setFormData({
      ...formData,
      blogImage: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("summary", formData.summary);
    data.append("description", formData.description);
    data.append("author", formData.author);
    data.append("facebookLink", formData.facebookLink);
    data.append("linkedInLink", formData.linkedInLink);
    data.append("githubLink", formData.githubLink);
    data.append("blogImage", formData.blogImage);

    try {
      const response = await axios.post(
        `${BLOG_BASE_URL}/api/blogs/create`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Success",
        text: "New blog added successfully!",
        showConfirmButton: false,
        timer: 2500,
      });

      // setTimeout(() => {
      //   navigate("/");
      // }, 2000);
    } catch (error) {
      setAlertMessage("Failed to add blog. Please try again.");
      setAlertSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="add-blog">
      <div className="container mt-3">
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row bg-white p-3">
          <div className="col">
            <h1 className="p-3">Add New Blog</h1>
            <hr />
            <p className="lead">
              Please provide the new blog details in the form below.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="title"
                  value={formData.title}
                  placeholder="Title"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="summary"
                  value={formData.summary}
                  placeholder="Summary"
                  onChange={handleChange}
                  required
                />
              </div>
              {/* Author */}

              <div className="mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="author"
                  value={formData.author}
                  placeholder="author"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <textarea
                  name="description"
                  value={formData.description}
                  className="form-control form-control-lg"
                  placeholder="Description"
                  onChange={handleChange}
                  rows={10}
                  required
                ></textarea>
              </div>

              {/* Facebook */}

              <div className="mb-4">
                <div className="input-group has-validation">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-facebook" aria-hidden="true"></i>{" "}
                  </span>
                  <input
                    name="facebookLink"
                    value={formData.facebookLink}
                    className="form-control form-control-lg"
                    placeholder="facebook link"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* LinkedIn */}
              <div className="mb-4">
                <div className="input-group has-validation">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>{" "}
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="linkedInLink"
                    value={formData.linkedInLink}
                    placeholder="linkedIn link"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Github */}

              <div className="mb-4">
                <div className="input-group has-validation">
                  <span className="input-group-text" id="inputGroupPrepend">
                    <i className="fa fa-github" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="githubLink"
                    value={formData.githubLink}
                    placeholder="github link"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="file"
                  className="form-control form-control-lg"
                  name="blogImage"
                  id="blogImage"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div className="d-gridxx gap-2xx">
                <button
                  type="submit"
                  className="btn btn-outline-primary mt-2 fw-bold btn-lg btn-block"
                  disabled={
                    loading ||
                    !formData.title ||
                    !formData.summary ||
                    !formData.description
                  }
                >
                  {loading ? (
                    <>
                      <div
                        className="spinner-border spinner-border-sm me-3"
                        role="status"
                        aria-hidden="true"
                        style={{ width: "1.5rem", height: "1.5rem" }}
                      ></div>
                      <small
                        className="text-muted"
                        style={{ fontSize: "12px" }}
                      >
                        Please wait...
                      </small>
                    </>
                  ) : (
                    <div>SUBMIT</div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddBlog;
