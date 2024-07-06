import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import User from "../models/User";

beforeAll(async () => {
  // 데이터베이스 연결
  await mongoose.connect(process.env.MONGO_URI!);
});

afterAll(async () => {
  // 데이터베이스 연결해제
  await mongoose.connection.close();
});

beforeEach(async () => {
  // 테스트 전 데이터 초기화
  await User.deleteMany({});
});

describe("POST /api/auth/signup", () => {
  it(" should create a new user and return 201 with a token", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      nickname: "test",
      email: "test@test.com",
      password: "123",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  it("should not create a new user if email already exists", async () => {
    await request(app).post("/api/auth/signup").send({
      nickname: "test",
      email: "test@test.com",
      password: "123",
    });

    const res = await request(app).post("/api/auth/signup").send({
      nickname: "test2",
      email: "test@test.com",
      password: "123",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "User already exists");
  });
});

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await request(app).post("/api/auth/signup").send({
      nickname: "test1",
      email: "test@test.com",
      password: "123",
    });
  });

  it("should log in an existing user and return 200 with a token", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not log in a non-existing user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test123@test.com",
      password: "123",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid User");
  });

  it("should not log in with incorrect password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "1234",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid password");
  });
});
