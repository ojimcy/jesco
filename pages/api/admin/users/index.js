import db from '@/utils/db';
import User from '@/utils/models/User';
import { createRouter } from 'next-connect';
import { isAdmin, isAuth } from '@/utils/auth';

const router = createRouter();
router.use(isAuth, isAdmin);

router.get(async (req, res) => {
  await db.connect();
  const users = await User.find({});
  await db.disconnect();
  res.send(users);
});

export default router.handler();
