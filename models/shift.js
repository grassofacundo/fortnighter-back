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
        workdays: [
            {
                type: Schema.Types.ObjectId,
                ref: "WorkDay",
            },
        ],
    },
    { timestamps: true }
);

module.exports = model("Shift", shiftSchema);
/*
Shifts
    {
        user: user.id
        job: job.id
        workdays: [
            workday,
            workday,
            workday,
            workday...
        ]
    }
*/
