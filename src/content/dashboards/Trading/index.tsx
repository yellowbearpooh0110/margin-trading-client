import { Helmet } from 'react-helmet-async';
// import PageHeader from './PageHeader';
import PageTitleWrapper from 'components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'components/Footer';

// import AccountBalance from './AccountBalance';
import Exchange from './Exchange';

const DashboardTrading = () => {
  return (
    <>
      <Helmet>
        <title>Trading Dashboard</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}>
            {/* <AccountBalance /> */}
          </Grid>
          <Grid item xs={12}>
            <Exchange />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default DashboardTrading;
