import { ServerError } from "../types/api";

export function isServerError(error: unknown): error is ServerError {
  return typeof (error as ServerError).data?.message === "string";
}
