"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const fav_1 = __importDefault(require("./routes/fav"));
const app = (0, express_1.default)();
(0, db_1.default)();
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev")); // Morgan 미들웨어 설정
// router
app.use("/api/auth", auth_1.default);
app.use("/api/fav", fav_1.default);
exports.default = app;
