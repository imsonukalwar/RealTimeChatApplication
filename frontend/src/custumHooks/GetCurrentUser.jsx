import { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData,clearUser} from "../redux/userSlice";
import { serverUrl } from "../main";

const GetCurrentUser = () => {
  const dispatch = useDispatch();
  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );
        dispatch(setUserData(res.data));
      } catch (err) {
        dispatch(clearUser());////////////////////
        console.log("No active session",err);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);

  return null;
};

export default GetCurrentUser;
