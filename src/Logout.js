import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



const Logout = ({setUser}) => {
    const navigate = useNavigate();

    useEffect(() => {

        const logoutAsync = async () => {
            setUser(false);
            navigate('/home');
        };
        localStorage.clear();
        logoutAsync();

    }, [])

};

export default Logout;