import db from '@/utils/db';
import Order from '@/utils/models/Order';
import { createRouter } from 'next-connect';
import { onError } from '@/utils/error';
import { isAuth } from '@/utils/auth';

const router = createRouter({
  onError,
});

router.use(isAuth);

router.post(async (req, res) => {
  await db.connect();
  const newOrder = new Order({ ...req.body, user: req.user._id });

  const order = await newOrder.save();
  res.status(201).send(order);
});

export default router.handler();
