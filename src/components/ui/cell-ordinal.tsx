"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

interface CellOrdinalProps {
  rowIndex: number;
}

const CellOrdinal: React.FC<CellOrdinalProps> = ({ rowIndex }) => {
  const searchParams = useSearchParams();

  if (searchParams.has("current") && searchParams.has("pageSize")) {
    const current = searchParams.get("current");
    const pageSize = searchParams.get("pageSize");

    if (current && pageSize) {
      return <>{+pageSize * (+current - 1) + rowIndex + 1}</>;
    }
  }

  return <>{rowIndex + 1}</>;
};

export default CellOrdinal;
