import { model, Schema } from "mongoose";
import { TUser } from "./User.interface";
import config from "../../config";
import bcrypt from 'bcrypt';
const UserSchema =new Schema<TUser>({
id:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
needsPassworChange:{
    type:Boolean,
    default:true
},
role:{
    type:String,
    enum:['admin','student','faculty']
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
  
  export const User = model<TUser>('User', UserSchema);