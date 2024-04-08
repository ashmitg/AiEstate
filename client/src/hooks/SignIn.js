import {useNavigate} from 'react-router-dom';
import {constant} from '../constant';
import axios from 'axios';
import {toast} from 'react-toastify';
const useSignIn = () => {
    const navigate = useNavigate();

    const signin = async (data) =>{
        try{
            const response = await axios.post(`${constant.baseUrl}/api/user/signin`, data);

            if(response.status === 200){
                const {token} = response.data;

                if(token){
                    localStorage.setItem('token', token);
                    toast.success('Login successful');
                    navigate('/dashboard');
                }else{
                    toast.error('Error occred please contact support')
                }
            }else{
                toast.error('Incorrect Password or Email');
            }
        }catch(error){
            console.log(error)
            toast.error('Error occured please contact support');
        }
    }
    return signin;
}
export default useSignIn;


