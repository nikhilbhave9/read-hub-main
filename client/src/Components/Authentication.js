
// Components
import Dashboard from './Dashboard';
import Login from './Authentication/Login';


// Redux
import { useSelector } from 'react-redux';
import { selectUser, selectStatus } from '../userSlice';


function Authentication() {

    // Redux code to manage user state
    var user = useSelector(selectUser); // Use the userReducer called "user"

    // Redux code to manage authentication status
    var status = useSelector(selectStatus); // Use the userReducer called "status"

    if (status === "loading") {
        console.log("Loading...");
        return (
            <div>
                <Login />
            </div>
        )
    }

    return (
        <>
            {status === "authenticated" 
                ? <Dashboard /> 
                : <Login />
            }
        </>
    )
}

export default Authentication; 