import app from "./app"


const port: number = Number(process.env.PORT) || 9000;
app.listen(port, () => {
     console.log(`PInstagram API running http://localhost:${port}/`);
});
