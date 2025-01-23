"use client";

import { Badge } from "@/components/ui/badge";

type Props = {
  condition: string;
};

const DynamicUserDescriptionComponent: React.FC<Props> = ({ condition }) => {
  switch (condition) {
    //#region  Role
    case "Admin":
      return (
        <Badge
          className="bg-orange-500 text-[#f5f5f5] font-normal border-0"
          variant="outline"
        >
          Quản trị viên
        </Badge>
      );

    case "Underwriter":
      return (
        <Badge
          className="bg-green-600 text-[#f5f5f5] font-normal border-0"
          variant="outline"
        >
          Chuyên viên
        </Badge>
      );
    //#endregion

    default:
      return <div>N/A Component</div>;
  }
};

export default DynamicUserDescriptionComponent;
