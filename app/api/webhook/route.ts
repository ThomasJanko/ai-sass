import Stripe from 'stripe';
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe";
import { headers } from 'next/headers';
import userSubscriptionModel from '@/database/models/userSubscription.model';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get('Stripe-Signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error: any) {
        return new NextResponse("Webhook Error: " + error.message, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        if(!session?.metadata?.userId) {
            return new NextResponse("Webhook Error: no user id", { status: 400 });
        }

        await userSubscriptionModel.create({
            userId: session?.metadata?.userId, 
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
        });
    }

    if(event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

        await userSubscriptionModel.updateOne({stripeSubscriptionId: subscription.id}, {
            stripePriceId: subscription.items.data[0].price.id,
            stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
        });
    }

    return new NextResponse(null, { status: 200 });

}