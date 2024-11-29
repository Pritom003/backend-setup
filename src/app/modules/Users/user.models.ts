import { model, Schema } from "mongoose";
import { TUser } from "./User.interface";

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
const User =model<TUser>('User',UserSchema)
export default User