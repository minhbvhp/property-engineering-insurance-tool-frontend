export enum ToastStatus {
  default = "default",
  error = "destructive",
  success = "success",
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type MenuSubItem = {
  title: string;
  url: string;
  isActive?: boolean;
};

export type MenuItem = {
  title: string;
  url: string;
  iconName?: string;
  isActive?: boolean;
  items?: MenuSubItem[];
};
