import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// user type
interface UserType {
  nickname: string;
  email: string;
  password: string;
}

// 스키마 정의
const UserSchema = new mongoose.Schema<UserType>({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 패스워드 해쉬코드로 변환해서 저장.
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 데이터베이스 모델생성.
const User = mongoose.model<UserType>("User", UserSchema);
export default User;
