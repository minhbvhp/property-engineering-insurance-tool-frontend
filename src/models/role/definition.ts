export interface IRole {
  id: number;
  name: string;
  description: string;
}

export interface ICreateRoleDto {
  name: string;
  description: string;
}

export interface IEditRoleDto {
  name: string;
  description: string;
}
