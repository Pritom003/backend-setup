
import Jwt from 'jsonwebtoken';
import { TUserRole } from '../Users/User.interface';
export const creatreTokep=(
JwtPayload:{UserID:string ,role:TUserRole},secret:string,expiredIn:string

)=>{
   return Jwt.sign(
        JwtPayload, secret,
         { expiresIn: expiredIn });
}