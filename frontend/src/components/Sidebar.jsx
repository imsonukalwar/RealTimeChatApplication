
import axios from "axios";
import { useEffect, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dp from "../assets/dp2.webp";
import { serverUrl } from "../main";
import {
  setOtherUserData,
  setSearchData,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";

function Sidebar() {
  const { userData, otherUsers, selectedUser, onlineUser, SearchData } =
    useSelector((state) => state.user);

  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/logout`, {}, { withCredentials: true });
      dispatch(setUserData(null));
      dispatch(setOtherUserData([]));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/user/search?query=${input}`,
        { withCredentials: true }
      );
      dispatch(setSearchData(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input.trim()) {
      handleSearch();
    }
  }, [input]);

  const filteredSearch =
    SearchData?.filter((user) => user._id !== userData?._id) || [];

  return (
    <div
      className={`lg:w-[30%] w-full h-full lg:block 
      bg-gradient-to-b from-slate-100 to-slate-200
      border-r border-white/40 backdrop-blur-xl
      ${!selectedUser ? "block" : "hidden"}`}
    >

      {/* LOGOUT */}
      <div
        className="w-[35px] h-[35px] rounded-full flex justify-center items-center 
        bg-gradient-to-br from-red-400 to-blue-900 text-white
        shadow-lg hover:scale-110 hover:shadow-red-300/40
        transition fixed bottom-[px] left-[15px] cursor-pointer z-50 top-3"
        onClick={handlelogout}
      >
        <BiLogOutCircle className="w-[15px] h-[15px]" />
      </div>

      {/* HEADER */}
      <div className="
        w-full h-[300px]
        bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-500
        rounded-b-[40%]
        shadow-xl
        flex flex-col gap-4 justify-center px-6 relative
      ">

        <h1 className="text-white font-extrabold text-[30px] tracking-wide drop-shadow">
          Chetter
        </h1>

        <div className="flex justify-between items-center">

          <h1 className="text-white font-semibold text-[24px] drop-shadow">
            Hii {userData?.name || "user"}
          </h1>

          <div
            className="w-[55px] h-[55px] rounded-full overflow-hidden 
            border-2 border-white shadow-xl cursor-pointer 
            hover:scale-105 transition"
            onClick={() => navigate("/profile")}
          >
            <img
              src={userData?.image || dp}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* SEARCH + ONLINE */}
        <div className="relative mt-4">

          {!search && (
            <div className="flex items-center gap-3">

              {/* SEARCH ICON */}
              <div
                className="w-[45px] h-[45px] rounded-full bg-white/90 
                backdrop-blur-xl shadow-lg flex items-center justify-center cursor-pointer
                hover:scale-105 transition"
                onClick={() => setSearch(true)}
              >
                <FaSearch />
              </div>

              {/* ONLINE USERS */}
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">

                {otherUsers?.map(
                  (user) =>
                    onlineUser?.includes(user._id) && (
                      <div
                        key={user._id}
                        className="relative shrink-0 cursor-pointer group"
                        onClick={() => dispatch(setSelectedUser(user))}
                      >
                        <div className="
                          w-[45px] h-[45px] rounded-full overflow-hidden shadow-md
                          group-hover:scale-110 transition
                        ">
                          <img
                            src={user?.image || dp}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <span className="
                          w-[11px] h-[11px] bg-green-400 rounded-full 
                          absolute bottom-0 right-0 border-2 border-white
                          shadow animate-pulse
                        "></span>
                      </div>
                    )
                )}
              </div>
            </div>
          )}

          {/* FULL SEARCH */}
          {search && (
            <>
              <div className="
                w-full h-[55px]
                bg-white/90 backdrop-blur-xl
                shadow-xl flex items-center gap-3 
                rounded-full px-5 border border-white/40
              ">
                <FaSearch />

                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full bg-transparent outline-none text-gray-700"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <ImCross
                  className="cursor-pointer hover:scale-110 transition"
                  onClick={() => {
                    setInput("");
                    setSearch(false);
                  }}
                />
              </div>

              {/* DROPDOWN */}
              {input && (
                <div className="
                  absolute top-[70px] left-0 w-full
                  bg-white/95 backdrop-blur-xl
                  rounded-2xl shadow-2xl border border-white/40
                  max-h-[260px] overflow-y-auto p-3 flex flex-col gap-2 z-50
                ">
                  {filteredSearch.length > 0 ? (
                    filteredSearch.map((user) => (
                      <div
                        key={user._id}
                        onClick={() => dispatch(setSelectedUser(user))}
                        className="
                          flex items-center gap-3 p-2 rounded-xl
                          hover:bg-blue-50 cursor-pointer transition group
                        "
                      >
                        <div className="relative">
                          <div className="w-[45px] h-[45px] rounded-full overflow-hidden shadow">
                            <img
                              src={user?.image || dp}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {onlineUser?.includes(user._id) && (
                            <span className="w-[11px] h-[11px] bg-green-400 rounded-full absolute bottom-0 right-0 border-2 border-white shadow"></span>
                          )}
                        </div>

                        <h1 className="font-semibold text-[17px] text-gray-700 group-hover:text-blue-600 transition">
                          {user?.name || user?.userName}
                        </h1>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400 py-3">
                      No users found
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* USER LIST */}
<div className="w-full h-[60vh] overflow-y-auto flex flex-col gap-3 mt-4 px-3 pb-20 scrollbar-hide">
        {otherUsers?.map((user) => (
          <div
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className="
              bg-white/90 backdrop-blur-lg
              h-[60px] flex items-center gap-3
              shadow-md rounded-xl px-3
              hover:bg-blue-50 hover:shadow-lg
              cursor-pointer transition group
            "
          >
            <div className="relative">
              <div className="w-[45px] h-[45px] rounded-full overflow-hidden shadow">
                <img
                  src={user?.image || dp}
                  className="w-full h-full object-cover"
                />
              </div>

              {onlineUser?.includes(user._id) && (
                <span className="w-[11px] h-[11px] bg-green-400 rounded-full absolute bottom-0 right-0 border-2 border-white shadow"></span>
              )}
            </div>

            <h1 className="font-semibold text-[17px] text-gray-700 group-hover:text-blue-600 transition">
              {user?.name || user?.userName}
            </h1>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Sidebar;


