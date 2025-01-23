export interface IDepartment {
  id: number;
  urn: string;
  name: string;
  companyBranchId: number;
  deletedAt: string;
  createdAt: string;

  companyBranch: {
    name: string;

    company: {
      shortName: string;
    };
  };
}

export interface ICreateDepartmentDto {
  urn: string;
  name: string;
  companyBranchId: number;
}

export interface IEditDepartmentDto {
  urn: string;
  name: string;
  companyBranchId: number;
}
