import express from 'express';
import { get, merge } from 'lodash';
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

export const isUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string | undefined;
    if (!currentUserId?.toString()) {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }

    if (currentUserId.toString() !== id) {
      res.status(401).json({ msg: 'Unauthorized' });
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Unauthorized' });
  }
};
