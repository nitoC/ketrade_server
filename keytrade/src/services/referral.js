import referralRepository from "../models/referral.js";

const getReferralByIdService = async (userId) => {
    try {
        let referral = await referralRepository.find({ referringUserId: userId });
        console.log(referral)
        return referral;
    } catch (err) {
        console.log(err.message);
        return { err };
    }

}
const getReferralByBothIdService = async (userId, referred) => {
    try {
        let referral = await referralRepository.find({ referringUserId: userId, referredUserId: referred });
        console.log(referral)
        return referral;
    } catch (err) {
        console.log(err.message);
        return { err };
    }

}


const createReferralService = async (referralData) => {

    const referral = new referralRepository(referralData);


    try {
        let referralSaved = await referral.save();
        console.log(referralSaved)
        return referralSaved;

    } catch (err) {
        console.log(err.message)
        if (err) return { err };
    }

}

export {
    getReferralByIdService,
    createReferralService,
    getReferralByBothIdService
}