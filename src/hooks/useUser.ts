import { useState } from "react";
import api from "../utils/api";

const useUser = () => {
  const data = localStorage.getItem("user");
  const [user, setUserData] = useState(data ? JSON.parse(data) : undefined);

  const reFetch = async () => {
    if (data) {
      const res = await api.post("/api/counselor/me", {
        user_id: JSON.parse(data)._id,
      });

      localStorage.setItem("user", JSON.stringify(res.data.data));
      setUserData(res.data.data);
    }
  };

  return { user, reFetch };
};

export default useUser;
