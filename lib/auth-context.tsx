"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User } from "@/types";
import { authService, LoginData, RegisterData } from "./auth.service";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleLocalLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    if (!pathname.startsWith("/login") && !pathname.startsWith("/register") && !pathname.startsWith("/forgot-password") && !pathname.startsWith("/reset-password") && !pathname.startsWith("/verify-email")) {
      router.push("/login");
    }
  }, [pathname, router]);

  useEffect(() => {
    // Listen for custom logout event triggered by api interceptor
    const handleLogoutEvent = () => {
      handleLocalLogout();
    };
    
    window.addEventListener("auth:logout", handleLogoutEvent);
    return () => window.removeEventListener("auth:logout", handleLogoutEvent);
  }, [handleLocalLogout]);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch {
          // fetchApi handles the 401 refresh automatically.
          // If it throws here, refresh also failed.
          handleLocalLogout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [handleLocalLogout]);

  const login = async (data: LoginData) => {
    try {
      const tokens = await authService.login(data);
      localStorage.setItem("accessToken", tokens.access_token);
      localStorage.setItem("refreshToken", tokens.refresh_token);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await authService.register(data);
      router.push("/verify-email");
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      handleLocalLogout();
    }
  };

  const logoutAll = async () => {
    try {
      await authService.logoutAll();
    } catch (error) {
      console.error("Logout all API failed", error);
    } finally {
      handleLocalLogout();
    }
  };

  const refreshSession = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch {
      handleLocalLogout();
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    logoutAll,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
