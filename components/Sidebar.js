import { Card, Grid, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import NextLink from 'next/link';
import useStyles from '@/utils/styles';

function Sidebar({ selectedItem }) {
  const classes = useStyles();

  return (
    <>
      <Grid item md={3} xs={12}>
        <Card className={classes.section}>
          <List>
            <NextLink href="/admin/dashboard" passHref>
              <ListItem
                button
                component="a"
                selected={selectedItem === 'dashboard'}
              >
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
            </NextLink>
            <NextLink href="/admin/orders" passHref>
              <ListItem
                button
                component="a"
                selected={selectedItem === 'orders'}
              >
                <ListItemText primary="Orders" />
              </ListItem>
            </NextLink>
            <NextLink href="/admin/products" passHref>
              <ListItem
                button
                component="a"
                selected={selectedItem === 'products'}
              >
                <ListItemText primary="Products" />
              </ListItem>
            </NextLink>
            <NextLink href="/admin/users" passHref>
              <ListItem button component="a">
                <ListItemText primary="Users"></ListItemText>
              </ListItem>
            </NextLink>
          </List>
        </Card>
      </Grid>
    </>
  );
}

export default Sidebar;
