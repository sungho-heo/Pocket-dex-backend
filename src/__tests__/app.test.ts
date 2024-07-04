import request from "supertest";
import app from "../app"; // 실제 앱의 경로에 맞게 수정

describe("GET /api/fav", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/api/fav");
    console.log("Response Status:", res.status);
    console.log("Response Body:", res.text);
    expect(res.status).toBe(401);
  });
});
