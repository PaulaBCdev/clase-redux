interface User {
  name: string;
  username: string;
}

export interface Tweet {
  id: number;
  userId: number;
  content: string;
  updatedAt: string;
  user: User;
  likes: unknown[];
}
