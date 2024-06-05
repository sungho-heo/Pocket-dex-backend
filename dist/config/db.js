"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// db 설정및 연결
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.error("MongoDB URI not found");
        process.exit(1);
    }
    try {
        yield mongoose_1.default.connect(mongoUri);
        console.log("MongoDB Connected");
    }
    catch (error) {
        console.error("MongoDB connection error", error);
        process.exit(1);
    }
});
exports.default = connectDB;
