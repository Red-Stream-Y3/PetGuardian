import express from "express";
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    requestRole,
    getAuthorInfoById,
} from "../controllers/userController.js";
import { protect, admin, provider } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect, getUsers);
router.post("/login", authUser);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);
router
    .route("/:id")
    .delete(protect, deleteUser)
    .get(protect, getUserById)
    .put(protect, updateUser);
router.route("/:id/request").put(protect, requestRole);
router.route("/:id/author").get(protect, getAuthorInfoById);

export default router;
