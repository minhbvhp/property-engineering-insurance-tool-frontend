"use client";

import { getMyPermissions } from "@/models/auth/data";

export const storePermissions = async () => {
  try {
    const permissions = await getMyPermissions();

    localStorage.setItem("permissions", JSON.stringify(permissions.data));
  } catch (error) {
    console.error("Error storing permissions:", error);
  }
};
