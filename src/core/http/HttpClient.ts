import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { TokenStorage } from '@/core/plugins/persistence/TokenStorage';
import { useLoadingStore } from '@/stores/loadingStore';


class HttpClient {
  private client: AxiosInstance;
  private retryCount = 0;
  private maxRetries = 3;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8000/api/v1',
      timeout: 15000,
    });

  }

  public setupInterceptors(getLoadingStore: ()=>any) {
    const loading = useLoadingStore();

    // Request Interceptor
    this.client.interceptors.request.use(config => {
      const token = TokenStorage.getToken();
      if (token) config.headers.Authorization = `Bearer ${token}`;
      loading.start();  // bật loading
      return config;
    });

    // Response Interceptor
    this.client.interceptors.response.use(
      response => {
        loading.finish();  // tắt loading
        return response;
      },
      async error => {
        loading.finish();

        const originalRequest = error.config;

        // Retry if fail
        if (!originalRequest._retry) {
          if (this.retryCount < this.maxRetries) {
            this.retryCount++;
            originalRequest._retry = true;
            return this.client(originalRequest);
          }
        }

        // Show global error (hoặc custom event emit cho toast)
        console.error('Request failed:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res: AxiosResponse<T> = await this.client.get(url, config);
    return res.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const res: AxiosResponse<T> = await this.client.post(url, data, config);
    return res.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const res: AxiosResponse<T> = await this.client.put(url, data, config);
    return res.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res: AxiosResponse<T> = await this.client.delete(url, config);
    return res.data;
  }
}

export const httpClient = new HttpClient();
