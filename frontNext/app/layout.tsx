import "./normalize.css";
import "./globals.css";

import Sidebar from '@/src/components/common/Layout/Sidebar';
import Header from "@/src/components/common/Layout/Header";
import { ThemeProvider } from '@/src/components/providers/ThemeProvider';

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
            <main className="flex-1 p-6 bg-background">
              {children}
            </main>
            <footer>
              <p className="text-center text-primary text-sm mb-3 border-t border-muted">
                © 2025 ProfeNet. All rights reserved.
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}