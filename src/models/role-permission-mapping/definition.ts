export interface IRolePermissionMapping {
  id: number;
  roleId: number;
  permissionId: number;
  role: {
    description: string;
  };
  permission: {
    description: string;
  };
}

export interface ICreateRolePermissionMappingsDto {
  roleId: number;
  permissionIds: number[];
}
