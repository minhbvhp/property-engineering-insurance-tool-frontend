export interface ICompany {
  id: number;
  shortName: string;
  fullName: string;
  englishName: string;
  registrationNumber: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCompanyDto {
  shortName: string;
  fullName: string;
  englishName: string;
  registrationNumber: string;
}

export interface IEditCompanyDto {
  shortName: string;
  fullName: string;
  englishName: string;
  registrationNumber: string;
}
