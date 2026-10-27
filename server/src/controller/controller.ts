
import type { Request, Response, NextFunction } from "express";
import type { Service } from "../../src/service/service";

export class Controller {
    private readonly service: Service;

    constructor(service: Service) {
        this.service = service;
    }

    public async createAccount(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { username, password } = req.body;

            const user = await this.service.createAccount(
                username,
                password
            );

            res.status(201).json({
                success: true,
                message: "Account created successfully",
                data: user,
            });
        } catch (error) {
            next(error);
        }
    }

    public async tokenGeneration(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { userId } = req.body;

            const result = await this.service.tokenGeneration(userId);

            res.status(200).json({
                success: true,
                message: "Token generated successfully",
                data: result,
            });
        } catch (error) {
            next(error);
        }
    }

    public async resetPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { userId, newPassword, token } = req.body;

            const result = await this.service.resetPassword(
                userId,
                newPassword,
                token
            );

            if (!result) {
                res.status(400).json({
                    success: false,
                    message: "Password reset failed",
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "Password reset successfully",
            });
        } catch (error) {
            next(error);
        }
    }
}
