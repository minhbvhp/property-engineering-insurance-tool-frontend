"use server";

import { auth } from "@/auth";
import { IGender } from "@/models/gender/definition";

import { sendRequest } from "@/utils/api";

export async function getAllGenders() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IGender>>({
      method: "GET",
      url: "/api/genders",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-genders"] },
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
