import useStyles from '@/utils/styles';
import { AppBar, Container, Link, Toolbar, Typography } from '@mui/material';
import Head from 'next/head';
import React from 'react';
import NextLink from 'next/link';

export default function Layout({ title, description, children }) {
  const classes = useStyles();
  return (
    <>
      <Head>
        <title>{title ? `${title} - Jesco Global` : 'Jesco Global'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <AppBar
        position="static"
        className={classes.navbar}
      >
        <Toolbar>
          <NextLink
            href="/"
            className={classes.brand}
          >
            Jesco
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <NextLink
              href="/cart"
              passHref
            >
              Cart
            </NextLink>
            <NextLink
              href="/login"
              passHref
            >
              Login
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>

      <footer className={classes.footer}>
        <Typography>All rights reserved. Jesco App.</Typography>
      </footer>
    </>
  );
}
