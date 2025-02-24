export interface User {
    id: number;
    username: string;
}
  
export interface JwtPayload {
    id: number;
    iat: number;
    exp: number; 
}
  
export interface AuthResponse {
    token: string; 
}
  
export interface AuthRequest {
    username: string;
    password: string;
}
  