import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./User.interface";
import config from "../../config";
import bcrypt from 'bcrypt';
const UserSchema =new Schema<TUser,UserModel>({
    id: { type: String, required: true, unique: true },

password:{
    type:String,
    required:true,
    select:0
},
needsPassworChange:{
    type:Boolean,
    default:true
},
passwordChangedAt:{
    type:Date
},
role:{
    type:String,
    enum:['Admin','student','faculty']
},
status:{
    type:String,
    enum:['in-progress','blocked']
},
isDeleted:{
    type:Boolean,
    default:false

},
}, {
    timestamps: true
})
UserSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bycrypt_pass),
    );
    next(); 
  });
  
  // set '' after saving password
  UserSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
  });
  UserSchema.statics.isUserExistByCustomId=async function(id:string){
   return await User.findOne({id}).select('+password')
  }
  UserSchema.statics.isPasswordmatched=async function(PlainPassword,HashPassword){
   return await bcrypt.compare(PlainPassword,HashPassword)
  }
UserSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    PasswordUpdateTime: Date,
    JwtCreatedPasswordTime: number,
  ) {
    const passwordChangedTime =
      new Date(PasswordUpdateTime).getTime() / 1000;
    return passwordChangedTime > JwtCreatedPasswordTime;
  };
  
  export const User = model<TUser,UserModel>('User', UserSchema);