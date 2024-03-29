import { isAuth } from '@/utils/auth';
import db from '@/utils/db';
import Order from '@/utils/models/Order';
import { createRouter } from 'next-connect';

const router = createRouter();
router.use(isAuth)

router.get(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  await db.disconnect();

  res.send(order);
});

export default router.handler();
