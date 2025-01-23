"use server";

import { auth } from "@/auth";
import { ICreateUserDto, IEditUserDto, IUser } from "@/models/user/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createUser(payload: ICreateUserDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IUser>>({
      method: "POST",
      url: "/api/users",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-users");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function editUser(id: string, payload: IEditUserDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IUser>>({
      method: "PATCH",
      url: `/api/users/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-users");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyUser(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<IUser>>({
      method: "DELETE",
      url: `/api/users/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-users");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
