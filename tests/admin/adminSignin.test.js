const request = require("supertest");
const app = require("../../src/index"); // Replace with the actual path to your app's entry point

describe("Admin Sign In API", () => {
  it("should return a valid JWT token when provided with correct credentials", async () => {
    const response = await request(app)
      .post("/api/admin/signin")
      .send({
        userName: "udemycloneadmin",
        password: "SomeRandomP@ssword1",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("auth", "Success");
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("userName", "udemycloneadmin");
  });

  it("should return an error for invalid credentials", async () => {
    const response = await request(app)
      .post("/api/admin/signin")
      .send({
        userName: "invalid_username",
        password: "invalid_password",
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid Credentials");
  });
});
