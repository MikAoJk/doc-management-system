import 'bootstrap/dist/css/bootstrap.css';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DocManger",
  description: "Classic doc managment system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
