"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const utils_1 = require("../helpers/utils");
const argon2_1 = __importDefault(require("argon2"));
const user_service_1 = require("../services/user.service");
const error = __importStar(require("../error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
async function register(req, res) {
    const { username, name, password } = req.body;
    const existingUser = await (0, user_service_1.getUserByUsername)(username);
    if (existingUser) {
        throw new error.ForbiddenError('Username already exists!', 'Register');
    }
    const hashedPassword = await argon2_1.default.hash(password);
    const result = await (0, user_service_1.newUser)(username, name, hashedPassword);
    res.send(utils_1.ResponseFactory.success(result, 'User registered!'));
}
async function login(req, res) {
    const { username, password } = req.body;
    const user = await (0, user_service_1.getUserByUsername)(username);
    if (!user) {
        throw new error.UnauthorizedError('Invalid username or password!', 'Login');
    }
    const validPassword = await argon2_1.default.verify(user.password, password);
    if (!validPassword) {
        throw new error.UnauthorizedError('Invalid username or password!', 'Login');
    }
    const jwtPayload = user; // as User;
    const token = jsonwebtoken_1.default.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.send(utils_1.ResponseFactory.success({ token: token }, 'Login successful!'));
}
//# sourceMappingURL=user.controller.js.map