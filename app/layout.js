import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Glowist",
};

export default function RootLayout({ children }) {
  const isLoggedIn = true;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ProtectedRoute>
            <Header isLoggedIn={isLoggedIn} />
            {children}
          </ProtectedRoute>
        </Providers>
      </body>
    </html>
  );
}
