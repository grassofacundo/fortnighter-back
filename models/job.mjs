import { Schema, model } from "mongoose";

const jobSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        hourPrice: {
            week: {
                regular: {
                    type: Number,
                    required: true,
                },
                overtime: {
                    type: Number,
                    required: false,
                },
                overwork: {
                    type: Number,
                    required: false,
                },
            },
            saturday: {
                regular: {
                    type: Number,
                    required: false,
                },
                overtime: {
                    type: Number,
                    required: false,
                },
                overwork: {
                    type: Number,
                    required: false,
                },
            },
            sunday: {
                regular: {
                    type: Number,
                    required: false,
                },
                overtime: {
                    type: Number,
                    required: false,
                },
                overwork: {
                    type: Number,
                    required: false,
                },
            },
            holiday: {
                regular: {
                    type: Number,
                    required: false,
                },
                overtime: {
                    type: Number,
                    required: false,
                },
                overwork: {
                    type: Number,
                    required: false,
                },
            },
        },
        workdayTimes: {
            regular: {
                startTime: {
                    type: String,
                    required: true,
                },
                startMeridian: {
                    type: String,
                    required: true,
                },
                endTime: {
                    type: String,
                    required: true,
                },
                endMeridian: {
                    type: String,
                    required: true,
                },
                length: {
                    type: Number,
                    required: true,
                },
            },
            saturday: {
                startTime: {
                    type: String,
                    required: false,
                },
                startMeridian: {
                    type: String,
                    required: false,
                },
                endTime: {
                    type: String,
                    required: false,
                },
                endMeridian: {
                    type: String,
                    required: false,
                },
                length: {
                    type: Number,
                    required: false,
                },
            },
            sunday: {
                startTime: {
                    type: String,
                    required: false,
                },
                startMeridian: {
                    type: String,
                    required: false,
                },
                endTime: {
                    type: String,
                    required: false,
                },
                endMeridian: {
                    type: String,
                    required: false,
                },
                length: {
                    type: Number,
                    required: false,
                },
            },
            holiday: {
                startTime: {
                    type: String,
                    required: false,
                },
                startMeridian: {
                    type: String,
                    required: false,
                },
                endTime: {
                    type: String,
                    required: false,
                },
                endMeridian: {
                    type: String,
                    required: false,
                },
                length: {
                    type: Number,
                    required: false,
                },
            },
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
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export const jobModel = model("Job", jobSchema);

/*
My regular workday during [week, saturday, sunday, holiday] is from [hour1] to [hour2] and the price is [price1]. Then, from [hour2] to [hour1], the overtime price is [price2].
My regular workday is [hoursAmount] length, after those hours, the overwork price is [price3]
*/
