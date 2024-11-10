import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// hook for easily access data
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;