"use server";

import { auth } from "@/auth";
import { IAgent } from "@/models/agent/definition";
import { sendRequest } from "@/utils/api";

export async function getAllAgents() {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IAgent[]>>({
      method: "GET",
      url: "/api/agents",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-agents"] },
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
