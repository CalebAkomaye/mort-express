import { users } from './database/seed.db';
import { userModel } from './database/users';

export const seedUsers = async () => {
  try {
    await userModel.deleteMany({});
    console.log('users collection cleared');

    await userModel.insertMany(users);
    console.log('users seeded');
  } catch (error) {
    console.log(error, 'error seeding users');
  }
};
