export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export type SignUpInputs = {
  email: string;
  name: string;
  password: string;
};

export type SignInInputs = {
  email: string;
  password: string;
};
