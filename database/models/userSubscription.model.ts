
//userSubscription Model mongoose

import mongoose from "mongoose";

const userSubscription = new mongoose.Schema({
    userId: {type: String, required: true},
    stripeCustomerId: {type: String, required: false, unique: true},
    stripeSubscriptionId: {type: String, required: false, unique: true},
    stripePriceId: {type: String, required: false},
    stripeCurrentPeriodEnd: {type: Date, required: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

export default mongoose.models.userSubscription ||
  mongoose.model("userSubscription", userSubscription);

