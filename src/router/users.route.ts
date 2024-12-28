import express from 'express';

import { deleteUsers, getAllUsers, updateUser } from '../controllers/users';
import { isAuthenticated, isUser } from '../middlewares/index';

export default (router: express.Router) => {
  router.get('/users', isAuthenticated, getAllUsers);
  router.delete('/users/:id', isAuthenticated, isUser, deleteUsers);
  router.patch('/users/:id', isAuthenticated, isUser, updateUser);
};
