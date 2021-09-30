/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import gravatar from '../util/gravatar';

const signUp = async (req, res) => {
  let { email } = req.body;
  const { firstName, lastName, username, password } = req.body;
  if (email) {
    email = email.trim().toLowerCase();
  }
  const hashed = await bcrypt.hash(password, 10);
  const avatar = gravatar(email);
  try {
    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      avatar,
      password: hashed,
    });
    return res.status(201).json({
      data: {
      	id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      },
      token: `Bearer ${jwt.sign({ id: user._id }, process.env.JWT_SECRET)}`,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: 'Error creating account' });
  }
};

const signIn = async (req, res) => {
  let { login } = req.body;
  const { password } = req.body;
  if (login) {
    login = login.trim().toLowerCase();
  }

  const user = await User.findOne({
    $or: [{ email: login }, { username: login }],
  });

  if (!user) {
    return res.status(404).json({ error: 'Error signing in' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(404).json({ error: 'Error signing in' });
  }

  return res.status(201).json({
    data: {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
    },
    token: `Bearer ${jwt.sign({ id: user._id }, process.env.JWT_SECRET)}`,
  });
};

export { signUp, signIn };
