import { Inter } from "next/font/google";
import "./globals.css";
import { MyProvider } from "@/context/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{margin: 0, padding: 0}}>
      <MyProvider>
        <body className={inter.className} style={{margin: 0, padding: 0}}>{children}</body>
      </MyProvider>
    </html>
  );
}
