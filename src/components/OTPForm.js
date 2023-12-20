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
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const defaultTheme = createTheme();
const schema = yup.object().shape({
  otp: yup.string().matches(/^\d{6}$/, { message: 'OTP must be exactly 6 digits' }),
});

export default function OTPForm() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const SnackbarRef = React.useRef();
  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    // eslint-disable-next-line eqeqeq
    if(data.otp != state.otp){
      SnackbarRef.current.openSnackbar('401 - Invalid OTP');
    }
    else{
      const responseData = {
        email: state.email
      };
      navigate('/changepassword', { state: responseData});
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
            Enter OTP
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Controller
              name="otp"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="otp"
                  label="OTP"
                  error={!!errors.otp}
                  helperText={errors.otp?.message}
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
          <SimpleSnackbar ref={SnackbarRef} />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
