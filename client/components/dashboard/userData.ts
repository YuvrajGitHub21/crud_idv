export interface User {
  id: string;
  initials: string;
  name: string;
  email: string;
  avatarColor: string;
}

export const allUsers: User[] = [
  {
    id: '1',
    initials: 'OP',
    name: 'Roger G. Rhone',
    email: 'RogerGRhone@teleworm.us',
    avatarColor: 'avatar-1'
  },
  {
    id: '2',
    initials: 'MT',
    name: 'Mike J. Torres',
    email: 'MikeJTorres@rhyta.com',
    avatarColor: 'avatar-2'
  },
  {
    id: '3',
    initials: 'WM',
    name: 'Wanda C. Moore',
    email: 'WandaCMoore@dayrep.com',
    avatarColor: 'avatar-3'
  },
  {
    id: '4',
    initials: 'RK',
    name: 'Roy C. Kephart',
    email: 'RoyCKephart@dayrep.com',
    avatarColor: 'avatar-4'
  },
  {
    id: '5',
    initials: 'LS',
    name: 'Lois S. Spencer',
    email: 'LoisSSpencer@rhyta.com',
    avatarColor: 'avatar-5'
  },
  {
    id: '6',
    initials: 'JB',
    name: 'Jerry T. Beavers',
    email: 'JerryTBeavers@teleworm.us',
    avatarColor: 'avatar-6'
  },
  {
    id: '7',
    initials: 'VS',
    name: 'Victoria Smith',
    email: 'VictoriaSmith@example.com',
    avatarColor: 'avatar-7'
  },
  {
    id: '8',
    initials: 'DH',
    name: 'David Hall',
    email: 'DavidHall@example.com',
    avatarColor: 'avatar-8'
  },
  {
    id: '9',
    initials: 'AM',
    name: 'Alice Miller',
    email: 'AliceMiller@example.com',
    avatarColor: 'avatar-1'
  },
  {
    id: '10',
    initials: 'BJ',
    name: 'Bob Johnson',
    email: 'BobJohnson@example.com',
    avatarColor: 'avatar-2'
  }
];

// Generate user lists based on the +N count in the invitees
export const getTemplateUsers = (templateId: number, additionalCount: number): User[] => {
  const baseUsers = allUsers.slice(0, 2); // First two users (OP, VS equivalent)

  // Add exactly the number specified in +N
  const additionalUsers = allUsers.slice(2, 2 + additionalCount);

  return [...baseUsers, ...additionalUsers];
};
