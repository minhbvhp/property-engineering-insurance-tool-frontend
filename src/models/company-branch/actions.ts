"use server";

import { auth } from "@/auth";
import {
  ICreateCompanyBranchDto,
  IEditCompanyBranchDto,
  ICompanyBranch,
} from "@/models/company-branch/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createCompanyBranch(payload: ICreateCompanyBranchDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompanyBranch>>({
      method: "POST",
      url: "/api/company-branches",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-company-branches");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function editCompanyBranch(
  id: string,
  payload: IEditCompanyBranchDto
) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompanyBranch>>({
      method: "PATCH",
      url: `/api/company-branches/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-company-branches");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyCompanyBranch(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICompanyBranch>>({
      method: "DELETE",
      url: `/api/company-branches/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-company-branches");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
