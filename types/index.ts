/** Standard API envelope */
export type ApiResponse<T> = {
  data: T;
  message?: string;
};

/** Paginated API response */
export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };
};

/** API error shape */
export type ApiError = {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
};
