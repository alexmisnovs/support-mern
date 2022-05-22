const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select product"],
      enum: ["website", "app", "tech support", "other"],
      default: "other",
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    status: {
      type: String,
      required: true,
      default: "new",
      enum: ["new", "open", "closed"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
