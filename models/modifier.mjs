import { Schema, model } from "mongoose";

const modifierSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        byShift: [
            {
                forEvery: {
                    type: Number, //For every N worked shift(s)
                    required: false,
                },
            },
        ],
        byPayment: [
            {
                type: Schema.Types.ObjectId,
                ref: "Payment",
                required: false,
            },
        ],
        byAmount: [
            {
                moreThan: {
                    type: Boolean,
                    required: true,
                },
                lessThan: {
                    type: Boolean,
                    required: true,
                },
                amount: {
                    type: Number,
                    required: true,
                },
            },
        ],
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
    },
    { timestamps: true }
);

export const modifierModel = model("Modifier", modifierSchema);

/*
Allow many conditions, even more than one of the same nature
Applied by amount
If the amount to receive is [more, less] than [amount1]. 
Applied by date
Periodically
Every [unitTime] of [shift, days, months]
By specific time
If [month, day] is [specific month/day],

[Add, decrease] a [percentage/fixed] amount from the total.
The fixed amount is [amount2].
The percentage amount is [percentage]% of [totalAmount, anyOtherPercentage].
*/
