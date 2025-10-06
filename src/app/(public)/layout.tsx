import { AuthProvider } from "../components/modules/auth/AuthContext";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <> <AuthProvider>
      <Navbar />
     
      <main className="min-h-dvh">{children}</main>
      
      <Footer />
      </AuthProvider>
    </>
  );
}