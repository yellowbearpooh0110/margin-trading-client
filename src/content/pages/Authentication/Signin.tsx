import * as React from 'react';
import {
  Box,
  Card,
  Typography,
  Container,
  Button,
  FormControl,
  Dialog
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Google as GoogleIcon } from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from 'providers/AuthProvider';

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const Signin: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { setAuthState } = useAuth();
  React.useEffect(() => {
    const jwtToken = searchParams.get('token');
    if (jwtToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      setAuthState({ jwtToken });
    }
  }, [searchParams]);
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h2" sx={{ my: 2 }}>
              Welcome.
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              fontWeight="normal"
              sx={{ mb: 4 }}
            >
              Please sign in to continue.
            </Typography>
          </Box>
          <Container maxWidth="sm">
            <Card sx={{ textAlign: 'center', mt: 3, p: [1, 4] }}>
              <FormControl variant="outlined" fullWidth>
                {/* <Stack spacing={2}>
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    inputProps={{
                      style: { paddingLeft: 50, marginLeft: -44 }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ zIndex: 1 }}>
                          <EmailIcon />
                        </InputAdornment>
                      ),
                      style: { paddingLeft: 12 }
                    }}
                  />
                  <TextField
                    required
                    id="outlined-password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    inputProps={{
                      style: { paddingLeft: 50, marginLeft: -44 }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ zIndex: 1 }}>
                          <KeyIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <IconButton sx={{ marginLeft: '-40px' }}>
                          <VisibilityIcon />
                        </IconButton>
                      ),
                      style: { paddingRight: 0, paddingLeft: 12 }
                    }}
                  />
                  <Button variant="outlined">Sign in</Button>
                </Stack> */}
                <Button
                  variant="outlined"
                  href="http://localhost:8080/oauth/google"
                >
                  <GoogleIcon sx={{ mr: 1 }} />
                  Sign In With Google
                </Button>
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    setOpen((_prev) => !_prev);
                  }}
                >
                  Test
                </Button>
                <Dialog
                  keepMounted
                  maxWidth="sm"
                  fullWidth
                  open={open}
                  onClose={() => {
                    setOpen(false);
                  }}
                >
                  Test
                </Dialog>
              </FormControl>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
};

export default Signin;
