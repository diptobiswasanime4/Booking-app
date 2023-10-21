import React, { useState } from "react";
import axios from "axios";

export default function NewAccommodation() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  async function removePhoto(index) {
    setAddedPhotos((prevPhotos) => prevPhotos.splice(index, 1));
  }

  async function addPhotoFromDevice(e) {
    e.preventDefault();
    const files = e.target.files;
    const data = new FormData();
    data.set("photos", files);
    const resp = await axios.post("/upload-photo-from-device", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(resp);
  }

  async function addPhotoByLink(e) {
    e.preventDefault();
    const resp = await axios.post("/upload-photo-by-link", { link: photoLink });
    console.log(resp.data);
    setAddedPhotos((prevPhotos) => [...prevPhotos, resp.data.link]);
    console.log(addedPhotos);
  }
  return (
    <form className="mx-8 mb-16 flex flex-col gap-2">
      <div className="">
        <div className="text-xl p-1">Title</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border pl-1 pb-1 rounded-md shadow w-full text-lg"
          type="text"
          placeholder="My apartment"
        />
      </div>
      <div className="">
        <div className="text-xl p-1">Address</div>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border pl-1 pb-1 rounded-md shadow w-full text-lg"
          type="text"
          placeholder="My apartment address"
        />
      </div>
      <div className="">
        <div className="text-xl p-1">Description</div>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border shadow-md rounded-md pl-1 w-full h-16"
          placeholder="My apartment is excellent!"
        ></textarea>
      </div>
      <div className="">
        <div className="text-xl p-1">Photos</div>
        <div className="flex gap-2">
          <input
            className="border shadow-sm w-full pl-1 text-lg rounded-xl"
            type="text"
            placeholder="Upload by link"
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
          <button
            onClick={addPhotoByLink}
            className="text-white bg-violet-600 hover:bg-violet-500 text-xl px-3 pb-1 rounded-2xl shadow"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="border cursor-pointer w-48 h-32 text-xl px-4 mt-2 rounded-2xl shadow flex gap-1 items-center">
            <input
              type="file"
              className="hidden"
              onChange={addPhotoFromDevice}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-16 h-24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"
              />
            </svg>
            Upload from your device
          </label>
          {addedPhotos.length > 0 &&
            addedPhotos.map((photo, index) => {
              console.log("http://localhost:3000/uploads/" + photo);
              return (
                <div className="" key={index}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="relative top-12 text-white w-10 h-10 cursor-pointer hover:bg-gray-500 p-1 hover:rounded-full"
                    onClick={() => removePhoto(index)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  <img
                    src={"http://localhost:3000/uploads/" + photo}
                    alt="image"
                    className="h-32 mt-2 rounded-md"
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div className="">
        <div className="text-xl p-1">Perks</div>
        <div className="grid grid-cols-3 gap-2">
          <div className="border px-4 py-8 flex gap-2 items-center">
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
                d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z"
              />
            </svg>
            <label>WiFi</label>
            <input type="checkbox" />
          </div>
          <div className="border px-4 py-8 flex gap-2 items-center">
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
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <label>Parking</label>
            <input type="checkbox" />
          </div>
          <div className="border px-4 py-8 flex gap-2 items-center">
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
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <label>Free Food</label>
            <input type="checkbox" />
          </div>
          <div className="border px-4 py-8 flex gap-2 items-center">
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
                d="M3.75 7.5l16.5-4.125M12 6.75c-2.708 0-5.363.224-7.948.655C2.999 7.58 2.25 8.507 2.25 9.574v9.176A2.25 2.25 0 004.5 21h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169A48.329 48.329 0 0012 6.75zm-1.683 6.443l-.005.005-.006-.005.006-.005.005.005zm-.005 2.127l-.005-.006.005-.005.005.005-.005.005zm-2.116-.006l-.005.006-.006-.006.005-.005.006.005zm-.005-2.116l-.006-.005.006-.005.005.005-.005.005zM9.255 10.5v.008h-.008V10.5h.008zm3.249 1.88l-.007.004-.003-.007.006-.003.004.006zm-1.38 5.126l-.003-.006.006-.004.004.007-.006.003zm.007-6.501l-.003.006-.007-.003.004-.007.006.004zm1.37 5.129l-.007-.004.004-.006.006.003-.004.007zm.504-1.877h-.008v-.007h.008v.007zM9.255 18v.008h-.008V18h.008zm-3.246-1.87l-.007.004L6 16.127l.006-.003.004.006zm1.366-5.119l-.004-.006.006-.004.004.007-.006.003zM7.38 17.5l-.003.006-.007-.003.004-.007.006.004zm-1.376-5.116L6 12.38l.003-.007.007.004-.004.007zm-.5 1.873h-.008v-.007h.008v.007zM17.25 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zm0 4.5a.75.75 0 110-1.5.75.75 0 010 1.5z"
              />
            </svg>
            <label>Radio</label>
            <input type="checkbox" />
          </div>
          <div className="border px-4 py-8 flex gap-2 items-center">
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
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
            <label>TV</label>
            <input type="checkbox" />
          </div>
        </div>
      </div>
      <div className="">
        <div className="text-xl p-1">Extra info</div>
        <input
          className="border pl-1 pb-1 rounded-md shadow w-full text-lg"
          type="text"
          placeholder="Some extra info"
        />
      </div>
      <div className="">
        <div className="text-xl p-1">Check in-out times</div>
        <div className="flex gap-2">
          <input
            className="border pl-1 pb-1 rounded-md shadow w-1/3 text-lg"
            type="text"
            placeholder="Check-in time"
          />
          <input
            className="border pl-1 pb-1 rounded-md shadow w-1/3 text-lg"
            type="text"
            placeholder="Check-out time"
          />
          <input
            className="border pl-1 pb-1 rounded-md shadow w-1/3 text-lg"
            type="number"
            placeholder="Max guests"
          />
        </div>
      </div>
      <div className="mt-8 cursor-pointer pb-1 px-3 text-xl rounded-full bg-violet-600 text-white shadow-md hover:bg-violet-500 text-center">
        Save
      </div>
    </form>
  );
}
