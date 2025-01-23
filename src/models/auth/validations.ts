import { EMAIL_INVALID, REQUIRED_FIELD } from "@/lib/messages";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: REQUIRED_FIELD }).email(EMAIL_INVALID),
  password: z.string().min(1, { message: REQUIRED_FIELD }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
