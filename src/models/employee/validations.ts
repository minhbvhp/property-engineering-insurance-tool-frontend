import { DEPARTMENT_INVALID, REQUIRED_FIELD } from "@/lib/messages";
import { z } from "zod";

export const createEmployeeSchema = z.object({
  urn: z.string().min(1, { message: REQUIRED_FIELD }),
  fullName: z.string().min(1, { message: REQUIRED_FIELD }),
  departmentId: z.string().min(1, { message: DEPARTMENT_INVALID }),
});

export type CreateEmployeeFormValues = z.infer<typeof createEmployeeSchema>;

export const editEmployeeSchema = z.object({
  urn: z.string().min(1, { message: REQUIRED_FIELD }),
  fullName: z.string().min(1, { message: REQUIRED_FIELD }),
  departmentId: z.string().min(1, { message: DEPARTMENT_INVALID }),
});

export type EditEmployeeFormValues = z.infer<typeof editEmployeeSchema>;
