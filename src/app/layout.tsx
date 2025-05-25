import { Theme } from "@radix-ui/themes";
import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Theme>{children}</Theme>
        </Providers>
      </body>
    </html>
  );
}
