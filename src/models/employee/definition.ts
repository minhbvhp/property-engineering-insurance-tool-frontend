export interface IEmployee {
  id: number;
  urn: string;
  fullName: string;
  deletedAt: Date;
  createdAt: Date;
  departmentId: number;

  department: {
    name: string;
  };
}

export interface ICreateEmployeeDto {
  urn: string;
  fullName: string;
  departmentId: number;
}

export interface IEditEmployeeDto {
  urn: string;
  fullName: string;
  departmentId: number;
}
