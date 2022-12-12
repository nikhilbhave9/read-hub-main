// Imports
import { Outlet, Navigate } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';

function PrivateRoutes() {

    let user = useSelector(state => state.user); // Use the userReducer called "user"


    return (
        user.user ? <Outlet /> : <Navigate to="/login" /> 
    )
}

export default PrivateRoutes;