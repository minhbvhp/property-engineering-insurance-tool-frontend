export interface ICustomerContacts {
  name: string;
  phone: string;
  email?: string;
}

export interface ICustomer {
  id: string;
  taxCode: string;
  shortName: string;
  fullName: string;
  address: string;
  userId: string;
  contacts: ICustomerContacts[];
  createdAt: string;
  deletedAt?: string;
}

export interface ICustomerData {
  customers: ICustomer[];
  totalPages: number;
}

export interface ICreateCustomerDto {
  taxCode: string;
  shortName: string;
  fullName: string;
  address: string;
  contacts?: ICustomerContacts[];
}

export interface IEditCustomerDto {
  taxCode: string;
  shortName: string;
  fullName: string;
  address: string;
  contacts?: ICustomerContacts[];
}
