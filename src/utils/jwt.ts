import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  uuid: string;
  role: string;
  exp: number;
}

export const getUserUuid = (token: string) => {
  const decodeToken = jwtDecode<TokenPayload>(token);
  return decodeToken.uuid;
};
