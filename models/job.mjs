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
                    required: true,
                },
                overwork: {
                    type: Number,
                    required: true,
                },
            },
            saturday: {
                normal: {
                    type: Number,
                    required: true,
                },
                overtime: {
                    type: Number,
                    required: true,
                },
                overwork: {
                    type: Number,
                    required: true,
                },
            },
            sunday: {
                normal: {
                    type: Number,
                    required: true,
                },
                overtime: {
                    type: Number,
                    required: true,
                },
                overwork: {
                    type: Number,
                    required: true,
                },
            },
            holiday: {
                normal: {
                    type: Number,
                    required: true,
                },
                overtime: {
                    type: Number,
                    required: true,
                },
                overwork: {
                    type: Number,
                    required: true,
                },
            },
        },
        workdayTimes: {
            regular: {
                normal: {
                    start: {
                        type: Number,
                        required: true,
                    },
                    end: {
                        type: Number,
                        required: true,
                    },
                },
                overtime: {
                    start: {
                        type: Number,
                        required: true,
                    },
                    end: {
                        type: Number,
                        required: true,
                    },
                },
                length: {
                    type: Number,
                    required: true,
                },
            },
            saturday: {
                normal: {
                    start: {
                        type: Number,
                        required: true,
                    },
                    end: {
                        type: Number,
                        required: true,
                    },
                },
                overtime: {
                    start: {
                        type: Number,
                        required: true,
                    },
                    end: {
                        type: Number,
                        required: true,
                    },
                },
                length: {
                    type: Number,
                    required: true,
                },
            },
            sunday: {
                normal: {
                    start: {
                        type: Number,
                        required: true,
                    },
                    end: {
                        type: Number,
                        required: true,
                    },
                },
                overtime: {
                    start: {
                        type: Number,
                        required: true,
                    },
                    end: {
                        type: Number,
                        required: true,
                    },
                },
                length: {
                    type: Number,
                    required: true,
                },
            },
            holiday: {
                normal: {
                    start: {
                        type: Number,
                        required: true,
                    },
                    end: {
                        type: Number,
                        required: true,
                    },
                },
                overtime: {
                    start: {
                        type: Number,
                        required: true,
                    },
                    end: {
                        type: Number,
                        required: true,
                    },
                },
                length: {
                    type: Number,
                    required: true,
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

export const jobModel = model("Job", jobSchema);
