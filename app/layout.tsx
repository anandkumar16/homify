import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/navbar/Navbar";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";
import ToasterProvider from "./providers/ToasterProvider";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";



const inter = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Homify",
  description: "next application",
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
        <ClientOnly> 
        <ToasterProvider />
        <SearchModal />
        <RentModal /> 
        <LoginModal />
        <RegisterModal />          
        <Navbar currentUser = {currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-7">
        {children}
        </div>
        
      </body>
    </html>
  );
}
