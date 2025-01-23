"use server";

import { auth } from "@/auth";
import { ISubject } from "@/models/subject/definition";
import { sendRequest } from "@/utils/api";

export async function getAllSubjects() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ISubject[]>>({
      method: "GET",
      url: "/api/subjects",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-subjects"] },
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
