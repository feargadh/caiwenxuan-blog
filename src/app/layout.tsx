import "./globals.css";

import ThemeContent from "@/components/ThemeContent";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className=" flex flex-col items-center  bg-[--bg] text-[--text]">
        <ThemeContent children={children} />
      </body>
    </html>
  );
}
