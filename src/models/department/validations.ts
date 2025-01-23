import {
  COMPANY_BRANCH_INVALID,
  REQUIRED_FIELD,
  ROLE_INVALID,
} from "@/lib/messages";
import { z } from "zod";

export const createDepartmentSchema = z.object({
  urn: z.string().min(1, { message: REQUIRED_FIELD }),
  name: z.string().min(1, { message: REQUIRED_FIELD }),
  companyBranchId: z.string().min(1, { message: COMPANY_BRANCH_INVALID }),
});

export type CreateDepartmentFormValues = z.infer<typeof createDepartmentSchema>;

export const editDepartmentSchema = z.object({
  urn: z.string().min(1, { message: REQUIRED_FIELD }),
  name: z.string().min(1, { message: REQUIRED_FIELD }),
  companyBranchId: z.string().min(1, { message: COMPANY_BRANCH_INVALID }),
});

export type EditDepartmentFormValues = z.infer<typeof editDepartmentSchema>;
