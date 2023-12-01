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
        cycleEnd: {
            type: Date,
            required: true,
        },
        isFortnightly: {
            type: Boolean,
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
