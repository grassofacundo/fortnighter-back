import { Schema, model } from "mongoose";

const sessionSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        isValid: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

export const sessionModel = model("Session", sessionSchema);
