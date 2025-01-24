"use server";

import { auth } from "@/auth";
import { IEmployee } from "@/models/employee/definition";
import { sendRequest } from "@/utils/api";

export async function getAllEmployees() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IEmployee[]>>({
      method: "GET",
      url: "/api/employees",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-employees"] },
      },
    });

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
      data: null,
    };
  }
}
