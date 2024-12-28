import express from 'express';
import { deleteUserById, getUsers } from '../database/actions/db.actions';

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

export const deleteUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const user = await deleteUserById(id);
    res.status(200).json({ msg: 'successfully deleted user: ', user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: 'Unauthorized' });
    return;
  }
};
