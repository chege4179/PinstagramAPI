import request from "supertest";
import app from "../app";


describe("POST /user/single/:id",() => {
     describe("Get A user by Id",() => {
          test("should respond with a 200 status code and a response", async () => {
               const response = await request(app).get("/user/single/fhhffjf")

               expect(response.body).toBeDefined()
          })
     })
})
