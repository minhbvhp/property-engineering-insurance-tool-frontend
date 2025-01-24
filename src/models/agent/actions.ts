"use server";

import { auth } from "@/auth";
import {
  ICreateAgentDto,
  IEditAgentDto,
  IAgent,
} from "@/models/agent/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createAgent(payload: ICreateAgentDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IAgent>>({
      method: "POST",
      url: "/api/agents",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-agents");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function editAgent(id: string, payload: IEditAgentDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IAgent>>({
      method: "PATCH",
      url: `/api/agents/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-agents");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyAgent(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IAgent>>({
      method: "DELETE",
      url: `/api/agents/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-agents");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function softDeleteAgent(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IAgent>>({
      method: "DELETE",
      url: `/api/agents/${id}/soft-delete`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-agents");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
