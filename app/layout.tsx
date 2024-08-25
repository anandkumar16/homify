import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";


const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AirBnb",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />       
        <Navbar currentUser = {currentUser} />
        <div className="pb-20 pt-7">
        {children}
        </div>
        
      </body>
    </html>
  );
}
