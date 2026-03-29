const mongoose = require('mongoose');

// Subdocument schema for order items
const orderItemSchema = new mongoose.Schema(
  {
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

// Main order schema
const orderSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    items: {
      type: [orderItemSchema],
      validate: [arrayMinLength, 'Order must contain at least one item'],
      required: true,
    },
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['PLACED', 'PREPARING', 'DELIVERED', 'CANCELLED'],
      default: 'PLACED',
    },
  },
  { timestamps: true }
);

function arrayMinLength(val) {
  return val.length > 0;
}

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;