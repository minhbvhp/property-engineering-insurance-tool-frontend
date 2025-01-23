"use server";

import { auth } from "@/auth";
import { ICompanyBranch } from "@/models/company-branch/definition";
import { sendRequest } from "@/utils/api";

export async function getAllCompanyBranches() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompanyBranch[]>>({
      method: "GET",
      url: "/api/company-branches",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-company-branches"] },
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
