import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rainbow",
  description: "Count",
};

export default function RainbowLayout({
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
