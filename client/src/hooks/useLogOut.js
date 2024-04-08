import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogOut = () => {
    const navigate = useNavigate();

    const logout = () => {
    try{
        localStorage.clear();
        navigate('/signin');
    }catch(err){
        console.log(err);
    }
    }
    return logout;
}

export default useLogOut;