import {Schema, arrayOf} from "normalizr";

const userSchema = new Schema('user');
const arrayOfUsersSchema = arrayOf(userSchema)

export { userSchema, arrayOfUsersSchema }