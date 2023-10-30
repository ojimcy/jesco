import db from '@/utils/db';
import User from '@/utils/models/User';
import { createRouter } from 'next-connect';
import { isAdmin, isAuth } from '@/utils/auth';

const router = createRouter();
router.use(isAuth, isAdmin);

router.get(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  await db.disconnect();
  res.send(user);
});

router.put(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    user.name = req.body.name;
    user.slug = req.body.slug;
    user.price = req.body.price;
    user.category = req.body.category;
    user.image = req.body.image;
    user.brand = req.body.brand;
    user.countInStock = req.body.countInStock;
    user.description = req.body.description;
    await user.save();
    await db.disconnect();
    res.send({ message: 'User Updated Successfully' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.delete(async (req, res) => {
  await db.connect();
  const user = await User.findById(req.query.id);
  if (user) {
    await user.remove();
    await db.disconnect();
    res.send({ message: 'User Deleted' });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'User Not Found' });
  }
});

export default router.handler();
