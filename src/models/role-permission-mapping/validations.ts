import { REQUIRED_FIELD } from "@/lib/messages";
import { z } from "zod";

const permissionIdsSchema = z.object({
  id: z.string().min(1, { message: REQUIRED_FIELD }),
});

export const createRolePermissionMappingsSchema = z.object({
  roleId: z.string().min(1, { message: REQUIRED_FIELD }),
  permissionIds: z
    .array(permissionIdsSchema)
    .nonempty({ message: REQUIRED_FIELD }),
});

export type CreateRolePermissionMappingsFormValues = z.infer<
  typeof createRolePermissionMappingsSchema
>;
