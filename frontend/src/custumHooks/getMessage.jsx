
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../main";
import { setMessages } from "../redux/messageSlice.js";

const useGetMessage = () => {

  const dispatch = useDispatch();
  const { selectedUser,userData } = useSelector(state => state.user);

  useEffect(() => {

    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/message/get/${selectedUser._id}`,
          { withCredentials: true }
        );

        dispatch(setMessages(res.data));

      } catch (err) {
        console.log(err);
      }
    };

    fetchMessages();

  }, [selectedUser, userData]);
};

export default useGetMessage;
