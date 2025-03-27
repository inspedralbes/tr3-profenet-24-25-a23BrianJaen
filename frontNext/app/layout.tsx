import "./normalize.css";
import "./globals.css";

import Sidebar from '@/src/components/common/Layout/Sidebar';
import Header from "@/src/components/common/Layout/Header";
import { ThemeProvider } from '@/src/components/providers/ThemeProvider';
import { Metadata } from 'next'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca" suppressHydrationWarning>
      <body className="min-h-screen w-full flex bg-background font-sans" suppressHydrationWarning>
        <ThemeProvider>
          <Sidebar />
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <Header />
            {/* Page Content */}
            <main className="flex-1 px-6 py-4 bg-background">
              {children}
            </main>
            <footer>
              <p className="text-center text-primary text-sm mb-3 border-t border-muted">
                © 2025 ProfeNet. Tots els drets reservats.
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: 'ProfeNet',
  description: 'ProfeNet - Xarxa de professors',
  icons: {
    icon: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png' },
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}