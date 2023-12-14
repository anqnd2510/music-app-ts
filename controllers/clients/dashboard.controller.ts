import { Request, Response } from "express";

// [GET] /clients/dashboard/
export const index =async (req: Request, res: Response) => {
    res.render("clients/pages/dashboard/index", {
        pageTitle: "Tổng quan",
    });
};