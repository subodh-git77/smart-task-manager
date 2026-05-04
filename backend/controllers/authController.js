import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signToken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

const sendAuthResponse = (res, user, statusCode = 200) => {
  res.status(statusCode).json({
    token: signToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
};

export const signup = async (req, res, next) => {
  try {
    const name = req.body.name?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Name, email and password are required');
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error('Password must be at least 6 characters');
    }

    const userExists = await User.exists({ email });
    if (userExists) {
      res.status(409);
      throw new Error('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    sendAuthResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const { password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email });
    const passwordMatches = user && (await bcrypt.compare(password, user.password));

    if (!passwordMatches) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    sendAuthResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const getMe = (req, res) => {
  res.json({ user: req.user });
};
