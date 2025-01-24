"use server";

import { auth } from "@/auth";
import {
  ICreateEmployeeDto,
  IEditEmployeeDto,
  IEmployee,
} from "@/models/employee/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createEmployee(payload: ICreateEmployeeDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IEmployee>>({
      method: "POST",
      url: "/api/employees",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-employees");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function editEmployee(id: string, payload: IEditEmployeeDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IEmployee>>({
      method: "PATCH",
      url: `/api/employees/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-employees");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyEmployee(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IEmployee>>({
      method: "DELETE",
      url: `/api/employees/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-employees");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function softDeleteEmployee(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IEmployee>>({
      method: "DELETE",
      url: `/api/employees/${id}/soft-delete`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-employees");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
