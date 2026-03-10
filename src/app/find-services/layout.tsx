import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Services — Islamic Council of Victoria",
  description:
    "Find the right support service from ICV. Answer a few questions to get directed to the help you need.",
};

export default function FindServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
