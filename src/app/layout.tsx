import { Theme } from "@radix-ui/themes";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
