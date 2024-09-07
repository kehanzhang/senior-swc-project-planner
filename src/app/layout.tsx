import { Inter } from "next/font/google";
import "./globals.css";
import { UserResponseProvider } from "@/lib/contexts/UserResponseContext";
import { QuestionnaireProvider } from "@/lib/contexts/QuestionnaireContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UserResponseProvider>
          <QuestionnaireProvider>{children}</QuestionnaireProvider>
        </UserResponseProvider>
      </body>
    </html>
  );
}
