
import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Link as MuiLink
} from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SharedImage from '../components/SharedImage';
import { motion } from 'motion/react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  //const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
        <Container maxWidth="xl" disableGutters sx={{ minHeight: '100vh', display: 'flex' }}>
            {/* Left Section - Background Image */}
          <Box 
            sx={{ 
              width: '50%', 
              position: 'relative',
              background: '#fff',
              display: { xs: 'none', md: 'block' },
              padding: '2.5%',
            }}
          >
            <motion.div
              initial={{ x: 500 }}
              animate={{ x: 0 }}
              exit={{ x: -500 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <SharedImage />
            </motion.div>
          </Box>
          {/* Right Section */}
          <Box sx={{ 
            width: '50%', 
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            '@media (max-width: 900px)': {
              width: '100%',
            }
          }}>
            <Box sx={{ mb: 8, mt: 2 }}>
              <Logo />
            </Box>
            
            <Box sx={{ maxWidth: 480, width: '100%', marginRight: 'auto', marginLeft: '0' }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'start' }}>
                Reset your password
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, textAlign: 'start' }}>
                Enter your email and we'll send you instructions to reset your password.
              </Typography>

              {!submitted ? (
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Box sx={{ mb: 2.5 }}>
                    <Typography variant="body1" component="label" htmlFor="email" sx={{ display: 'block', mb: 1, fontWeight: 500, textAlign: 'start' }}>
                      Email
                    </Typography>
                    <TextField
                      fullWidth
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      variant="outlined"
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Box>
                  
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 4,
                      mb: 2,
                      py: 1.5,
                      borderRadius: 2,
                      backgroundColor: 'hsl(var(--primary))',
                      textTransform: 'none',
                      fontWeight: 500,
                      fontSize: '1rem',
                      '&:hover': {
                        backgroundColor: '#8200FF',
                      }
                    }}
                  >
                    Send reset link
                  </Button>
                  
                  <Box sx={{ textAlign: 'start', mt: 1 }}>
                    <MuiLink 
                      component={Link}
                      to="/login"
                      underline="none" 
                      sx={{ color: 'hsl(var(--primary))', fontSize: '0.875rem', textAlign: 'start' }}
                    >
                      Back to login
                    </MuiLink>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Box component="div" sx={{ 
                    width: 64, 
                    height: 64, 
                    borderRadius: '50%', 
                    bgcolor: '#f0e6ff', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto',
                    mb: 3
                  }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#B066FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Check your email
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
                    We've sent a password reset link to {email}
                  </Typography>
                  <MuiLink 
                      component={Link}
                      to="/login"
                      underline="none" 
                      sx={{ color: '#B066FF', fontSize: '0.875rem', textAlign: 'start' }}
                    >
                      Back to login
                    </MuiLink>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </motion.div>
  );
};

export default ForgotPassword;
