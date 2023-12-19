import { BrowserRouter as Router, Route, Routes,  Navigate  } from 'react-router-dom';
import SignUp from './components/Signup';
import LogIn from './components/Login';
import OTPForm from './components/OTPForm';
import React from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otpform" element={<OTPForm />} />
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
