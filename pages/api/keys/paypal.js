import { isAuth } from '@/utils/auth';
import { createRouter } from 'next-connect';

const router = createRouter();
router.use(isAuth);
router.get(async (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

export default router.handler();
