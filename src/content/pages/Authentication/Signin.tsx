import * as React from 'react';
import {
  Box,
  Card,
  Typography,
  Container,
  Divider,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  TextField,
  IconButton
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import {
  Email as EmailIcon,
  Key as KeyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon
} from '@mui/icons-material';

import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';

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

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonSearch = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

const Signin: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Signin</title>
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
                <Stack spacing={2}>
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
                </Stack>
              </FormControl>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
};

export default Signin;
