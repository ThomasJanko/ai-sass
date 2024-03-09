import userSubscriptionModel from "@/database/models/userSubscription.model";
import { connectToDatabase } from "@/database/mongoose";
import { auth } from "@clerk/nextjs"

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const { userId } = auth();

    if(!userId) return false;

    try {
        await connectToDatabase();
        
        const userSubscription = await userSubscriptionModel.findOne({ userId })
        .select('stripeSubscriptionId stripeCurrentPeriodEnd stripeCustomerId stripePriceId')

        if(!userSubscription) return false;

        const isValid = 
            userSubscription.stripePriceId &&
            userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

        return !!isValid;

    } catch (error) {
        console.error(error);
        return false;
    }
};