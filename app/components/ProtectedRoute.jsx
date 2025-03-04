"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoginPage from "../login/page";

const isAuthenticated = true;

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/");
    }
  }, [router]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
