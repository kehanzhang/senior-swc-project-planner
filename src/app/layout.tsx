import { Inter } from "next/font/google";
import "./globals.css";
import { UserResponseProvider } from "@/lib/contexts/UserResponseContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserResponseProvider>{children}</UserResponseProvider>
      </body>
    </html>
  );
}
