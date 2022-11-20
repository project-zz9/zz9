import crypto from "crypto-js";
import { SEPARATOR } from "~/app/constant";

export const hashing = (input: string): string => crypto.SHA1(input).toString();
export const getKey = (...rest: (string | number | undefined)[]): string =>
  rest.join(SEPARATOR);
