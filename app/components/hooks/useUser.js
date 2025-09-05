"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/userSlice";

const useUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await axios.get("/api/user/me", { withCredentials: true });
                dispatch(setUserData(res.data));
                setError(null);
            } catch (err) {
                setError(err);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [dispatch]);

    return { user, loading, error };
};

export default useUser;