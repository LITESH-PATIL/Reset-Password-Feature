import { Router } from "express";
import { controller } from "../dependency/dependency";

const router = Router();


router.post("/signup", (req, res, next) =>
    controller.createAccount(req, res, next)
);


router.post("/generate-token", (req, res, next) =>
    controller.tokenGeneration(req, res, next)
);

router.post("/reset-password", (req, res, next) =>
    controller.resetPassword(req, res, next)
);

export default router;