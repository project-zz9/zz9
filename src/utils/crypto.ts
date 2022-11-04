import crypto from "crypto-js";

export const hashing = (input: string): string => crypto.SHA1(input).toString();
