import type { Response } from "express";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
  error: any | null;
};

export const sendResponse = <T>(
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: T | null = null,
  error: any | null = null,
) => {
  const response: ApiResponse<T> = {
    success,
    message,
    data,
    error,
  };

  return res.status(statusCode).json(response);
};
