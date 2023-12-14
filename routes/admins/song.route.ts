import { Router } from "express";
const router: Router = Router();

import * as controller from "../../controllers/admins/song.controller";

router.get("/", controller.index);

export const songRoutes: Router = router;