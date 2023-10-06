import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Account() {
  const { loading, user } = useContext(UserContext);

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

  if (loading) {
    return "Loading...";
  }
  if (!user && !loading) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className="account-container">
      <div className="account-links flex justify-center gap-6 py-2 my-6 text-lg">
        <Link
          className={"py-1 px-3 " + activeClassStyles("profile")}
          to="/account"
        >
          My Profile
        </Link>
        <Link
          className={"py-1 px-3 " + activeClassStyles("bookings")}
          to="/account/bookings"
        >
          My Bookings
        </Link>
        <Link
          className={"py-1 px-3 " + activeClassStyles("accomodations")}
          to="/account/accomodations"
        >
          My Accomodations
        </Link>
      </div>
      {category == "profile" && (
        <div className="profile-container flex justify-center gap-4">
          <img src="" alt="pp" />
          <div className="profile-info">
            <div className="profile-name">Name: {user.name}</div>
            <div className="profile-location">Place: Kolkata</div>
          </div>
        </div>
      )}
    </div>
  );
}
