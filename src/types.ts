export type Giveaway = {
  name: string;
  socialNetwork: string;
  participants: User[];
};

export type User = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
};
