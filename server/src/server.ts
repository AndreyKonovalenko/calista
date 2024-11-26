import express, { Request, Response } from 'express';
import path from 'path'

const app = express();
const port = 3000;


// // Serve frontend

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,"../../", "client", "build")))
  app.get("*", (req: Request, res: Response) =>
    res.sendFile(
      path.resolve(__dirname, "../../", "client", "build", "index.html")
    )
  );
  console.log(path.resolve(__dirname, "../../", "client", "build", "index.html"))
} else {
  app.get("/", (req: Request, res: Response) => {
    res.send("Please set to production")
  });
}


app.get('/', (req, res) => {
  res.send('Hello New World!');
});


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
