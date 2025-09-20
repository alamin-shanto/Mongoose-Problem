import { Request, Response, NextFunction } from "express";
import Borrow from "../models/Borrow";
import Book from "../models/Book";
import mongoose from "mongoose";

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    if (!mongoose.isValidObjectId(bookId))
      return res
        .status(400)
        .json({
          success: false,
          message: "Validation failed",
          error: "Invalid book id",
        });

    const book = await Book.findById(bookId);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found", error: null });
    if (!book.available || book.copies < quantity) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Not enough copies available",
          error: null,
        });
    }

    // deduct copies via static method
    await Book.adjustCopiesById(bookId, -quantity);

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });
    return res
      .status(201)
      .json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
  } catch (err) {
    next(err);
  }
};

export const borrowedSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const pipeline = [
      { $group: { _id: "$book", totalQuantity: { $sum: "$quantity" } } },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
      {
        $project: {
          _id: 0,
          book: { title: "$bookInfo.title", isbn: "$bookInfo.isbn" },
          totalQuantity: 1,
        },
      },
    ];

    const data = await Borrow.aggregate(pipeline).exec();
    return res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data,
    });
  } catch (err) {
    next(err);
  }
};
