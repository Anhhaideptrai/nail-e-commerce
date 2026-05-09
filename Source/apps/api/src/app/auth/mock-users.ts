export type MockUserRole = 'super_admin' | 'admin';

export type MockAuthUser = {
  email: string;
  id: string;
  name: string;
  password: string;
  role: MockUserRole;
  status: 'active' | 'disabled';
};

// MOCK ONLY: replace this array with rows from the users/admin_accounts table
// when the database repository is implemented. Keep the returned shape aligned
// with MockAuthUser or update AuthService mapping at the same time.
export const mockAuthUsers: MockAuthUser[] = [
  {
    email: 'owner@silver14.test',
    id: 'user-owner',
    name: 'Owner',
    password: 'password123',
    role: 'super_admin',
    status: 'active',
  },
  {
    email: 'admin@silver14.test',
    id: 'user-admin',
    name: 'Operations Admin',
    password: 'password123',
    role: 'admin',
    status: 'active',
  },
];
