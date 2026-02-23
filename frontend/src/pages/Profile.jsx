
// import React, { useEffect, useState } from "react";
// import { useRef, useState, useEffect } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { IoCameraReverseSharp } from "react-icons/io5";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import dp from "../assets/dp2.webp";
// import axios from "axios";
// import { serverUrl } from "../main";
// import { setUserData } from "../redux/userSlice";

// const Profile = () => {
//   const { userData } = useSelector((state) => state.user);

//   const [name, setName] = useState("");
//   const [fimage, setFimage] = useState(dp);
//   const [bimage, setBimage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const imageRef = useRef();

//   // ✅ Sync redux userData to local state
//   useEffect(() => {
//     if (userData) {
//       setName(userData.name || "");
//       setFimage(userData.image || dp);
//     }
//   }, [userData]);

//   // ✅ Image change
//   const handleChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setBimage(file);
//     setFimage(URL.createObjectURL(file));
//   };

//   // ✅ Profile Update
//   const handleProfile = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("name", name);

//       if (bimage) {
//         formData.append("image", bimage);
//       }

//       const res = await axios.put(
//         `${serverUrl}/api/user/profile`,
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("Updated User:", res.data);

//       dispatch(setUserData(res.data));
//       setLoading(false);

//     } catch (error) {
//       console.log("Profile Update Error:", error.response?.data || error.message);
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#eef3f8] flex flex-col items-center pt-10">

//       {/* Back Button */}
//       <div className="fixed top-[23px] left-[23px] bg-gray-400 p-2 rounded-xl">
//         <FaArrowLeft
//           className="h-[25px] w-[25px] cursor-pointer"
//           onClick={() => navigate("/")}
//         />
//       </div>

//       {/* Profile Image */}
//       <div
//         className="relative w-[230px] h-[230px] mb-10 cursor-pointer"
//         onClick={() => imageRef.current.click()}
//       >
//         <div className="w-full h-full rounded-full border-[5px] border-[#1ec9ff] overflow-hidden bg-white">
//           <img
//             src={fimage}
//             alt="profile"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Camera Icon */}
//         <div className="absolute bottom-4 right-4 bg-[#1ec9ff] p-3 rounded-full shadow-lg">
//           <IoCameraReverseSharp className="text-white text-xl" />
//         </div>
//       </div>

//       {/* Form */}
//       <form
//         className="w-[90%] max-w-[500px] bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-5"
//         onSubmit={handleProfile}
//       >
//         {/* Hidden File Input */}
//         <input
//           type="file"
//           accept="image/*"
//           ref={imageRef}
//           hidden
//           onChange={handleChange}
//         />

//         {/* Name */}
//         <input
//           type="text"
//           placeholder="Enter your name..."
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full h-[52px] px-5 border-2 border-[#1ec9ff] rounded-lg outline-none text-gray-700"
//         />

//         {/* Username */}
//         <input
//           type="text"
//           readOnly
//           value={userData?.userName || ""}
//           className="w-full h-[52px] px-5 border-2 border-[#1ec9ff] rounded-lg bg-gray-100 text-gray-400"
//         />

//         {/* Email */}
//         <input
//           type="email"
//           readOnly
//           value={userData?.email || ""}
//           className="w-full h-[52px] px-5 border-2 border-[#1ec9ff] rounded-lg bg-gray-100 text-gray-400"
//         />

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full h-[52px] bg-[#1ec9ff] text-white rounded-lg font-semibold text-lg hover:bg-[#14b7eb] transition"
//         >
//           {loading ? "Saving..." : "Save Profile"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;


import { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaUserAlt } from "react-icons/fa";
import { IoCameraReverseSharp } from "react-icons/io5";
import { MdAlternateEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp2.webp";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [fimage, setFimage] = useState(dp);
  const [bimage, setBimage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageRef = useRef();

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setFimage(userData.image || dp);
    }
  }, [userData]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBimage(file);
    setFimage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (bimage) formData.append("image", bimage);

      const res = await axios.put(
        `${serverUrl}/api/user/profile`,
        formData,
        { withCredentials: true }
      );

      dispatch(setUserData(res.data));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
<div className="min-h-screen bg-[#f4f7fb] flex justify-center px-4 py-10">

  <div className="w-full max-w-[900px] grid md:grid-cols-[260px_1fr] gap-8">

    {/* 👤 LEFT PROFILE PANEL */}
    <div className="bg-gradient-to-b from-[#1d7fff] to-[#19d3ff] rounded-[28px] shadow-xl p-6 flex flex-col items-center text-white relative">

      {/* avatar */}
      <div className="relative group mt-6">

        <div className="absolute -inset-2 bg-white/40 blur-xl rounded-full"></div>

        <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src={fimage} className="w-full h-full object-cover"/>
        </div>

        <button
          onClick={()=>imageRef.current.click()}
          className="absolute bottom-1 right-1 bg-white text-black p-2 rounded-full shadow hover:scale-110 transition"
        >
          📷
        </button>

      </div>

      <h2 className="mt-5 text-xl font-semibold">
        {userData?.name}
      </h2>

      <p className="opacity-80 text-sm">
        @{userData?.userName}
      </p>

      {/* divider */}
      <div className="w-full h-[1px] bg-white/30 my-6"></div>

      <p className="text-xs opacity-80 text-center leading-relaxed">
        Your profile info is visible to your contacts.  
        Keep it updated for better recognition.
      </p>

    </div>

    {/* ✍️ RIGHT FORM PANEL */}
    
    <div className="bg-white rounded-[28px] shadow-[0_25px_80px_rgba(0,0,0,0.12)] p-8">

      <div className="flex items-center gap-3 mb-4">
  <button
    onClick={()=>navigate("/")}
    className="bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
  >
    ←
  </button>
  <h3 className="text-2xl font-semibold text-gray-800">
    Edit Profile
  </h3>
</div>

      <form onSubmit={handleProfile} className="flex flex-col gap-5">

        <input hidden ref={imageRef} type="file" onChange={handleChange}/>

        {/* name */}
        <div>
          <label className="text-sm text-gray-500">Name</label>
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="mt-2 w-full h-[52px] px-4 rounded-xl border border-gray-200 focus:border-[#1d7fff] outline-none transition"
          />
        </div>

        {/* username */}
        <div>
          <label className="text-sm text-gray-500">Username</label>
          <input
            readOnly
            value={userData?.userName}
            className="mt-2 w-full h-[52px] px-4 rounded-xl bg-gray-100 border text-gray-500"
          />
        </div>

        {/* email */}
        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            readOnly
            value={userData?.email}
            className="mt-2 w-full h-[52px] px-4 rounded-xl bg-gray-100 border text-gray-500"
          />
        </div>

        <button
          disabled={loading}
          className="mt-4 h-[56px] rounded-xl bg-gradient-to-r from-[#1d7fff] to-[#19d3ff] text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </form>
    </div>

  </div>

</div>
  );
};

export default Profile;
