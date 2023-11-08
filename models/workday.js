const { Schema, model } = require("mongoose");

const workDaySchema = new Schema(
    {
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model("WorkDay", workDaySchema);
