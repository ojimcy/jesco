import { isAuth } from '@/utils/auth';
import db from '@/utils/db';
import { onError } from '@/utils/error';
import Order from '@/utils/models/Order';
import { createRouter } from 'next-connect';

const router = createRouter({
  onError,
});
router.use(isAuth);

router.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if(order.isPaid) {
     if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const deliveredOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'Order delivered', order: deliveredOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Order not found' });
  }
  }
 
});

export default router.handler();
