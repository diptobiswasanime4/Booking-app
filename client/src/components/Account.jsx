import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

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
        <Link
          className={"py-1 px-3 border-b " + activeClassStyles("profile")}
          to="/account"
        >
          My Profile
        </Link>
        <Link
          className={"py-1 px-3 border-b " + activeClassStyles("bookings")}
          to="/account/bookings"
        >
          My Bookings
        </Link>
        <Link
          className={"py-1 px-3 border-b " + activeClassStyles("accomodations")}
          to="/account/accomodations"
        >
          My Accomodations
        </Link>
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
    </div>
  );
}
