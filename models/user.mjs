import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: false,
        },
        jobs: [
            {
                type: Schema.Types.ObjectId,
                ref: "Job",
            },
        ],
    },
    { timestamps: true }
);

export const userModel = model("User", userSchema);
