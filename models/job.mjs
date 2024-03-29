import { Schema, model } from "mongoose";
import { getDaysBetweenDates, getFutureDate } from "../utils/dateHelper.mjs";

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
            week: {
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
        nextPayment: {
            type: Date,
            required: true,
        },
        lastPayment: {
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

jobSchema.methods.updateDatesAfterPayment = async function () {
    const paymentLapse = getDaysBetweenDates(
        this.lastPayment,
        this.nextPayment
    );
    const newLastPayment = structuredClone(this.nextPayment);
    const newNextPayment = getFutureDate(paymentLapse, this.nextPayment);
    this.lastPayment = newLastPayment;
    this.nextPayment = newNextPayment;

    await this.save();
};

export const jobModel = model("Job", jobSchema);
