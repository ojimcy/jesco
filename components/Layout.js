import useStyles from '@/utils/styles';
import { AppBar, Badge, Container, Toolbar, Typography } from '@mui/material';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { Store } from '@/utils/Store';

export default function Layout({ title, description, children }) {
  const { state } = useContext(Store);
  const { cart } = state;
  const classes = useStyles();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>{title ? `${title} - Jesco Global` : 'Jesco Global'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" className={classes.brand}>
            Jesco
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            {isClient && (
              <NextLink href="/cart">
                <Badge
                  color="secondary"
                  badgeContent={cart.cartItems.length || 0}
                >
                  Cart
                </Badge>
              </NextLink>
            )}
            <NextLink href="/login">Login</NextLink>
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
