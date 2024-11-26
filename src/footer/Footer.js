import React from "react";
import { Link } from "react-router-dom";
import "./FooterStyle.css";
import logo from "../assets/images/mahmoudosman-logo.png";

export const Footer = () => {
  return (
    <>
      <>
        <footer className="text-center text-lg-start text-white">
          {/* Section: Social media */}
          <section className="d-flex social-container justify-content-between p-4">
            {/* Left */}
            <div className="me-5">
              <span>Get connected with me on social networks.</span>
            </div>
            {/* Left */}
            {/* Right */}
            <div className="">
              <Link to="" className="me-4">
                <i className="fa fa-facebook-f" />
              </Link>
              <Link to="" className="me-4">
                <i className="fa fa-linkedin" />
              </Link>
              <Link
                to="https://github.com/MahmoudAhmadOsman"
                target="_blank"
                className="me-4"
              >
                <i className="fa fa-github" />
              </Link>
            </div>
            {/* Right */}
          </section>
          {/* Section: Social media */}
          {/* Section: Links  */}
          <section className="">
            <div className="container text-center text-md-start mt-5">
              {/* Grid row */}
              <div className="row mt-3">
                {/* Grid column */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* Content */}
                  <h6 className="text-uppercase fw-bold">
                    <img src={logo} class="img-fluid rounded-top" alt="logo" />
                  </h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    I am a seasoned Full Stack Software Engineer with a strong
                    background in both front-end and back-end development. My
                    expertise spans across a wide range of technologies,
                    allowing me to build robust, scalable, and efficient web
                    applications.
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Our Services</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <small className="text-white">Database Design</small>
                  </p>
                  <p>
                    <small className="text-white">
                      Custom Application Development
                    </small>
                  </p>
                  <p>
                    <small className="text-white">Software Design </small>
                  </p>
                  <p>
                    <small className="text-white">
                      API Design & Integration
                    </small>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Useful links</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <Link to="/api/users/register" className="text-white">
                      Create Account
                    </Link>
                  </p>
                  <p>
                    <Link to="/api/users/login" className="text-white">
                      Account Login
                    </Link>
                  </p>
                  <p>
                    <Link to="/api/courses" className="text-white">
                      List of Courses
                    </Link>
                  </p>
                  <p>
                    <Link to="#!" className="text-white">
                      Help
                    </Link>
                  </p>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* Links */}
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                  />
                  <p>
                    <i className="fa fa-home mr-3" /> St. Paul, MN, US
                  </p>
                  <p>
                    <i className="fa fa-envelope mr-3" /> osman.techy@gmail.com
                  </p>
                  <p>
                    <i className="fa fa-phone mr-3" /> &nbsp; (651)-800-0000
                  </p>
                  <p>
                    <i className="fa fa-print mr-3" /> &nbsp; (651)-800-0000
                  </p>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </div>
          </section>
          {/* Section: Links  */}
          {/* Copyright */}
          <div
            className="copy-right text-center text-secondary p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            &copy; Copyright {new Date().getFullYear()} . All right reserved. |
            Designed & developed by <i>Mahmoud Osman.</i>
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </>
    </>
  );
};
