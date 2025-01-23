"use server";

import { ICustomerData } from "@/models/customer/definition";
import { auth } from "@/auth";
import { sendRequest } from "@/utils/api";

export async function getAllCustomers(current: number, pageSize: number) {
  try {
    const session = await auth();

    const res = await sendRequest<IBackendRes<ICustomerData>>({
      method: "GET",
      url: "/api/customers",
      queryParams: {
        current,
        pageSize,
      },
      headers: {
        Authorization: `Bearer ${session?.user?.access_token}`,
      },
      nextOption: {
        next: { tags: ["list-customers"] },
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
