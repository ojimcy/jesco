import db from '@/utils/db';
import { createRouter } from 'next-connect';
import { onError } from '@/utils/error';
import { isAdmin, isAuth } from '@/utils/auth';
import Product from '@/utils/models/Product';

const router = createRouter({
  onError,
});

router.use(isAuth, isAdmin);

router.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

export default router.handler();
