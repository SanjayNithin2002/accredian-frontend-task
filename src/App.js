import { BrowserRouter as Router, Route, Routes,  Navigate  } from 'react-router-dom';
import SignUp from './components/Signup';
import LogIn from './components/Login';
import OTPForm from './components/OTPForm';
import ForgotPassword from './components/ForgotPassword';
import ChangePassword from './components/ChangePassword';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otpform" element={<OTPForm />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/" exact element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
