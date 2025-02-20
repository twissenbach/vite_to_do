import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  TextField,
  Grid
} from '@mui/material';
import { login } from '../services/api';

const LogIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await login(formData.email, formData.password);
        console.log('Login successful:', response);
        // Redirect to dashboard or home page
        navigate('/dashboard');
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          submit: error.message || 'Login failed'
        }));
      }
    }
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      {/* Navigation */}
      <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #eaeaea' }}>
        <Toolbar sx={{ py: 1 }}>
          <Typography 
            variant="h6" 
            component={Link}
            to="/"
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#db4c3f',
              textDecoration: 'none'
            }}
          >
            ToDoList
          </Typography>
          <Button 
            component={Link} 
            to="/signup" 
            variant="contained" 
            sx={{
              bgcolor: '#db4c3f',
              textTransform: 'none',
              fontSize: '0.95rem',
              px: 3,
              '&:hover': {
                bgcolor: '#e27065'
              }
            }}
          >
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      {/* Login Form */}
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            maxWidth: '600px',
            width: '100%',
            bgcolor: '#fafafa'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700,
              color: '#333',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Log In
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    bgcolor: '#db4c3f',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    py: 1.5,
                    mt: 2,
                    '&:hover': {
                      bgcolor: '#e27065'
                    }
                  }}
                >
                  Log In
                </Button>
              </Grid>
            </Grid>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#666' }}>
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                style={{ 
                  color: '#db4c3f', 
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LogIn;
