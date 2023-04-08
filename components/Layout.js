import useStyles from '@/utils/styles';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <AppBar
        position="static"
        className={classes.navbar}
      >
        <Toolbar>
          <Typography>Jesco</Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>

      <footer className={classes.footer}>
        <Typography>All rights reserved. Jesco App.</Typography>
      </footer>
    </>
  );
}
