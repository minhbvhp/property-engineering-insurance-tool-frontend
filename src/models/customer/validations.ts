import { REQUIRED_FIELD } from "@/lib/messages";
import { z } from "zod";

const customerContactSchema = z.object({
  name: z.string().min(1, { message: REQUIRED_FIELD }),
  phone: z.string().min(1, { message: REQUIRED_FIELD }),
  email: z.string().optional(),
});

export const createCustomerSchema = z.object({
  taxCode: z.string().min(1, { message: REQUIRED_FIELD }),
  shortName: z.string().min(1, { message: REQUIRED_FIELD }),
  fullName: z.string().min(1, { message: REQUIRED_FIELD }),
  address: z.string().min(1, { message: REQUIRED_FIELD }),
  contacts: z.array(customerContactSchema),
});

export type CreateCustomerFormValues = z.infer<typeof createCustomerSchema>;

export const editCustomerSchema = z.object({
  taxCode: z.string().min(1, { message: REQUIRED_FIELD }),
  shortName: z.string().min(1, { message: REQUIRED_FIELD }),
  fullName: z.string().min(1, { message: REQUIRED_FIELD }),
  address: z.string().min(1, { message: REQUIRED_FIELD }),
  contacts: z.array(customerContactSchema),
});

export type EditCustomerFormValues = z.infer<typeof editCustomerSchema>;
