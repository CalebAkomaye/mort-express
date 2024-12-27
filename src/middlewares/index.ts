import express from 'express';
import { get, identity, merge } from 'lodash';
import { getUserBySessionToken } from '../database/actions/db.actions';

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const session: string = req.cookies['mort'];
    if (!session) {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }

    const existingUser = await getUserBySessionToken(session);
    if (!existingUser) {
      res.status(403).json({ msg: 'signup to create an account' });
      return;
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }
};
