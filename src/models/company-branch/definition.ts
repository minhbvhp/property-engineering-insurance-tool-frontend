export interface ICompanyBranch {
  id: number;
  companyId: number;
  areaId: number;
  name: string;
  address: string;
  addressEN: string;
  phoneNumber: string;
  fax: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;

  company: {
    id: number;
    fullName: string;
    englishName: string;
    shortName: string;
    registrationNumber: string;
  };

  area: {
    id: number;
    name: string;
  };
}

export interface ICreateCompanyBranchDto {
  companyId: number;
  areaId: number;
  name: string;
  address: string;
  addressEN: string;
  phoneNumber: string;
  fax: string;
}

export interface IEditCompanyBranchDto {
  companyId: number;
  areaId: number;
  name: string;
  address: string;
  addressEN: string;
  phoneNumber: string;
  fax: string;
}
