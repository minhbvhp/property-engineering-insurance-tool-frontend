import { Inter, Passions_Conflict, Pacifico } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: "400",
  display: "swap",
});

export const titleFormFont = Passions_Conflict({
  subsets: ["vietnamese"],
  weight: "400",
  preload: true,
  display: "swap",
});

export const titleDashboardFont = Pacifico({
  subsets: ["vietnamese"],
  weight: "400",
  preload: true,
  display: "swap",
});
