"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favController_1 = require("../controllers/favController");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
// router
router.get("/", authMiddleware_1.default, favController_1.getFav);
router.post("/add", authMiddleware_1.default, favController_1.addFav);
router.delete("/remove", authMiddleware_1.default, favController_1.removeFav);
exports.default = router;
