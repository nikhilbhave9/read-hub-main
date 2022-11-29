// ============= WILL BE USED FOR FIRST-TIME SIGNUP =============
// HOW TO INTEGRATE WITH A GOOGLE SIGNUP (Figure out routing)

// Imports
import * as React from 'react';

// Components

// Styling
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';

// import dayjs from 'dayjs';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// Google OAuth sign up (if needed)




// Step 1: Add O-Auth functionality
// Step 2: Create a Form for user to input their information (First Name (req), Last Name, Date of birth (req), Profile Photo, Newsletters)
// Step 3: Add onClick functionality after submission
// Step 4: Store information in some form of a database (MongoDB?)
// Step 5: Add useNavigate hook from React Router to redirect to user-specific Dashboard 


// List of Subscription tiers
const subscriptions = [
    {
        value: '1',
        label: 'Free',
    },
    {
        value: '2',
        label: 'Premium',
    },
    {
        value: '3',
        label: 'Premium Plus',
    },
];


function Signup() {

    // Configuration for Date Picker
    // const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

    // const handleChange = (newValue) => {
    //     setValue(newValue);
    // };

    // Handle Subscription tiers
    const [subscription, setSubscription] = React.useState('1');

    const handleChange = (event) => {
        setSubscription(event.target.value);
    };


    return (
        <Container align="center" sx={{ mt: "2rem", mb: "2rem"}}>
            <Typography variant='h3'>Set up your profile</Typography>
            <Stack
                component="form"
                // sx={{
                //     '& .MuiTextField-root': { m: 1, width: '25ch' },
                // }}
                noValidate
                autoComplete="off"
            >

                <TextField
                    fullWidth
                    required
                    id="firstname-required"
                    label="First Name"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    margin="normal"
                />

                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Profile Photo
                    <input
                        type="file"
                        hidden
                    />
                </Button>

                <TextField
                    required 
                    id="dob"
                    label="Date of Birth"
                    type="date"
                    defaultValue="2000-11-01"
                    margin="normal"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            label="Date of Birth"
                            inputFormat="DD/MM/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} />}

                        />
                    </LocalizationProvider> */}

                <TextField
                    required
                    id="outlined-subscription-select"
                    select
                    label="Tier"
                    margin="normal"
                    value={subscription}
                    onChange={handleChange}
                    helperText="Please select your preferred tier"
                >
                    {subscriptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <Typography variant="body1">Start by entering up to 3 newsletter URLs</Typography>
                <Typography variant="subtitle2">Or we can start you off with some of our favourites</Typography>

                <TextField
                    fullWidth
                    id="sub1"
                    label="Subscription #1"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="sub2"
                    label="Subscription #2"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="sub3"
                    label="Subscription #3"
                    margin="normal"
                />
                
                <Button>
                    Submit
                </Button>
            </Stack>
        </Container>
    )
}

export default Signup;