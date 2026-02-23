import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUserData } from "../redux/userSlice";
import { serverUrl } from "../main";

const useGetOtherUser = () => {
  const dispatch = useDispatch();
  const calledRef = useRef(false); // StrictMode safe

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/user/others`,
          { withCredentials: true }
        );

        dispatch(setOtherUserData(res.data));
      } catch (err) {
        console.log("No active session", err);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUser;
