import db from '@/utils/db';
import Order from '@/utils/models/Order';
import { createRouter } from 'next-connect';
import { onError } from '@/utils/error';
import { isAuth } from '@/utils/auth';

const router = createRouter({
  onError,
});

router.use(isAuth);

router.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({}).populate('user', 'name');
  res.status(201).send(orders);
});

export default router.handler();
