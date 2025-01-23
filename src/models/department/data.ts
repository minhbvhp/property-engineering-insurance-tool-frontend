"use server";

import { auth } from "@/auth";
import { IDepartment } from "@/models/department/definition";
import { sendRequest } from "@/utils/api";

export async function getAllDepartments() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IDepartment[]>>({
      method: "GET",
      url: "/api/departments",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-departments"] },
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
