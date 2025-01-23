import { REQUIRED_FIELD } from "@/lib/messages";
import { z } from "zod";

export const createCompanyBranchSchema = z.object({
  companyId: z.string().min(1, { message: REQUIRED_FIELD }),
  areaId: z.string().min(1, { message: REQUIRED_FIELD }),
  name: z.string().min(1, { message: REQUIRED_FIELD }),
  address: z.string().min(1, { message: REQUIRED_FIELD }),
  addressEN: z.string().min(1, { message: REQUIRED_FIELD }),
  phoneNumber: z.string().optional(),
  fax: z.string().optional(),
});

export type CreateCompanyBranchFormValues = z.infer<
  typeof createCompanyBranchSchema
>;

export const editCompanyBranchSchema = z.object({
  companyId: z.string().min(1, { message: REQUIRED_FIELD }),
  areaId: z.string().min(1, { message: REQUIRED_FIELD }),
  name: z.string().min(1, { message: REQUIRED_FIELD }),
  address: z.string().min(1, { message: REQUIRED_FIELD }),
  addressEN: z.string().min(1, { message: REQUIRED_FIELD }),
  phoneNumber: z.string().optional(),
  fax: z.string().optional(),
});

export type EditCompanyBranchFormValues = z.infer<
  typeof editCompanyBranchSchema
>;
