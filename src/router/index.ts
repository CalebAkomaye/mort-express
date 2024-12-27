import express from 'express';
import authRoute from './auth.route';
import usersRoute from './users.route';

const router = express.Router();

export default (): express.Router => {
  authRoute(router);
  usersRoute(router);
  return router;
};
