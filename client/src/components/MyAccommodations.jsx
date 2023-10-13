import React from "react";
import { Link, useParams } from "react-router-dom";
import NewAccommodation from "./NewAccommodation";

export default function MyAccommodations() {
  const { action } = useParams();
  return (
    <div>
      {action != "new" && (
        <div>
          <Link
            className="flex justify-center"
            to={"/account/accommodations/new"}
          >
            <div className="flex gap-1 pl-2 pr-4 py-1 rounded-full cursor-pointer bg-violet-600 hover:bg-violet-500 text-white shadow">
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add new Accommodation
            </div>
          </Link>
          <div>My Accomodations</div>
        </div>
      )}
      {action == "new" && <NewAccommodation />}
    </div>
  );
}