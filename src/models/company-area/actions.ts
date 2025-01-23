"use server";

import { auth } from "@/auth";
import {
  ICreateCompanyAreaDto,
  IEditCompanyAreaDto,
  ICompanyArea,
} from "@/models/company-area/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createCompanyArea(payload: ICreateCompanyAreaDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompanyArea>>({
      method: "POST",
      url: "/api/company-areas",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-company-areas");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function editCompanyArea(
  id: string,
  payload: IEditCompanyAreaDto
) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompanyArea>>({
      method: "PATCH",
      url: `/api/company-areas/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-company-areas");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyCompanyArea(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompanyArea>>({
      method: "DELETE",
      url: `/api/company-areas/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-company-areas");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
