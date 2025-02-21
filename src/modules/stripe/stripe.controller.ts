import { Body, Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {

    constructor(private readonly stripeService: StripeService) { }

    @Post('create-checkout-session')
    async createCheckoutSession(@Body() body: { subscriptionID: number, userID: number, userEmail: string }) {
        return this.stripeService.createCheckoutSession(body.subscriptionID, body.userID, body.userEmail);
    }

    @Post('confirm-payment')
    async confirmPayment(@Body() body: { session_id: string }) {
        return this.stripeService.confirmPayment(body.session_id);
    }

}
