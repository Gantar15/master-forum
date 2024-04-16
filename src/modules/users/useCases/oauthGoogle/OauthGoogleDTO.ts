import { JWTToken, RefreshToken } from "../../domain/jwt";

export interface OauthGoogleDTO {
  code: string;
}

export interface OauthGoogleDTOResponse {
  accessToken: JWTToken;
  refreshToken: RefreshToken;
  username: string;
}
