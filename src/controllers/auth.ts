import { createUser, getUserByEmail } from 'database/actions/db.actions';
import express from 'express';
import { authenticate, randBytes } from 'helpers';

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
      authenticate: {
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
