import * as bcrypt from 'bcrypt';
import { ValidRoles } from 'src/auth/interfaces';

interface SeedUser {
  email: string;
  password: string;
  roles: ValidRoles[];
  name: string;
}

interface SeedData {
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'admin@example.com',
      password: bcrypt.hashSync('Abc123456@', 10),
      roles: [ValidRoles.ADMIN],
      name: 'Admin User',
    },
    {
      email: 'user@example.com',
      password: bcrypt.hashSync('Abc123456@', 10),
      roles: [ValidRoles.USER],
      name: 'Regular User',
    },
    {
      email: 'superadmin@example.com',
      password: bcrypt.hashSync('Abc123456@', 10),
      roles: [ValidRoles.SUPER_ADMIN, ValidRoles.USER],
      name: 'Admin User',
    },
  ],
};
