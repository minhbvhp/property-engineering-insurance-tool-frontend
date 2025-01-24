import { DEPARTMENT_INVALID, REQUIRED_FIELD } from "@/lib/messages";
import { z } from "zod";

export const createAgentSchema = z.object({
  urn: z.string().min(1, { message: REQUIRED_FIELD }),
  fullName: z.string().min(1, { message: REQUIRED_FIELD }),
  departmentId: z.string().min(1, { message: DEPARTMENT_INVALID }),
});

export type CreateAgentFormValues = z.infer<typeof createAgentSchema>;

export const editAgentSchema = z.object({
  urn: z.string().min(1, { message: REQUIRED_FIELD }),
  fullName: z.string().min(1, { message: REQUIRED_FIELD }),
  departmentId: z.string().min(1, { message: DEPARTMENT_INVALID }),
});

export type EditAgentFormValues = z.infer<typeof editAgentSchema>;
