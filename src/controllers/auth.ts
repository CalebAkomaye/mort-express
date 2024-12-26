import { createUser, getUserByEmail } from '../database/actions/db.actions';
import express from 'express';
import { authenticate, randBytes } from '../helpers/index';

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res.status(400).json({ msg: 'All fields are required' });
      return;
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    const salt = randBytes();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authenticate(salt, password),
      },
    });

    res.status(200).json({ msg: 'successful', user });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ msg: 'Incorrect password or email' });
      return;
    }

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );
    if (!user) {
      res.status(400).json({
        msg: 'credentials not registered, please signup to create an account',
      });
      return;
    }

    const tempHash = authenticate(user.authentication?.salt || '', password);
    if (user.authentication?.password !== tempHash) {
      res.status(403).json({ msg: 'Incorrect password' });
      return;
    }

    const salt = randBytes();
    user.authentication.sessionToken = authenticate(salt, user._id.toString());

    await user.save();
    res.cookie('mort', user.authentication.sessionToken, {
      domain: 'localhost',
      path: '/',
    });
    res.status(200).json({ msg: 'Login successful', user });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
