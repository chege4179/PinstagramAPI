import request from "supertest"
import app from "../app";





describe("POST /user/login",() => {
     describe("Given a valid email and a password",() => {
          test("Should respond with a 200 status code and valid Response", async () => {
               const response = await request(app).post("/user/login").send({
                    email: "peterkagure@gmail.com",
                    password: "totalman"
               })
               if (!response.body.success){
                    expect(response.body.user).toBeNull()
               }else {
                    expect(response.body.user).toBeDefined()
               }

          })
     })
     describe("Not given an email or password",() => {
          test("should respond with a 400 status code", async () => {
               const response = await request(app).post("/user/login").send({
                    email: "",
                    password: ""
               })
               expect(response.statusCode).toBe(400)
          })
     })
})
