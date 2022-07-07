import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {

        const logoutAsync = async () => {

            navigate('/admin');
        };
        localStorage.clear();
        logoutAsync();

    }, [])

};

export default Logout;