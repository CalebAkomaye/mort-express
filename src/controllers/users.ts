import express from 'express';
import { getUsers } from '../database/actions/db.actions';

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    res.status(200).json({ msg: 'successful', users });
    return;
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }
};
