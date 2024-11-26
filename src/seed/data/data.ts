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
      name: 'root_user',
    },
    {
      email: 'user@example.com',
      password: bcrypt.hashSync('Abc123456@', 10),
      roles: [ValidRoles.USER],
      name: 'David A.',
    },
    {
      email: 'superadmin@example.com',
      password: bcrypt.hashSync('Abc123456@', 10),
      roles: [ValidRoles.SUPER_ADMIN, ValidRoles.USER],
      name: 'super_root_user',
    },
  ],
};
