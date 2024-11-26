import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import NavigationComponent from "./components/navigation/NavigationComponent";
import HomeComponent from "./components/home/HomeComponent";
import NotFound from "./utils/NotFound";
import Loading from "./utils/Loading";
import { Footer } from "./footer/Footer";

import BlogList from "./blog/BlogList";
import AddBlog from "./blog/AddBlog";
import BlogDetails from "./blog/BlogDetails";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div>{<Loading />}</div>;
  }

  return (
    <div className="home-app">
      <BrowserRouter>
        <React.Fragment>
          <NavigationComponent />
          <Routes>
            <Route
              path="/api/blogs/blog-details/:id/:title"
              element={<BlogDetails />}
            />
            <Route path="/api/blogs" element={<BlogList />} />

            <Route path="/api/blogs/create" element={<AddBlog />} />
            <Route path="/" exact element={<BlogList />} />
            {/* <Route path="/api/blogs" exact element={<HomeComponent />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </React.Fragment>{" "}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
