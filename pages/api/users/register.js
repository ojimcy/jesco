import db from '@/utils/db';
import User from '@/utils/models/User';
import { createRouter } from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/auth';

const router = createRouter();

router.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  });
  const user = await newUser.save();
  await db.disconnect();
  const token = signToken(user);
  res.send({
    token,
    _id: user._id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
  });
});

export default router.handler();
