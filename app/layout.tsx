import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ppNeueMontreal = localFont({
  src: [
    {
      path: "./PP Neue Montreal Thin-a4f5.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./PP Neue Montreal Book-522b.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./PP Neue Montreal Medium-961d.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-pp-neue-montreal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "North Project",
  description: "Brutalist, editorial, racing team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ppNeueMontreal.variable}>
      <body>{children}</body>
    </html>
  );
}

