import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const BuyerProfile = () => {
  const avatarRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        &larr; Back
      </button>
      <h1 className="text-2xl font-bold mb-6">Buyer Profile</h1>
      <form className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded shadow">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://ui-avatars.com/api/?name=Buyer&background=0D8ABC&color=fff"
            alt="Avatar"
            className="w-24 h-24 rounded-full mb-2 object-cover"
            onClick={() => avatarRef.current && avatarRef.current.click()}
            style={{ cursor: 'pointer' }}
          />
          <input
            type="file"
            accept="image/*"
            ref={avatarRef}
            className="hidden"
          />
          <span className="text-sm text-gray-500">Click avatar to change</span>
        </div>
        <div>
          <label className="block mb-2 font-semibold">Name</label>
          <input className="w-full border rounded p-2" type="text" placeholder="Your name" />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Email</label>
          <input className="w-full border rounded p-2" type="email" placeholder="Your email" />
        </div>
        <div>
          <label className="block mb-2 font-semibold">Shipping Address</label>
          <input className="w-full border rounded p-2" type="text" placeholder="Your shipping address" />
        </div>
        <hr className="my-6" />
        <div>
          <label className="block mb-2 font-semibold">Change Password</label>
          <input className="w-full border rounded p-2 mb-2" type="password" placeholder="New password" />
          <input className="w-full border rounded p-2" type="password" placeholder="Confirm new password" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update Profile</button>
      </form>
    </div>
  );
};

export default BuyerProfile; 