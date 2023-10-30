import db from '@/utils/db';
import Order from '@/utils/models/Order';
import { createRouter } from 'next-connect';
import { onError } from '@/utils/error';
import { isAdmin, isAuth } from '@/utils/auth';
import Product from '@/utils/models/Product';
import User from '@/utils/models/User';

const router = createRouter({
  onError,
});

router.use(isAuth, isAdmin);

router.get(async (req, res) => {
  try {
    await db.connect();
    const ordersCount = await Order.countDocuments();
    const productsCount = await Product.countDocuments();
    const usersCount = await User.countDocuments();
    const ordersPriceGroup = await Order.aggregate([
      {
        $group: {
          _id: null,
          sales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const ordersPrice =
      ordersPriceGroup.length > 0 ? ordersPriceGroup[0].sales : 0;
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    res.send({
      ordersCount,
      productsCount,
      usersCount,
      ordersPrice,
      salesData,
    });
  } catch (error) {
    res.status(500).send({ message: error.toString() });
  }
});

export default router.handler();
