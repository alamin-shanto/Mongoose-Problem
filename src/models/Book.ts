import mongoose, { Schema, Document, Model } from "mongoose";

export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a positive number"],
    },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// pre-save middleware enforces available flag based on copies
BookSchema.pre("save", function (next) {
  if (this.copies <= 0) this.available = false;
  else this.available = true;
  next();
});

// instance method to adjust copies
BookSchema.methods.adjustCopies = async function (delta: number) {
  this.copies = this.copies + delta;
  if (this.copies < 0) throw new Error("Not enough copies available");
  this.available = this.copies > 0;
  return this.save();
};

// static helper to adjust copies by id
BookSchema.statics.adjustCopiesById = async function (
  bookId: string,
  delta: number
) {
  const book = await this.findById(bookId);
  if (!book) throw new Error("Book not found");
  return book.adjustCopies(delta);
};

export interface BookModel extends Model<IBook> {
  adjustCopiesById(bookId: string, delta: number): Promise<IBook>;
}

const Book = mongoose.model<IBook, BookModel>("Book", BookSchema);
export default Book;
