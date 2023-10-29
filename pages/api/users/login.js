import db from '@/utils/db';
import User from '@/utils/models/User';
import { createRouter } from 'next-connect';
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/auth';

const router = createRouter();

router.post(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  await db.disconnect();
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
    res.send({
      token,
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

export default router.handler();
