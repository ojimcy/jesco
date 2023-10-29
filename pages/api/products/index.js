import db from '@/utils/db';
import Product from '@/utils/models/Product';
import { createRouter } from 'next-connect';

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();

  res.send(products);
});

export default router.handler();
