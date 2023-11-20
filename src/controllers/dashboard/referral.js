
import { getUserById } from "../../services/auth.js";
import Joi from "@hapi/joi";
//import { getCompleteOrdersByIdService, getOrdersByIdService } from "../../services/orders.js";
import { createReferralService, getReferralByIdService, getReferralByBothIdService } from "../../services/referral.js";


const createReferral = async (req, res) => {

    let { referringUserId, referredUserId } = req.body;

    referredUserId = referredUserId.trim()
    referringUserId = referringUserId.trim();


    const joiSchema = Joi.object({
        referredUserId: Joi.string().required().min(7),
        referringUserId: Joi.string().required().min(7),

    })
    let validEntry = joiSchema.validate({
        referredUserId,
        referringUserId
    })

    if (!validEntry) return res.status(400).json({ message: "invalid request" })

    try {
        let user = await getUserById(referringUserId)

        if (!user || user.length < 1) return res.status(404).json({ message: 'user not found' })

        let referredBefore = await getReferralByBothIdService(referringUserId, referredUserId)
        if (referredBefore.length > 0) {
            res.status(400).json({ message: 'cannot refer a user for a second time' })
        }

        const referral = await createReferralService({ referringUserId, referredUserId })
        console.log("referral", referral)
        if (referral.err) throw new Error('internal server error')

        return res.status(201).json({ status: " request created", payload: referral });

    } catch (err) {
        console.log(err)
        console.log(err.message, 'error creating referral');
        return res.status(500).json({ message: 'oops! an error occured while making a referral request' })
    }
};

// get all orders by user id
const getReferrals = async (req, res) => {
    const { userId } = req.params

    try {
        let user = await getUserById(userId)

        if (user.err) throw new Error('server error')

        if (!user || user.length < 1) return res.status(401).json({ status: 'failed', message: 'invalid user id' })

        let referral = await getReferralByIdService(userId)

        console.log(referral, 'referral')
        if (!referral || referral.err) {
            return res.status(500).json({ message: 'no referrals! and error occured' })
        } else {
            return res.status(200).json({ message: "successful", payload: referral.length });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'no referrals! and error occured' })
    }
};

export {
    createReferral,
    getReferrals
}