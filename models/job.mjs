import { Schema, model } from "mongoose";

const jobSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        hourPrice: {
            regular: {
                normal: {
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
                normal: {
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
                normal: {
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
                normal: {
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
                normal: {
                    start: {
                        type: Number,
                        required: false,
                    },
                    end: {
                        type: Number,
                        required: false,
                    },
                },
                overtime: {
                    start: {
                        type: Number,
                        required: false,
                    },
                    end: {
                        type: Number,
                        required: false,
                    },
                },
                length: {
                    type: Number,
                    required: false,
                },
            },
            saturday: {
                normal: {
                    start: {
                        type: Number,
                        required: false,
                    },
                    end: {
                        type: Number,
                        required: false,
                    },
                },
                overtime: {
                    start: {
                        type: Number,
                        required: false,
                    },
                    end: {
                        type: Number,
                        required: false,
                    },
                },
                length: {
                    type: Number,
                    required: false,
                },
            },
            sunday: {
                normal: {
                    start: {
                        type: Number,
                        required: false,
                    },
                    end: {
                        type: Number,
                        required: false,
                    },
                },
                overtime: {
                    start: {
                        type: Number,
                        required: false,
                    },
                    end: {
                        type: Number,
                        required: false,
                    },
                },
                length: {
                    type: Number,
                    required: false,
                },
            },
            holiday: {
                normal: {
                    start: {
                        type: Number,
                        required: false,
                    },
                    end: {
                        type: Number,
                        required: false,
                    },
                },
                overtime: {
                    start: {
                        type: Number,
                        required: false,
                    },
                    end: {
                        type: Number,
                        required: false,
                    },
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
