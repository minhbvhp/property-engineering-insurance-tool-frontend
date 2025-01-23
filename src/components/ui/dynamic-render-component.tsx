"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";

type Props = {
  condition: string | boolean;
};

const DynamicRenderComponent: React.FC<Props> = ({ condition }) => {
  switch (condition) {
    //#region Company

    //#endregion

    //#region Status
    case true:
      return (
        <Badge
          variant="outline"
          className="bg-green-700 text-[#f5f5f5] font-normal border-0"
        >
          Đang hoạt động
        </Badge>
      );

    case false:
      return (
        <Badge
          variant="outline"
          className="bg-gray-600 text-[#f5f5f5] font-normal border-0"
        >
          Dừng hoạt động
        </Badge>
      );
    //#endregion
    default:
      return <div>N/A Component</div>;
  }
};

export default DynamicRenderComponent;
