import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // mongoose validation
  if (err.name === "ValidationError") {
    return res
      .status(400)
      .json({ message: "Validation failed", success: false, error: err });
  }

  if (err.message === "Not enough copies available") {
    return res
      .status(400)
      .json({ message: err.message, success: false, error: err.message });
  }

  // duplicate key
  if (err.code && err.code === 11000) {
    return res
      .status(400)
      .json({ message: "Validation failed", success: false, error: err });
  }

  console.error(err);
  return res
    .status(500)
    .json({
      message: "Internal server error",
      success: false,
      error: err.message || err,
    });
};
