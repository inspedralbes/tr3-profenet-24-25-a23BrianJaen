import "./normalize.css";
import "./globals.css";

import Sidebar from '@/src/components/Sidebar';
import Header from "@/src/components/Header";
import { ThemeProvider } from 'next-themes';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ca">
      <body className="min-h-screen w-full flex bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Sidebar />
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <Header />
            {/* Page Content */}
            <main className="flex-1 p-6 bg-background">
              {children}
            </main>
            <footer>
              <p
                className="text-center text-primary text-sm mb-3 border-t border-muted"
              >
                © 2024 ProfeNet. All rights reserved.
              </p>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
