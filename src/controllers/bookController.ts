import { Request, Response, NextFunction } from "express";
import Book from "../models/Book";
import mongoose from "mongoose";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const book = await Book.create(payload);
    return res
      .status(201)
      .json({
        success: true,
        message: "Book created successfully",
        data: book,
      });
  } catch (err) {
    next(err);
  }
};

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query as any;
    const q: any = {};
    if (filter) q.genre = filter;
    const lim = Math.max(1, parseInt(limit, 10) || 10);
    const sortObj: any = { [sortBy]: sort === "asc" ? 1 : -1 };

    const books = await Book.find(q).sort(sortObj).limit(lim).exec();
    return res.json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    if (!mongoose.isValidObjectId(bookId))
      return res
        .status(404)
        .json({
          success: false,
          message: "Book not found",
          error: "Invalid ID",
        });
    const book = await Book.findById(bookId).exec();
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found", error: null });
    return res.json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const update = req.body;
    if (!mongoose.isValidObjectId(bookId))
      return res
        .status(404)
        .json({
          success: false,
          message: "Book not found",
          error: "Invalid ID",
        });
    const book = await Book.findByIdAndUpdate(bookId, update, {
      new: true,
      runValidators: true,
    }).exec();
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found", error: null });
    return res.json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    if (!mongoose.isValidObjectId(bookId))
      return res
        .status(404)
        .json({
          success: false,
          message: "Book not found",
          error: "Invalid ID",
        });
    const book = await Book.findByIdAndDelete(bookId).exec();
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "Book not found", error: null });
    return res.json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
