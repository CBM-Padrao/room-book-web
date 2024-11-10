import { UserTable } from '../../components/UserTable';

export function Admin() {
  // Redirect to the admin login page if the user is not authenticated and it's not an admin

  return <UserTable />;
}
