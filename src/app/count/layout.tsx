import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Count Page",
  description: "Count",
};

export default function CountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
