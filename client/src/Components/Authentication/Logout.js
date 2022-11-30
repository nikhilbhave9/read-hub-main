import { useNavigate } from 'react-router-dom';

// Styling 
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../userSlice';
import { selectUser } from '../../userSlice';

// Google O-Auth
const clientID = "743792005372-l001hnasupsvimqur3hq32pe8ngje3rr.apps.googleusercontent.com"

function Logout() {

    const navigate = useNavigate();
    var user = useSelector(selectUser); // Use the userReducer called "user"
    const dispatch = useDispatch(); // Use the dispatch function to update the userReducer

    function handleLogout(e) {
        e.preventDefault();
        dispatch(logout());
        navigate('/');
        console.log("User logged out successfully!");
    }

    return (
        <Button contained color="secondary" id='signOutButton' onClick={(e) => handleLogout(e)} >
            {/* <GoogleLogout
                    clientId={clientID}
                    buttonText={"Logout"}
                    onLogoutSuccess={onSuccess}
                /> */}
            SignOut
        </Button>
    );
};

export default Logout;