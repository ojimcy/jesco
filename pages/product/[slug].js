import Layout from '@/components/Layout';
import React, { useContext } from 'react';
import NextLink from 'next/link';
import { Button, Card, Grid, List, ListItem, Typography } from '@mui/material';
import useStyles from '@/utils/styles';
import Image from 'next/image';
import db from '@/utils/db';
import Product from '@/utils/models/Product';
import axios from 'axios';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';

export default function ProductPage(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { product } = props;
  const classes = useStyles();

  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock <= quantity) {
      window.alert('Product is out of stock');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Typography>← Back to products</Typography>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>{' '}
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>{' '}
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description:</Typography>
              <Typography>{product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xm={12}>
          <Card>
            <ListItem>
              <Grid container>
                <Grid item sm={6}>
                  <Typography>Price</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography>$ {product.price}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item sm={6}>
                  <Typography>Status</Typography>
                </Grid>
                <Grid item sm={6}>
                  <Typography>
                    $ {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={addToCartHandler}
              >
                Add to cart
              </Button>
            </ListItem>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();

  await db.disconnect();
  return {
    props: {
      product: db.productWithSerializableId(product),
    },
  };
}
