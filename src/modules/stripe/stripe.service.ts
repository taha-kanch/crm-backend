import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { UsersService } from '../users/users.service';
import { SUBSCRIPTION_REPOSITORY } from 'src/core/constants';
import { Subscription } from '../subscription/subscription.entity';
import { SubscriptionType } from '../subscription-type/subscription-type.entity';

@Injectable()
export class StripeService {
    private stripe: Stripe

    constructor(
        private configService: ConfigService, private readonly userService: UsersService,
        @Inject(SUBSCRIPTION_REPOSITORY) private readonly subscriptionRepository: typeof Subscription,
    ) {
        this.stripe = new Stripe(this.configService.get(`STRIPE_SECRET_KEY`) || '', {
            apiVersion: '2025-01-27.acacia',
        })
    }

    async createCheckoutSession(subscriptionID: number, userID: number, userEmail: string) {

        const subscription = await this.subscriptionRepository.findOne({
            where: { id: subscriptionID },
            include: [
                {
                    model: SubscriptionType,
                    as: "subscriptionType",
                    attributes: ["typeName"],
                }
            ]
        });

        if (!subscription) {
            throw new Error("Subscription not found.");
        }


        const session = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: userEmail,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: subscription.subscriptionType.typeName
                        },
                        unit_amount: subscription.price * 100,
                    },
                    quantity: 1,
                }
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/subscription/cancel`,
            metadata: { userID, subscriptionID },
        });

        return { sessionUrl: session.url };
    }

    async confirmPayment(sessionId: string) {
        const session = await this.stripe.checkout.sessions.retrieve(sessionId);
        if (!session || session.payment_status !== 'paid') {
            throw new Error('Payment not successful');
        }

        const userID = session.metadata?.userID;
        const subscriptionID = session.metadata?.subscriptionID; // Get subscription ID

        if (!userID || !subscriptionID) {
            throw new Error('User ID or Subscription ID missing');
        }
        const subscription = await this.subscriptionRepository.findOne({ where: { id: subscriptionID } });
        if (!subscription) {
            throw new Error("Subscription not found.");
        }
        await this.userService.subscribeUser(parseInt(userID), subscription);

        return { message: 'Subscription updated successfully' };
    }

}
