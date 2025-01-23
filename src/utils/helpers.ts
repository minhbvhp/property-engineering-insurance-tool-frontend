import { MenuItem } from "@/lib/definitions";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getVietNameDate(utcDate: string): string {
  const vietnamDate = dayjs.utc(utcDate).tz("Asia/Ho_Chi_Minh");

  return vietnamDate.format("DD-MM-YYYY");
}

export function getVietNameTime(utcDate: string): string {
  const vietnamTime = dayjs.utc(utcDate).tz("Asia/Ho_Chi_Minh");

  return vietnamTime.format("HH:mm:ss");
}

export function updateIsActive(
  menuItems: MenuItem[],
  conditionUrl: string
): MenuItem[] {
  return menuItems.map((item) => {
    const parentIsActive = conditionUrl?.includes(item.url);

    const updatedItems = item.items?.map((subItem) => {
      const _pathName =
        subItem.url.indexOf("?") > 0
          ? subItem.url.substring(0, subItem.url.indexOf("?"))
          : subItem.url;
      if (_pathName === conditionUrl) {
        return { ...subItem, isActive: true };
      }
      return subItem;
    });

    return {
      ...item,
      isActive: parentIsActive,
      items: updatedItems || item.items,
    };
  });
}

export function getSecondsUntilExpiration(token: string): number | null {
  try {
    const payload = jwtDecode(token);

    if (!payload.exp) {
      throw new Error("Token không có thời hạn !!!");
    }

    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const secondsUntilExpiration = payload.exp - currentTimeInSeconds;

    return secondsUntilExpiration > 0 ? secondsUntilExpiration : null;
  } catch (error: any) {
    console.error("Lỗi parsing token:", error.message);
    return null;
  }
}
