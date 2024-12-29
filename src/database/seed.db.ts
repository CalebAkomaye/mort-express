export interface IUser extends Document {
  username: string;
  bio: string;
  avatar: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export const users: Partial<IUser>[] = [
  {
    username: 'Doe Johnson',
    email: 'johnsondoe@mail.com',
    avatar:
      'https://utfs.io/f/hMnYMb2OZo9nuJeecvmZUXA3Q6MLc9TD7NdqFIY5HO0s2tmE',
    authentication: {
      password: 'johnsondoe123',
      salt: '',
      sessionToken: '',
    },
    bio: 'Full-stack developer with a passion for creating intuitive user experiences. Loves hiking and photography.',
  },
  {
    username: 'Bob Smith',
    email: 'bobsmith@mail.com',
    avatar:
      'https://utfs.io/f/hMnYMb2OZo9nDHwKMTnh8SKpue6WImOR0Hyo2ZUNifVGPxv7',
    authentication: {
      password: 'bobsmith123',
      salt: '',
      sessionToken: '',
    },

    bio: 'Backend engineer specializing in Node.js and database optimization. Enjoys playing chess and reading sci-fi novels.',
  },
  {
    username: 'Carol Martinez',
    email: 'carolmartinez@mail.com',
    avatar:
      'https://utfs.io/f/hMnYMb2OZo9npSTt68Rb2v43OyoVbk8KYlTFQJehraq7dzMA',
    authentication: {
      password: 'carolmartinez123',
      salt: '',
      sessionToken: '',
    },
    bio: 'Frontend developer focused on responsive design and accessibility. Avid traveler and coffee enthusiast.',
  },
];
