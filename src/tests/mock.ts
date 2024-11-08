export function mockUsers(n: number) {
  const users = [];
  const totalUsers = Math.min(n, 100); // Limit to 100 users

  const firstNames = [
    'John',
    'Jane',
    'Alex',
    'Chris',
    'Sam',
    'Taylor',
    'Jordan',
    'Morgan',
    'Cameron',
    'Drew'
  ];

  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Jones',
    'Brown',
    'Davis',
    'Miller',
    'Wilson',
    'Moore',
    'Taylor'
  ];

  const cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose'
  ];

  for (let id = 1; id <= totalUsers; id++) {
    const firstName = firstNames[(id - 1) % firstNames.length];
    const lastName = lastNames[(id - 1) % lastNames.length];
    const city = cities[(id - 1) % cities.length];

    const user = {
      id,
      name: `${firstName} ${lastName}`,
      email: `user${id}@example.com`,
      city
    };

    users.push(user);
  }

  return users;
}
