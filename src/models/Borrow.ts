import mongoose, { Schema, Document } from "mongoose";

export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
}

const BorrowSchema = new Schema<IBorrow>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBorrow>("Borrow", BorrowSchema);
