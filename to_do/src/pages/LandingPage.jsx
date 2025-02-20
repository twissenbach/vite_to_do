import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Paper
} from '@mui/material';

const LandingPage = () => {
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
            component="div" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#db4c3f'
            }}
          >
            ToDoList
          </Typography>
          <Button 
            component={Link} 
            to="/login" 
            sx={{ 
              mr: 2,
              textTransform: 'none',
              fontSize: '0.95rem',
              color: '#666',
              '&:hover': {
                color: '#333',
                background: 'transparent'
              }
            }}
          >
            Log In
          </Button>
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
            Start For Free
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 4,
            p: { xs: 4, md: 6 },
            maxWidth: '900px',
            width: '100%',
            bgcolor: '#fafafa'
          }}
        >
          <Grid 
            container 
            spacing={8} 
            sx={{ 
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <Grid item xs={12} md={8}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  lineHeight: 1.2,
                  color: '#333',
                  mb: 3
                }}
              >
                Organize your work and life, finally.
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  color: '#666',
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  lineHeight: 1.5,
                  mb: 4,
                  fontWeight: 400
                }}
              >
                Simplify life for both you and your team with the world's #1 task manager and to-do list app.
              </Typography>
              <Button 
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  bgcolor: '#db4c3f',
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  py: 1.5,
                  px: 4,
                  '&:hover': {
                    bgcolor: '#e27065'
                  }
                }}
              >
                Start for free
              </Button>

              {/* Trusted By Section */}
              <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #eaeaea' }}>
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    color: '#666',
                    fontSize: '0.9rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    mb: 1
                  }}
                >
                  Trusted By
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: '#999',
                    fontSize: '1.1rem',
                    fontStyle: 'italic'
                  }}
                >
                  Absolutely No-one
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default LandingPage;
