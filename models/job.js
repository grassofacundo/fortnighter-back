const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
    {
        positionName: {
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

module.exports = model("Job", jobSchema);

/*
This could grow
company name
address
I don't know, some other info
*/
