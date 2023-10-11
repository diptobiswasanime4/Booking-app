import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import MyAccommodations from "./MyAccommodations";

export default function Account() {
  const [redirect, setRedirect] = useState(false);
  const { loading, user, setUser } = useContext(UserContext);

  let { category } = useParams();

  if (category == undefined) {
    category = "profile";
  }

  function activeClassStyles(type = undefined) {
    let styles = "";
    if (type == category) {
      styles = "rounded-full bg-violet-600 text-white shadow";
    }
    return styles;
  }

  async function logoutUser(e) {
    e.preventDefault();
    const resp = await axios.post("/logout");
    setUser(null);
    setRedirect(true);
  }

  if (loading) {
    return "Loading...";
  }
  if (!user && !loading & !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="account-container">
      <div className="account-links flex justify-center gap-6 py-2 my-6 text-lg">
        <div
          className={
            "flex items-center gap-1 py-1 pl-3 pr-4 border-b " +
            activeClassStyles("profile")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <Link to="/account">My Profile</Link>
        </div>
        <div
          className={
            "flex items-center gap-1 py-1 pl-3 pr-4 border-b " +
            activeClassStyles("bookings")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <Link to="/account/bookings">My Bookings</Link>
        </div>

        <div
          className={
            "flex items-center gap-1 py-1 pl-3 pr-4 border-b " +
            activeClassStyles("accommodations")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
            />
          </svg>

          <Link to="/account/accommodations">My Accommodations</Link>
        </div>
      </div>
      {category == "profile" && (
        <div className="profile-container">
          <div className="profile-info-container flex justify-center gap-4 mb-8">
            <img
              className="rounded-full"
              src="/src/assets/images/Gary_pp.jpg"
              alt="pp"
            />
            <div className="profile-info bg-gray-100 p-2 shadow-md rounded-lg">
              <div className="profile-name">Name: {user.name}</div>
              <div className="profile-location">Place: Pallet Town</div>
            </div>
          </div>
          <div
            className="profile-logout cursor-pointer pb-1 px-3 text-xl rounded-full bg-violet-600 text-white shadow-md hover:bg-violet-500 mb-8 mx-8 text-center"
            onClick={logoutUser}
          >
            Logout
          </div>
        </div>
      )}
      {category == "accommodations" && <MyAccommodations />}
    </div>
  );
}
