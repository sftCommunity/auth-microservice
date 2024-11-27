import { JwtPayload } from '.';

export interface VerifyTokenResponse {
  user: JwtPayload;
  token: string;
}
