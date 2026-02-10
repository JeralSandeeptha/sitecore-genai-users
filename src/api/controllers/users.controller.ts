import logger from "../../utils/logger";
import SuccessResponse from "../../utils/SuccessResponse";
import ErrorResponse from "../../utils/ErrorResponse";
import HTTP_STATUS from "../../types/enums/HttpStatus";
import { RequestHandler } from "express";
import { UserModel } from "../models/User";

export const registerUserController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
        const savedUser = await UserModel.create({
          email: email,
          password: password
        });
        await savedUser.save();
        return res
          .status(HTTP_STATUS.CREATED)
          .json(
            new SuccessResponse(
              HTTP_STATUS.CREATED,
              "User register query was successful",
              "User Registered Successfully"
            )
          );
  } catch (error) {
    logger.error(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "User register query internal server error",
          error
        )
      );
  }
};

export const getSingleUserController: RequestHandler = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById(userId).select('-password');;
    if (!user) {
      logger.error("User not found");
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json(
          new ErrorResponse(
            HTTP_STATUS.NOT_FOUND,
            "User not found",
            "Get single user query was failed"
          )
        );
    }

    const userObj = user.toObject();

    if (userObj.vo_api_key) {
      const lastFour = userObj.vo_api_key.slice(-4);
      userObj.vo_api_key = `${'*'.repeat(userObj.vo_api_key.length - 4)}${lastFour}`;
    }

    logger.info("Get single user query was successful");
    return res
      .status(HTTP_STATUS.OK)
      .json(
        new SuccessResponse(
          HTTP_STATUS.OK,
          "Get single user query was successful",
          userObj
        )
      );
  } catch (error) {
    logger.error(error);
    console.log(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Get single user query internal server error",
          error
        )
      );
  }
};

export const loginUserController: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json(
        new ErrorResponse(
          HTTP_STATUS.BAD_REQUEST,
          "Login failed",
          "User email not registered"
        )
      );
    }

    if (user.password !== password) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json(
        new ErrorResponse(
          HTTP_STATUS.UNAUTHORIZED,
          "Login failed",
          "Invalid email or password"
        )
      );
    }

    // 3. Login successful
    return res.status(HTTP_STATUS.OK).json(
      new SuccessResponse(
        HTTP_STATUS.ACCEPTED,
        "User login successful",
        {
          id: user._id,
          email: user.email,
        }
      )
    );
  } catch (error) {
    logger.error(error);
    console.log(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Login user query internal server error",
          error
        )
      );
  }
};

export const updateUserPreferencesController: RequestHandler = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;
    await UserModel.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    logger.info("Update user preferences query was successful");
    return res
      .status(HTTP_STATUS.OK)
      .json(
        new SuccessResponse(
          HTTP_STATUS.OK,
          "Update user preferences query was successful",
          "Update user preferences query was successful"
        )
      );
  } catch (error) {
    logger.error(error);
    console.log(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Update user preferences query internal server error",
          error
        )
      );
  }
};

export const updateUserProfileController: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    await UserModel.findByIdAndUpdate(
      userId,
      req.body,
      { new: true }
    );

    logger.info("Update user profile query was successful");
    return res
      .status(HTTP_STATUS.OK)
      .json(
        new SuccessResponse(
          HTTP_STATUS.OK,
          "Update user profile query was successful",
          "Update user profile query was successful"
        )
      );
  } catch (error) {
    logger.error(error);
    console.log(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        new ErrorResponse(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Update user profile query internal server error",
          error
        )
      );
  }
};
