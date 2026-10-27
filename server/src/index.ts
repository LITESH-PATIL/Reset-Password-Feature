import express from "express";
import "dotenv/config";
import router from "./routes/routes";

const PORT = process.env.PORT ?? 3000;
const app = express();


app.use("/api/auth", router);
app.use(express.json());

try {
    app.listen(PORT, () => {
        console.log(`Server is listening on the ${PORT}`);
    });
} catch (err) {
    console.log(`Error : ${err}`);
    process.exit(1);
}