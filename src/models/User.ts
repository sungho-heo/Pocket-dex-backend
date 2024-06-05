import mongoose, { Document, Schema } from "mongoose";

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

// 데이터베이스 모델생성.
const User = mongoose.model<UserType>("User", UserSchema);
export default User;
