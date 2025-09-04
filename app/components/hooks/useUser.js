"use client";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";

const useUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    console.log("data :- ", user);

    useEffect(() => {

        const load = async () => {
            try {
                const res = await axios.get("/api/user/me", { withCredentials: true });
                dispatch(setUserData(res.data));
            } catch (err) {
                console.error(err);
            }
        };

        load();
    }, [dispatch, user]);

    return user;
};

export default useUser;