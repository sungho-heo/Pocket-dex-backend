"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const apiRouter_1 = __importDefault(require("./routes/apiRouter"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// server log http status code
app.use((0, morgan_1.default)("dev"));
// router
app.use("/api", apiRouter_1.default);
// home
app.get("/", (req, res) => {
    res.send("hello world");
});
// server start
app.listen(PORT, () => {
    console.log(`✅ Server running: http://localhost:${PORT}`);
});
