export interface IUser {
  id: string;
  email: string;
  nameVN: string;
  nameEN: string;
  phoneNumber: string;
  active: boolean;
  updatedAt: string;
  createdAt: string;
  gender: {
    id: number;
    titleVN: string;
  };
  companyBranch: {
    id: number;
    name: string;
    company: {
      id: number;
      shortName: string;
    };
    area: {
      id: number;
      name: string;
    };
  };
  role: {
    id: number;
    name: string;
  };
}

export interface IUserData {
  users: IUser[];
  totalPages: number;
}

export interface ICreateUserDto {
  email: string;
  password: string;
  nameVN: string;
  nameEN: string;
  phoneNumber: string;
  genderId: number;
  roleId: number;
  companyBranchId: number;
}

export interface IEditUserDto {
  nameVN: string;
  nameEN: string;
  phoneNumber: string;
  genderId: number;
  roleId: number;
  companyBranchId: number;
}
