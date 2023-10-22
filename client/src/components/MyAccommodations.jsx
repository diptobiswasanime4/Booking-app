import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import NewAccommodation from "./NewAccommodation";
import axios from "axios";

export default function MyAccommodations() {
  const { action } = useParams();
  const [accommodations, setAccommodations] = useState([]);
  useEffect(() => {
    axios.get("/places").then((resp) => {
      console.log(resp.data);
      setAccommodations(resp.data);
    });
    return () => {};
  }, []);

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
          <div className="text-center text-2xl mt-4 mb-4">My Accomodations</div>
          <div className="grid grid-cols-2 mb-8">
            {accommodations.map((accommodation, index) => {
              return (
                <Link
                  to={"/account/accommodations/" + accommodation._id}
                  key={index}
                  className="flex flex-col gap-2 shadow-md border m-3 p-3 rounded-xl bg-gray-300"
                >
                  <img
                    className="border rounded-lg"
                    src={
                      "http://localhost:3000/uploads/" + accommodation.photos[0]
                    }
                    alt="accommodation"
                  />
                  <div className="text-xl text-center">
                    {accommodation.title}
                  </div>
                  <div className="text-md text-center">
                    {accommodation.address}
                  </div>
                  <div className="">{accommodation.desc}</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      {action == "new" && <NewAccommodation />}
    </div>
  );
}
