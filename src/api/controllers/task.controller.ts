import logger from "../../utils/logger";
import SuccessResponse from "../../utils/SuccessResponse";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS from "../../types/enums/HttpStatus";
import { RequestHandler } from "express";
import { TaskModel } from "../models/Task";
import mongoose from "mongoose";

export const createTask: RequestHandler = async (req, res) => {
    try {
        const { prompt, image, user } = req.body;

        const task = new TaskModel({ prompt, image, user });
        await task.save();

        return res.status(HTTP_STATUS.CREATED).json(
            new SuccessResponse(
                HTTP_STATUS.CREATED,
                "Create task query was successfull",
                task
            )
        );
    } catch (error: any) {
        logger.error(error.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Create task query internal server error",
                error
            )
        );
    }
};

export const updateTask: RequestHandler = async (req, res) => {
    try {
        const { taskId } = req.params;
        const updateData = req.body;

        const task = await TaskModel.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true }
        );

        if (!task) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new ErrorResponse(
                    HTTP_STATUS.NOT_FOUND,
                    "Update task query was failed",
                    "Task not found",
                )
            );
        }

        return res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Update task query was successfull",
                "Task updated successfully",
            )
        );
    } catch (error: any) {
        logger.error(error.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Update task query internal server error",
                error
            )
        );
    }
};

export const deleteTask: RequestHandler = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await TaskModel.findByIdAndDelete(taskId);

        if (!task) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new ErrorResponse(
                    HTTP_STATUS.NOT_FOUND,
                    "Delete task query was failed",
                    "Task not found"
                )
            );
        }

        return res.status(HTTP_STATUS.NO_CONTENT).json(
            new SuccessResponse(
                HTTP_STATUS.NO_CONTENT,
                "Task deleted successfully",
                "Task deleted successfully"
            )
        );
    } catch (error: any) {
        logger.error(error.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Delete task query internal server error",
                error
            )
        );
    }
};

export const getTaskById: RequestHandler = async (req, res) => {
    try {
        const { taskId } = req.params;

        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res.status(HTTP_STATUS.NOT_FOUND).json(
                new ErrorResponse(
                    HTTP_STATUS.NOT_FOUND,
                    "Get single task query was failed",
                    "Task not found"
                )
            );
        }

        return res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Get single task query was successfull",
                task
            )
        );
    } catch (error: any) {
        logger.error(error.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Get single task query internal server error",
                error
            )
        );
    }
};

interface GetTasksByUserParams {
    userId: string;
}
export const getTasksByUserId: RequestHandler<GetTasksByUserParams> = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json(
                new ErrorResponse(
                    HTTP_STATUS.BAD_REQUEST,
                    "Get tasks by userID query failed",
                    "Invalid user ID"
                )
            );
        }

        const tasks = await TaskModel.find({ user: userId })
            .populate({
                    path: "user",
                    select: "fname lname email",
                })
                .sort({ createdAt: -1 });

        return res.status(HTTP_STATUS.OK).json(
            new SuccessResponse(
                HTTP_STATUS.OK,
                "Get tasks by userID query was successfull",
                tasks
            )
        );
    } catch (error: any) {
        logger.error(error.message);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
            new ErrorResponse(
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                "Get tasks by userID query internal server error",
                error
            )
        );
    }
};