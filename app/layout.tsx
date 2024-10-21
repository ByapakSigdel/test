import './globals.css';
import { Inter } from 'next/font/google';
import ProtectedRoute from '@/components/ProtectedRoute'; // Make sure to adjust the path if needed

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My App',
  description: 'My App Description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProtectedRoute>
          {children} {/* Renders the child components within the protected route */}
        </ProtectedRoute>
      </body>
    </html>
  );
}
