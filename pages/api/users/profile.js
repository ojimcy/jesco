import db from '@/utils/db';
import User from '@/utils/models/User';
import { createRouter } from 'next-connect';
import bcrypt from 'bcryptjs';
import { isAuth, signToken } from '@/utils/auth';

const router = createRouter();

router.use(isAuth);

router.put(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.user._id);
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password
    ? bcrypt.hashSync(req.body.password)
    : user.password;
  await user.save();
  await db.disconnect();

  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default router.handler();
