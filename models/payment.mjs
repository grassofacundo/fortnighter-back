import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
    {
        amount: {
            type: Number,
            required: false,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        job: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
    },
    { timestamps: true }
);

export const paymentModel = model("Payment", paymentSchema);
