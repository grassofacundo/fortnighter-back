import { Schema, model } from "mongoose";
import { getFutureDate } from "../utils/dateHelper.mjs";

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

jobSchema.methods.updateAfterPayment = async function () {
    const paymentLapse = getDaysBetweenDates(
        this.lastPayment,
        this.nextPayment
    );
    this.lastPayment = this.nextPayment;
    this.nextPayment = getFutureDate(paymentLapse, this.nextPayment);
    await this.save();
    return {
        newLastPayment: this.lastPayment,
        newNextPayment: this.nextPayment,
    };
};

export const jobModel = model("Job", jobSchema);
