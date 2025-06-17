import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// user type
export interface UserType extends Document {
  nickname: string;
  email: string;
  password: string;
  fav: string[];
}

// 스키마 정의
const UserSchema: Schema = new Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fav: { type: [String], default: [] },
});
UserSchema.pre<UserType>("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

// 데이터베이스 모델생성.
const User = mongoose.model<UserType>("User", UserSchema);
export default User;
