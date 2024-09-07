import { Inter } from 'next/font/google'
import "./globals.css"
import { UserResponseProvider } from '@/lib/contexts/UserResponseContext';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black`}>
        <UserResponseProvider>
          {children}
        </UserResponseProvider>
      </body>
    </html>
  );
}
