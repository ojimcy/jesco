import data from '@/utils/data';
import db from '@/utils/db';
import Product from '@/utils/models/Product';
import { createRouter } from 'next-connect';

const router = createRouter();

router.get(async (req, res) => {
  await db.connect();

  // Check if products collection is empty
  const productsCount = await Product.countDocuments();

  if (productsCount > 0) {
    // Collection not empty, don't seed
    res.send({ message: 'Products collection not empty, skipping seeding' });
    await db.disconnect();
    return;
  }

  await Product.deleteMany();

  // Insert products
  const result = await Product.insertMany(data.products);

  await db.disconnect();

  res.send({
    message: 'Seeded successfully',
    numberOfProductsInserted: result.length,
  });
});

export default router.handler();
