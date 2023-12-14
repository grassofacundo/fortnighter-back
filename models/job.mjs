import { Schema, model } from "mongoose";

const jobSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        hourPrice: {
            type: Number,
            required: true,
        },
        paymentLapse: {
            type: Number,
            required: true,
        },
        nextPaymentDate: {
            type: Date,
            required: true,
        },
        companyName: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false,
        },
        address: {
            type: String,
            required: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const jobModel = model("Job", jobSchema);
