import React, { useContext } from 'react';
import Layout from '@/components/Layout';
import {
  Button,
  Card,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import { Store } from '@/utils/Store';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/router';
import useStyles from '@/utils/styles';

function Cart() {
  const router = useRouter()
  const { dispatch, state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const classes = useStyles();

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Product is out of stock!');
    }

    dispatch({ type: 'ADD_TO_CART', payload: { ...item, quantity } });
  };

  const removeItemHandler = async (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    router.push('/shipping');
  }
  
  return (
    <Layout title="Shopping Cart">
      <Typography variant="h1" component="h1">
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty.{' '}
          <NextLink className={classes.link} href="/">
            Go Shopping
          </NextLink>{' '}
        </div>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          {item.name}
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            updateCartHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : ${' '}
                    {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button variant="contained" color="primary" fullWidth onClick={checkoutHandler}>
                    CHECK OUT
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}
// prevent server side rendering
export default dynamic(() => Promise.resolve(Cart), { ssr: false });
