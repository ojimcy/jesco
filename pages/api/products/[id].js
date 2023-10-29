import db from '@/utils/db';
import Product from '@/utils/models/Product';
import { createRouter } from 'next-connect';

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();

  res.send(product);
});

export default router.handler();
