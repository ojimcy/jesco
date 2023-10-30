import db from '@/utils/db';
import Order from '@/utils/models/Order';
import { createRouter } from 'next-connect';
import { onError } from '@/utils/error';
import { isAuth } from '@/utils/auth';

const router = createRouter({
  onError,
});

router.use(isAuth);

router.put(async (req, res) => {
  await db.connect();
  const order = await Order.findById(req.query.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.payer.email_address,
    };
    const paidOrder = await order.save();
    await db.disconnect();
    res.send({ message: 'Payment successfull', order: paidOrder });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'Order not found' });
  }
});

export default router.handler();
