import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SimpleSnackbar from './SimpleSnackbar';
import CircularIndeterminate from './CircularIndeterminate';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const defaultTheme = createTheme();

const schema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('This field is required'),
});

export default function ForgotPassword() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const SnackbarRef = React.useRef();
    const { handleSubmit, control, formState } = useForm({
        resolver: yupResolver(schema),
    });
    const { errors } = formState;

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/sendotp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (!response.ok) {
                setLoading(false);
                const error = new Error(responseData.error);
                error.status = response.status;
                throw error;
            }else{
                navigate('/otpform', { state: responseData});
            }
            
            
        } catch (error) {
            setLoading(false);
            console.log(error);
            SnackbarRef.current.openSnackbar(`${error.status || 500} - ${error.message}`);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    autoComplete="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <br/>
                    {loading && <CircularIndeterminate />}
                    <SimpleSnackbar ref={SnackbarRef} />
                </Box>
            </Container>
        </ThemeProvider>
    );
}

