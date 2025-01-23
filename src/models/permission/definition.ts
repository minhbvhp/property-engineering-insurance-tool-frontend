import { ISubject } from "@/models/subject/definition";

export enum ACTIONS {
  MANAGE = "manage",
  CREATE = "create",
  READ = "read",
  UPDATE = "update",
  DELETE = "delete",
}

export interface IAction {
  name: string;
  description: string;
}

export interface IPermission {
  id: number;
  action: ACTIONS;
  subjectId: number;
  condition?: Record<string, string>;
  description: string;
  subject: ISubject;
}

export interface ICreatePermissionDto {
  action: ACTIONS;
  subjectId: number;
  condition?: Record<string, string>;
  description: string;
}

export interface IEditPermissionDto {
  action: ACTIONS;
  subjectId: number;
  condition?: Record<string, string>;
  description: string;
}
