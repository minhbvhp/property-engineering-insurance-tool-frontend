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

    case "Sales Manager":
      return (
        <Badge
          className="bg-teal-500 text-[#f5f5f5] font-normal border-0"
          variant="outline"
        >
          Quản lý kinh doanh
        </Badge>
      );

    case "Sales":
      return (
        <Badge
          className="bg-blue-500 text-[#f5f5f5] font-normal border-0"
          variant="outline"
        >
          Nhân viên kinh doanh
        </Badge>
      );

    case "Accountant":
      return (
        <Badge
          className="bg-green-500 text-[#f5f5f5] font-normal border-0"
          variant="outline"
        >
          Kế toán
        </Badge>
      );

    case "Document":
      return (
        <Badge
          className="bg-yellow-500 text-[#f5f5f5] font-normal border-0"
          variant="outline"
        >
          Chứng từ
        </Badge>
      );

    case "Operation":
      return (
        <Badge
          className="bg-violet-500 text-[#f5f5f5] font-normal border-0"
          variant="outline"
        >
          Hiện trường
        </Badge>
      );

    //#endregion

    default:
      return <div>N/A Component</div>;
  }
};

export default DynamicUserDescriptionComponent;
