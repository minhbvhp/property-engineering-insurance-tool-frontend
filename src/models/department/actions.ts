"use server";

import { auth } from "@/auth";
import {
  ICreateDepartmentDto,
  IEditDepartmentDto,
  IDepartment,
} from "@/models/department/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createDepartment(payload: ICreateDepartmentDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IDepartment>>({
      method: "POST",
      url: "/api/departments",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-departments");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function editDepartment(id: string, payload: IEditDepartmentDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IDepartment>>({
      method: "PATCH",
      url: `/api/departments/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-departments");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyDepartment(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IDepartment>>({
      method: "DELETE",
      url: `/api/departments/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-departments");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function softDeleteDepartment(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IDepartment>>({
      method: "DELETE",
      url: `/api/departments/${id}/soft-delete`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-departments");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
