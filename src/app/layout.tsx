import { ReactQueryClientProvider } from "@/components/ReactQueryClientProvider";
import { cn } from "@/lib/utils";
import { Anek_Malayalam } from "next/font/google";

import "../styles/globals.css";

const anekMalayalam = Anek_Malayalam({
  subsets: ["latin"],
  variable: "--font-anek-malayalam",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body
          className={cn(
            "font-sans bg-background text-white",
            anekMalayalam.variable
          )}
        >
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
