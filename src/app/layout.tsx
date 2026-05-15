import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Senior Developer Portfolio",
  description: "A premium, editorial minimalist portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div 
          className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" 
          aria-hidden="true"
        />
        {children}
      </body>
    </html>
  );
}
