export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

// Custom event to trigger logout from anywhere
export const triggerLogout = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:logout"));
  }
};

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onRefreshed = (token: string) => {
  refreshSubscribers.map((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

interface FetchOptions extends RequestInit {
  requireAuth?: boolean;
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { requireAuth = true, ...customConfig } = options;
  const url = `${API_BASE_URL}${endpoint}`;

  const getHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(customConfig.headers as Record<string, string> || {}),
    };

    if (requireAuth && typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        headers["Authorization"] = `Bearer ${accessToken}`;
      }
    }
    return headers;
  };

  const config: RequestInit = {
    ...customConfig,
    headers: getHeaders(),
  };

  try {
    const response = await fetch(url, config);

    // Handle 401 Unauthorized
    if (response.status === 401 && requireAuth && typeof window !== "undefined") {
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (!refreshToken) {
        triggerLogout();
        throw new Error("Unauthorized");
      }

      if (isRefreshing) {
        // Wait for refresh to complete, then retry
        return new Promise((resolve, reject) => {
          addRefreshSubscriber(async (newToken) => {
            try {
              const retryResponse = await fetch(url, {
                ...config,
                headers: {
                  ...config.headers,
                  "Authorization": `Bearer ${newToken}`,
                },
              });
              
              if (!retryResponse.ok) throw new Error("Retry failed");
              
              const contentType = retryResponse.headers.get("content-type");
              if (contentType && contentType.includes("application/json")) {
                resolve(await retryResponse.json());
              } else {
                resolve(null as unknown as T);
              }
            } catch (err: unknown) {
              reject(err);
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!refreshResponse.ok) {
          throw new Error("Refresh failed");
        }

        const data = await refreshResponse.json();
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("refreshToken", data.refresh_token);

        isRefreshing = false;
        onRefreshed(data.access_token);

        // Retry the original request
        const retryResponse = await fetch(url, {
          ...config,
          headers: {
            ...config.headers,
            "Authorization": `Bearer ${data.access_token}`,
          },
        });

        if (!retryResponse.ok) {
          throw await buildApiError(retryResponse);
        }

        const contentType = retryResponse.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return await retryResponse.json();
        }
        return null as unknown as T;
      } catch (refreshError) {
        isRefreshing = false;
        refreshSubscribers = [];
        triggerLogout();
        throw refreshError;
      }
    }

    if (!response.ok) {
      throw await buildApiError(response);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    
    return null as unknown as T;
  } catch (error) {
    throw error;
  }
}

async function buildApiError(response: Response) {
  let errorMessage = "An error occurred";
  let errors = null;
  
  try {
    const errorData = await response.json();
    if (errorData.detail) {
      if (typeof errorData.detail === "string") {
        errorMessage = errorData.detail;
      } else if (Array.isArray(errorData.detail)) {
        errorMessage = errorData.detail[0]?.msg || "Validation error";
        errors = errorData.detail;
      }
    } else if (errorData.message) {
      errorMessage = errorData.message;
    }
  } catch {
    errorMessage = response.statusText;
  }

  const error = new Error(errorMessage) as Error & { status?: number; errors?: unknown };
  error.status = response.status;
  error.errors = errors;
  return error;
}
