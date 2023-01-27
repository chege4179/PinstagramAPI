import request from "supertest";
import app from "../app";

describe("POST /user/signup",() => {
     describe("Given a valid request body",() => {
          test("Should respond with a 200 status code and valid Response", async () => {
               const response = await request(app).post("/user/signup").send({
                    username:"testtest",
                    fullName:"testtest",
                    email: "peterkagure@gmail.com",
                    password: "totalman"
               })
               expect(response.body).toBeDefined()

          })
          test("should respond with a success attribute of false", async () => {
               const response = await request(app).post("/user/signup").send({
                    username:"test",
                    fullName:"test",
                    email: "peterkagure@gmail.com",
                    password: "totalman"
               })

               expect(response.body.success).toBe(false)
          })
     })
     describe("Not Given a valid request body",() => {
          test("should respond with a success attribute of false since body is not defined", async () => {
               const response = await request(app).post("/user/signup").send({

               })

               expect(response.body.success).toBe(false)
          })
     })
})
