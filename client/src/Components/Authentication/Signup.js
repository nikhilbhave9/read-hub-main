// ============= WILL BE USED FOR FIRST-TIME SIGNUP =============

// Imports

// Components

// Styling
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { sizing } from '@mui/system';

// Google OAuth sign up (if needed)




// Step 1: Add O-Auth functionality
// Step 2: Create a Form for user to input their information (First Name (req), Last Name, Date of birth (req), Profile Photo, Newsletters)
// Step 3: Add onClick functionality after submission
// Step 4: Store information in some form of a database (MongoDB?)
// Step 5: Add useNavigate hook from React Router to redirect to user-specific Dashboard 


function Signup() {
    return (
        <Container align="center">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField
                        required
                        id="firstname-required"
                        label="First Name"
                        fullWidth
                    />
                    <TextField
                        id="lastname"
                        label="Last Name"
                    />
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Disabled"
                        defaultValue="Hello World"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        id="outlined-read-only-input"
                        label="Read Only"
                        defaultValue="Hello World"
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        id="outlined-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField id="outlined-search" label="Search field" type="search" />
                    <TextField
                        id="outlined-helperText"
                        label="Helper text"
                        defaultValue="Default Value"
                        helperText="Some important text"
                    />
                </div>
            </Box>
        </Container>
    )
}

export default Signup;