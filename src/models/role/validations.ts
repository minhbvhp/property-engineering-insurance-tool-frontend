import { REQUIRED_FIELD } from "@/lib/messages";
import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(1, { message: REQUIRED_FIELD }),
  description: z.string().min(1, { message: REQUIRED_FIELD }),
});

export type CreateRoleFormValues = z.infer<typeof createRoleSchema>;

export const editRoleSchema = z.object({
  name: z.string().min(1, { message: REQUIRED_FIELD }),
  description: z.string().min(1, { message: REQUIRED_FIELD }),
});

export type EditRoleFormValues = z.infer<typeof editRoleSchema>;
