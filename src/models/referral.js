// models/referral.js

import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema({
    referringUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Referring user's ID
    referredUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Referred user's ID
    createdAt: { type: Date, default: Date.now },
});

const Referral = mongoose.model('referral', ReferralSchema);

export default Referral;
