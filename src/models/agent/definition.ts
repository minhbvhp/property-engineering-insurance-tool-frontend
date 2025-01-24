export interface IAgent {
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

export interface ICreateAgentDto {
  urn: string;
  fullName: string;
  departmentId: number;
}

export interface IEditAgentDto {
  urn: string;
  fullName: string;
  departmentId: number;
}
