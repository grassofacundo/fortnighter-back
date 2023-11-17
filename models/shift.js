const { Schema, model } = require("mongoose");

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

module.exports = model("Shift", shiftSchema);
