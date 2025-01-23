"use server";

import { auth } from "@/auth";
import {
  ICreateCompanyDto,
  IEditCompanyDto,
  ICompany,
} from "@/models/company/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createCompany(payload: ICreateCompanyDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompany>>({
      method: "POST",
      url: "/api/companies",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-companies");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function editCompany(id: string, payload: IEditCompanyDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompany>>({
      method: "PATCH",
      url: `/api/companies/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-companies");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyCompany(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompany>>({
      method: "DELETE",
      url: `/api/companies/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-companies");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
