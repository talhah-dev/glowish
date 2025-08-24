import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Glowist",
};

export default function RootLayout({ children }) {
  

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <ReduxProviders> */}
          <Providers>
            <ProtectedRoute>
              <ToastContainer />
              {children}
            </ProtectedRoute>
          </Providers>
        {/* </ReduxProviders> */}
      </body>
    </html>
  );
}
