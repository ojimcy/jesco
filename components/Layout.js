import useStyles from '@/utils/styles';
import {
  AppBar,
  Badge,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const classes = useStyles();
  const [isClient, setIsClient] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('cartItems');
    router.push('/');
  };
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
            {userInfo ? (
              <>
                <Button
                  className={classes.navbarButton}
                  onClick={loginClickHandler}
                >
                  {userInfo.name}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                >
                  <MenuItem onClick={loginMenuCloseHandler}>Profile</MenuItem>
                  <MenuItem onClick={loginMenuCloseHandler}>
                    My Account
                  </MenuItem>
                  <MenuItem onClick={logoutClickHandler}>Logut</MenuItem>
                </Menu>
              </>
            ) : (
              <NextLink href="/login">Login</NextLink>
            )}
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
