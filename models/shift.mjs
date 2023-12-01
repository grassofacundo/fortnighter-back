import { Schema, model } from "mongoose";

const shiftSchema = new Schema(
    {
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
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        isHoliday: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true }
);

export const shiftModel = model("Shift", shiftSchema);
