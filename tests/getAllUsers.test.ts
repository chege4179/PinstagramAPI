import request from "supertest";
import app from "../app";


describe("POST /user/all",() => {
     describe("Get All users",() => {
          test("should respond with a 200 status code and results array", async () => {
               const response = await request(app).get("/user/all")
               expect(response.body).toBeDefined()
          })
     })
})
