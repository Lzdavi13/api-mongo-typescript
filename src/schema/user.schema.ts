import { Schema } from "mongoose";
import { User } from "../model/users.model";

export const UserSchema: Schema<User> = new Schema<User>({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
