import { REQUIRED_FIELD } from "@/lib/messages";
import { z } from "zod";

export const createCompanyAreaSchema = z.object({
  name: z.string().min(1, { message: REQUIRED_FIELD }),
});

export type CreateCompanyAreaFormValues = z.infer<
  typeof createCompanyAreaSchema
>;

export const editCompanyAreaSchema = z.object({
  name: z.string().min(1, { message: REQUIRED_FIELD }),
});

export type EditCompanyAreaFormValues = z.infer<typeof editCompanyAreaSchema>;
