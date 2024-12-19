import { Model } from "mongoose";
import { USER_ROLE } from "./User.conts";

export interface TUser{
    id:string;
    password:string;
    needsPassworChange:boolean;
    passwordChangedAt?:Date
    role:'Admin'|'student'|'faculty';
    status:'in-progress'|'blocked';
    isDeleted:boolean
}
export interface UserModel extends Model<TUser> {
isUserExistByCustomId(id:string):Promise<TUser>
isPasswordmatched(PlainPassword: any,HashPassword: any):Promise<boolean>
isJWTIssuedBeforePasswordChanged(PasswordUpdateTime: Date ,JwtCreatedPasswordTime: number):boolean
  }
  export type TUserRole = keyof typeof USER_ROLE;