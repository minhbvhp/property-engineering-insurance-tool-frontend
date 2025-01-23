"use client";

import { signOut } from "next-auth/react";

export const handleSignOut = async () => {
  localStorage.removeItem("permissions");

  await signOut();
};
