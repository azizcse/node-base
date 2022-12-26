export type CreateUserParam = {
  name: string;
  email: string;
  password: string
};

export type CreateProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreatePostParams = {
  title: string;
  description: string;
};