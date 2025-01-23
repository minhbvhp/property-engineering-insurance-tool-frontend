"use server";

import { auth } from "@/auth";
import { ICompany } from "@/models/company/definition";
import { sendRequest } from "@/utils/api";

export async function getAllCompanies() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompany>>({
      method: "GET",
      url: "/api/companies",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-companies"] },
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
