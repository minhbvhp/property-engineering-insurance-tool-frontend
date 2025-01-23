import {
  COMPANY_AREA_INVALID,
  COMPANY_BRANCH_INVALID,
  COMPANY_INVALID,
  EMAIL_INVALID,
  GENDER_INVALID,
  REQUIRED_FIELD,
  ROLE_INVALID,
} from "@/lib/messages";
import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().min(1, { message: REQUIRED_FIELD }).email(EMAIL_INVALID),
  password: z.string().min(1, { message: REQUIRED_FIELD }),
  nameVN: z.string().min(1, { message: REQUIRED_FIELD }),
  nameEN: z.string().min(1, { message: REQUIRED_FIELD }),
  phoneNumber: z.string().min(1, { message: REQUIRED_FIELD }),
  genderId: z.string().min(1, { message: GENDER_INVALID }),
  companyBranchId: z.string().min(1, { message: COMPANY_BRANCH_INVALID }),
  roleId: z.string().min(1, { message: ROLE_INVALID }),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;

export const editUserSchema = z.object({
  nameVN: z.string().min(1, { message: REQUIRED_FIELD }),
  nameEN: z.string().min(1, { message: REQUIRED_FIELD }),
  phoneNumber: z.string().min(1, { message: REQUIRED_FIELD }),
  genderId: z.string().min(1, { message: GENDER_INVALID }),
  companyBranchId: z.string().min(1, { message: COMPANY_BRANCH_INVALID }),
  roleId: z.string().min(1, { message: ROLE_INVALID }),
});

export type EditUserFormValues = z.infer<typeof editUserSchema>;
