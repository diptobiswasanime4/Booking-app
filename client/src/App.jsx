import { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
      </Route>
    </Routes>
  );
}

function Layout() {
  return (
    <main>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}

function Home() {
  return (
    <div className="body-section">
      <div>Home Page</div>
    </div>
  );
}

export default App;
