import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { constant } from "../constant";

const useAuth = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    axios.defaults.headers.common['authorization'] = token;
                    const response = await axios.post(`${constant.baseUrl}/api/user/account`);

                    if (response.status === 200) {
                        setData(response.data);
                    } else {
                        throw new Error("Failed to fetch user account data");
                    }
                } else {

                    navigate('/signin')
                    throw new Error("Token not found");
                }
            } catch (error) {
                console.error(error, "error occured");
                localStorage.clear();
                navigate('/signin');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token]);

    return { data, loading };
};

export default useAuth;
