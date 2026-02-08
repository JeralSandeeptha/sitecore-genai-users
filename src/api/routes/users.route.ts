import { Router } from "express";
import { getSingleUserController, loginUserController, registerUserController, updateUserPreferencesController, updateUserProfileController } from "../controllers/users.controller";

const router = Router();

// register user route
router.post('/', registerUserController);

// login user route
router.post('/login', loginUserController);

// get single user route
router.get('/:userId', getSingleUserController);

// get single user route
router.get('/:userId', getSingleUserController);

// update user profile route
router.patch('/:userId/profile', updateUserProfileController);

// update user security route
router.patch('/:userId/preferences', updateUserPreferencesController);

export default router;
