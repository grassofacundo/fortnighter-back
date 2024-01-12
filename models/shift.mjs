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
        forcedPaymentInfo: {
            week: {
                regular: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
                overtime: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
                overwork: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
            },
            saturday: {
                regular: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
                overtime: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
                overwork: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
            },
            sunday: {
                regular: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
                overtime: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
                overwork: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
            },
            holiday: {
                regular: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
                overtime: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
                overwork: {
                    price: {
                        type: Number,
                        required: false,
                    },
                    hours: {
                        type: Number,
                        required: false,
                    },
                },
            },
        },
    },
    { timestamps: true }
);

export const shiftModel = model("Shift", shiftSchema);
