import { REQUIRED_FIELD } from "@/lib/messages";
import { z } from "zod";

export const createCompanySchema = z.object({
  shortName: z.string().min(1, { message: REQUIRED_FIELD }),
  fullName: z.string().min(1, { message: REQUIRED_FIELD }),
  englishName: z.string().min(1, { message: REQUIRED_FIELD }),
  registrationNumber: z.string().min(1, { message: REQUIRED_FIELD }),
});

export type CreateCompanyFormValues = z.infer<typeof createCompanySchema>;

export const editCompanySchema = z.object({
  shortName: z.string().min(1, { message: REQUIRED_FIELD }),
  fullName: z.string().min(1, { message: REQUIRED_FIELD }),
  englishName: z.string().min(1, { message: REQUIRED_FIELD }),
  registrationNumber: z.string().min(1, { message: REQUIRED_FIELD }),
});

export type EditCompanyFormValues = z.infer<typeof editCompanySchema>;
