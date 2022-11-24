import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

// Google O-Auth
import { GoogleLogin, GoogleLogout } from 'react-google-login';
const clientID = "743792005372-l001hnasupsvimqur3hq32pe8ngje3rr.apps.googleusercontent.com"

function Logout() {

    const navigate = useNavigate();
    const onSuccess = (res) => {
        console.log('Logout sucessful');
        navigate('/');
    };

    return (
        <Container align="center">
            <div id='signOutButton'>
                <GoogleLogout
                    clientId={clientID}
                    buttonText={"Logout"}
                    onLogoutSuccess={onSuccess}
                />

            </div>
        </Container>
    );
};

export default Logout;