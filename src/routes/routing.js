import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Menu from "../pages/Menu";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AddFood from "../pages/AddFood";
import PrivateRoute from "../components/PrivateRoute";
import Error from "../pages/Error";
import GoToTop from "../components/GoToTop";

const Routing = () => {
  return (
    <BrowserRouter>
      <GoToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
          <Route
            path="/add-food"
            element={
              <PrivateRoute>
                <AddFood />
              </PrivateRoute>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
