//#region Dependency list
import { paymentModel } from "../../models/payment.mjs";
import { setError } from "../../utils/error-setter.mjs";
import { getId } from "../../utils/tools.mjs";
//import { getId } from "../../utils/tools.mjs";
//#endregion

export async function getPaginationPayments(req, res, next) {
    try {
        const { jobId, page } = req.query;
        if (!jobId) setError("Missing required param", 422, errors.array());
        const pageNum = Number(page);

        const payments = pageNum
            ? await paymentModel.find({
                  job: jobId,
              })
            : await paymentModel
                  .find({
                      job: jobId,
                  })
                  .skip((pageNum - 1) * 5)
                  .limit(5);

        res.status(201).json(
            payments.map((p) => {
                return { ...p._doc, id: getId(p) };
            })
        );
    } catch (error) {
        next(error);
    }
}
