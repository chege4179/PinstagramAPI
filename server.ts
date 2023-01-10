// Import the express in typescript file
import express,{ Request,Response } from 'express';

// Initialize the express engine
const app: express.Application = express();

// Take a port 3000 for running server.
const port: number = 3001;

type MyResponse = {
     msg:string
}
// Handling '/' Request
app.get('/', (req:Request, res:Response<MyResponse>) => {
     return res.json({
          msg:"Pers"
     });
});

// Server setup
app.listen(port, () => {
     console.log(`TypeScript with Express http://localhost:${port}/`);
});
