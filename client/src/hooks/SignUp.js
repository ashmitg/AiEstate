import axios from 'axios';
import { constant } from '../constant';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const useSignUp = () => {
    const navigate = useNavigate();

    const signuptrigger = async (data) => {
        try {
            const response = await axios.post(`${constant.baseUrl}/api/user/signup`, data);

            if (response.status === 200) {
                const { token } = response.data;
                if (token) {
                    localStorage.setItem('token', token);
                    toast.success('Signup successful');
                    navigate('/dashboard');
                } else {
                    console.error('Token not found in response data');
                }
            } else {
                console.error(`Unexpected status code: ${response.status}`);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                toast.error('User already exists');
            } else {
                console.error('Error during signup:', error);
            }
        }
    };

    return signuptrigger;
};

export default useSignUp;
