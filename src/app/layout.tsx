"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootDialog } from "@/components/root/RootDialog";
import { RootSheet } from "@/components/root/RootSheet";
import { RootDrawer } from "@/components/root/RootDrawer";
import { ThemeProvider } from "@/components/common/ThemeProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <main>{children}</main>

              <RootDialog />
              <RootSheet />
              <RootDrawer />
              <Toaster />
            </ThemeProvider>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
