import { Schema, model } from "mongoose";

const paymentSchema = new Schema(
    {
        // submitted: {
        //     type: Boolean,
        //     required: true,
        // },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
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
                    required: true,
                },
                overwork: {
                    type: Number,
                    required: true,
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
        modifiers: [
            {
                name: {
                    type: String,
                    required: true,
                },
                byShift: {
                    forEvery: {
                        type: Number,
                        required: false,
                    },
                },
                byPayment: {
                    type: Schema.Types.ObjectId,
                    ref: "Payment",
                    required: false,
                },
                byAmount: {
                    moreThan: {
                        type: Boolean,
                        required: false,
                    },
                    lessThan: {
                        type: Boolean,
                        required: false,
                    },
                    daily: {
                        type: Boolean,
                        required: false,
                    },
                    total: {
                        type: Boolean,
                        required: false,
                    },
                    amount: {
                        type: Number,
                        required: false,
                    },
                },
                amount: {
                    increase: {
                        type: Boolean,
                        required: true,
                    },
                    decrease: {
                        type: Boolean,
                        required: true,
                    },
                    isPercentage: {
                        type: Boolean,
                        required: true,
                    },
                    isFixed: {
                        type: Boolean,
                        required: true,
                    },
                    amount: {
                        type: Number,
                        required: true,
                    },
                },
            },
        ],
        shifts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Shift",
                required: true,
            },
        ],
        job: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: true,
        },
    },
    { timestamps: true }
);

export const paymentModel = model("Payment", paymentSchema);
