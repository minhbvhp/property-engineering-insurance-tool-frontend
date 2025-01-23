"use server";

import { auth } from "@/auth";
import {
  ICreateCustomerDto,
  ICustomer,
  IEditCustomerDto,
} from "@/models/customer/definition";
import { sendRequest } from "@/utils/api";
import { revalidateTag } from "next/cache";

export async function createCustomer(payload: ICreateCustomerDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICustomer>>({
      method: "POST",
      url: "/api/customers",
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-customers");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function editCustomer(id: string, payload: IEditCustomerDto) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICustomer>>({
      method: "PATCH",
      url: `/api/customers/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      body: { ...payload },
    });

    if (!res.error) {
      revalidateTag("list-customers");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}

export async function deletePermanentlyCustomer(id: string) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICustomer>>({
      method: "DELETE",
      url: `/api/customers/${id}`,
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
    });

    if (!res.error) {
      revalidateTag("list-customers");
    }

    return res;
  } catch (error) {
    return {
      error: error,
      message: "Something went wrong",
    };
  }
}
