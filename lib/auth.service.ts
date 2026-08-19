import { fetchApi } from "./api";
import { User, Token, MessageResponse } from "@/types";

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface ResetPasswordData {
  token: string;
  new_password: string;
}

export const authService = {
  async register(data: RegisterData): Promise<User> {
    return fetchApi<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      requireAuth: false,
    });
  },

  async login(data: LoginData): Promise<Token> {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", data.username); // Backend uses username for email
    formData.append("password", data.password);

    return fetchApi<Token>("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
      requireAuth: false,
    });
  },

  async getCurrentUser(): Promise<User> {
    return fetchApi<User>("/auth/me", {
      method: "GET",
    });
  },

  async verifyEmail(token: string): Promise<MessageResponse> {
    return fetchApi<MessageResponse>("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
      requireAuth: false,
    });
  },

  async resendVerification(email: string): Promise<MessageResponse> {
    return fetchApi<MessageResponse>("/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
      requireAuth: false,
    });
  },

  async logout(refreshToken: string): Promise<MessageResponse> {
    return fetchApi<MessageResponse>("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
  },

  async logoutAll(): Promise<MessageResponse> {
    return fetchApi<MessageResponse>("/auth/logout-all", {
      method: "POST",
    });
  },

  async forgotPassword(email: string): Promise<MessageResponse> {
    return fetchApi<MessageResponse>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
      requireAuth: false,
    });
  },

  async resetPassword(data: ResetPasswordData): Promise<MessageResponse> {
    return fetchApi<MessageResponse>("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token: data.token, new_password: data.new_password }),
      requireAuth: false,
    });
  },
};
