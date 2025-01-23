"use server";

import { auth } from "@/auth";
import { ICompanyArea } from "@/models/company-area/definition";
import { sendRequest } from "@/utils/api";

export async function getAllCompanyAreas() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompanyArea[]>>({
      method: "GET",
      url: "/api/company-areas",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-company-areas"] },
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
