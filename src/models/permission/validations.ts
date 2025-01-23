import { ACTION_INVALID, REQUIRED_FIELD } from "@/lib/messages";
import { ACTIONS } from "@/models/permission/definition";
import { z } from "zod";

const permissionConditionSchema = z.object({
  key: z.string().min(1, { message: REQUIRED_FIELD }),
  value: z.string().min(1, { message: REQUIRED_FIELD }),
});

export const createPermissionSchema = z.object({
  action: z.nativeEnum(ACTIONS, { message: ACTION_INVALID }),
  subjectId: z.string().min(1, { message: REQUIRED_FIELD }),
  conditions: z.array(permissionConditionSchema),
  description: z.string().min(1, { message: REQUIRED_FIELD }),
});

export type CreatePermissionFormValues = z.infer<typeof createPermissionSchema>;

export const editPermissionSchema = z.object({
  action: z.nativeEnum(ACTIONS, { message: ACTION_INVALID }),
  subjectId: z.string().min(1, { message: REQUIRED_FIELD }),
  conditions: z.array(permissionConditionSchema),
  description: z.string().min(1, { message: REQUIRED_FIELD }),
});

export type EditPermissionFormValues = z.infer<typeof editPermissionSchema>;
