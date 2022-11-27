import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import Stripe from "https://esm.sh/stripe?target=deno";


const stripe = Stripe(Deno.env.get("SSK"), {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  httpClient: Stripe.createFetchHttpClient(),
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();

const handler = async (req: Request) => {
  const sig = req.headers["stripe-signature"];
  const body = await req.text();
  let receivedEvent;

  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      Deno.env.get("WHS"),
      undefined,
      cryptoProvider
    );
  } catch (err) {
    // response.status(400).send(`Webhook Error: ${err.message}`);
    return new Response(err.message, { status: 400 });
  }
  const requestOptions =
    receivedEvent.request && receivedEvent.request.idempotency_key
      ? {
          idempotencyKey: receivedEvent.request.idempotency_key,
        }
      : {};

  let retrievedEvent;
  try {
    retrievedEvent = await stripe.events.retrieve(receivedEvent.id, requestOptions);
  } catch (err) {
    return new Response(err.message, { status: 400 });
  }

  console.log(retrievedEvent);

  switch (retrievedEvent.type) {
    case "account.updated": {
      const account = retrievedEvent.data.object;
      console.log("account.updated", account);
      // Then define and call a function to handle the event account.updated
      break;
    }
    case "account.application.authorized": {
      const application = retrievedEvent.data.object;

      console.log("account.application.authorized", application);
      // Then define and call a function to handle the event account.application.authorized
      break;
    }
    case "account.application.deauthorized":
      const application = retrievedEvent.data.object;
      console.log("account.application.deauthorized", application);
      // Then define and call a function to handle the event account.application.deauthorized
      break;
    case "account.external_account.created": {
      const externalAccount = retrievedEvent.data.object;
      console.log("account.external_account.created", externalAccount);
      // Then define and call a function to handle the event account.external_account.created
      break;
    }
    case "account.external_account.deleted": {
      const externalAccount = retrievedEvent.data.object;
      console.log("account.external_account.deleted", externalAccount);
      // Then define and call a function to handle the event account.external_account.deleted
      break;
    }
    case "account.external_account.updated": {
      const externalAccount = retrievedEvent.data.object;
      console.log("account.external_account.updated", externalAccount);
      // Then define and call a function to handle the event account.external_account.updated
      break;
    }
    case "application_fee.created": {
      const applicationFee = retrievedEvent.data.object;
      console.log("application_fee.created", applicationFee);
      // Then define and call a function to handle the event application_fee.created
      break;
    }
    case "application_fee.refunded": {
      const applicationFee = retrievedEvent.data.object;
      console.log("application_fee.refunded", applicationFee);
      // Then define and call a function to handle the event application_fee.refunded
      break;
    }
    case "application_fee.refund.updated": {
      const refund = retrievedEvent.data.object;
      console.log("application_fee.refund.updated", refund);
      // Then define and call a function to handle the event application_fee.refund.updated
      break;
    }
    case "balance.available": {
      const balance = retrievedEvent.data.object;
      console.log("balance.available", balance);
      // Then define and call a function to handle the event balance.available
      break;
    }
    case "billing_portal.configuration.created": {
      const configuration = retrievedEvent.data.object;
      console.log("billing_portal.configuration.created", configuration);
      // Then define and call a function to handle the event billing_portal.configuration.created
      break;
    }
    case "billing_portal.configuration.updated": {
      const configuration = retrievedEvent.data.object;
      console.log("billing_portal.configuration.updated", configuration);
      // Then define and call a function to handle the event billing_portal.configuration.updated
      break;
    }
    case "billing_portal.session.created": {
      const session = retrievedEvent.data.object;
      console.log("billing_portal.session.created", session);
      // Then define and call a function to handle the event billing_portal.session.created
      break;
    }
    case "capability.updated": {
      const capability = retrievedEvent.data.object;
      console.log("capability.updated", capability);
      // Then define and call a function to handle the event capability.updated
      break;
    }
    case "cash_balance.funds_available": {
      const cashBalance = retrievedEvent.data.object;
      console.log("cash_balance.funds_available", cashBalance);
      // Then define and call a function to handle the event cash_balance.funds_available
      break;
    }
    case "charge.captured": {
      const charge = retrievedEvent.data.object;
      console.log("charge.captured", charge);
      // Then define and call a function to handle the event charge.captured
      break;
    }
    case "charge.expired": {
      const charge = retrievedEvent.data.object;
      console.log("charge.expired", charge);
      // Then define and call a function to handle the event charge.expired
      break;
    }
    case "charge.failed": {
      const charge = retrievedEvent.data.object;
      console.log("charge.failed", charge);
      // Then define and call a function to handle the event charge.failed
      break;
    }
    case "charge.pending": {
      const charge = retrievedEvent.data.object;
      console.log("charge.pending", charge);
      // Then define and call a function to handle the event charge.pending
      break;
    }
    case "charge.refunded": {
      const charge = retrievedEvent.data.object;
      console.log("charge.refunded", charge);
      // Then define and call a function to handle the event charge.refunded
      break;
    }
    case "charge.succeeded": {
      const charge = retrievedEvent.data.object;
      console.log("charge.succeeded", charge);
      // Then define and call a function to handle the event charge.succeeded
      break;
    }
    case "charge.updated": {
      const charge = retrievedEvent.data.object;
      console.log("charge.updated", charge);
      // Then define and call a function to handle the event charge.updated
      break;
    }
    case "charge.dispute.closed": {
      const dispute = retrievedEvent.data.object;
      console.log("charge.dispute.closed", dispute);
      // Then define and call a function to handle the event charge.dispute.closed
      break;
    }
    case "charge.dispute.created": {
      const dispute = retrievedEvent.data.object;
      console.log("charge.dispute.created", dispute);
      // Then define and call a function to handle the event charge.dispute.created
      break;
    }
    case "charge.dispute.funds_reinstated": {
      const dispute = retrievedEvent.data.object;
      console.log("charge.dispute.funds_reinstated", dispute);
      // Then define and call a function to handle the event charge.dispute.funds_reinstated
      break;
    }
    case "charge.dispute.funds_withdrawn": {
      const dispute = retrievedEvent.data.object;
      console.log("charge.dispute.funds_withdrawn", dispute);
      // Then define and call a function to handle the event charge.dispute.funds_withdrawn
      break;
    }
    case "charge.dispute.updated": {
      const dispute = retrievedEvent.data.object;
      console.log("charge.dispute.updated", dispute);
      // Then define and call a function to handle the event charge.dispute.updated
      break;
    }
    case "charge.refund.updated": {
      const refund = retrievedEvent.data.object;
      console.log("charge.refund.updated", refund);
      // Then define and call a function to handle the event charge.refund.updated
      break;
    }
    case "checkout.session.async_payment_failed": {
      const session = retrievedEvent.data.object;
      console.log("checkout.session.async_payment_failed", session);
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    }
    case "checkout.session.async_payment_succeeded": {
      const session = retrievedEvent.data.object;
      console.log("checkout.session.async_payment_succeeded", session);
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    }
    case "checkout.session.completed": {
      const session = retrievedEvent.data.object;
      console.log("checkout.session.completed", session);
      // Then define and call a function to handle the event checkout.session.completed
      break;
    }
    case "checkout.session.expired": {
      const session = retrievedEvent.data.object;
      console.log("checkout.session.expired", session);
      // Then define and call a function to handle the event checkout.session.expired
      break;
    }
    case "coupon.created": {
      const coupon = retrievedEvent.data.object;
      console.log("coupon.created", coupon);
      // Then define and call a function to handle the event coupon.created
      break;
    }
    case "coupon.deleted": {
      const coupon = retrievedEvent.data.object;
      console.log("coupon.deleted", coupon);
      // Then define and call a function to handle the event coupon.deleted
      break;
    }
    case "coupon.updated": {
      const coupon = retrievedEvent.data.object;
      console.log("coupon.updated", coupon);
      // Then define and call a function to handle the event coupon.updated
      break;
    }
    case "credit_note.created": {
      const creditNote = retrievedEvent.data.object;
      console.log("credit_note.created", creditNote);
      // Then define and call a function to handle the event credit_note.created
      break;
    }
    case "credit_note.updated": {
      const creditNote = retrievedEvent.data.object;
      console.log("credit_note.updated", creditNote);
      // Then define and call a function to handle the event credit_note.updated
      break;
    }
    case "credit_note.voided": {
      const creditNote = retrievedEvent.data.object;
      console.log("credit_note.voided", creditNote);
      // Then define and call a function to handle the event credit_note.voided
      break;
    }
    case "customer.created": {
      const customer = retrievedEvent.data.object;
      console.log("customer.created", customer);
      // Then define and call a function to handle the event customer.created
      break;
    }
    case "customer.deleted": {
      const customer = retrievedEvent.data.object;
      console.log("customer.deleted", customer);
      // Then define and call a function to handle the event customer.deleted
      break;
    }
    case "customer.updated": {
      const customer = retrievedEvent.data.object;
      console.log("customer.updated", customer);
      // Then define and call a function to handle the event customer.updated
      break;
    }
    case "customer.discount.created": {
      const discount = retrievedEvent.data.object;
      console.log("customer.discount.created", discount);
      // Then define and call a function to handle the event customer.discount.created
      break;
    }
    case "customer.discount.deleted": {
      const discount = retrievedEvent.data.object;
      console.log("customer.discount.deleted", discount);
      // Then define and call a function to handle the event customer.discount.deleted
      break;
    }
    case "customer.discount.updated": {
      const discount = retrievedEvent.data.object;
      console.log("customer.discount.updated", discount);
      // Then define and call a function to handle the event customer.discount.updated
      break;
    }
    case "customer.source.created": {
      const source = retrievedEvent.data.object;
      console.log("customer.source.created", source);
      // Then define and call a function to handle the event customer.source.created
      break;
    }
    case "customer.source.deleted": {
      const source = retrievedEvent.data.object;
      console.log("customer.source.deleted", source);
      // Then define and call a function to handle the event customer.source.deleted
      break;
    }
    case "customer.source.expiring": {
      const source = retrievedEvent.data.object;
      console.log("customer.source.expiring", source);
      // Then define and call a function to handle the event customer.source.expiring
      break;
    }
    case "customer.source.updated": {
      const source = retrievedEvent.data.object;
      console.log("customer.source.updated", source);
      // Then define and call a function to handle the event customer.source.updated
      break;
    }
    case "customer.subscription.created": {
      const subscription = retrievedEvent.data.object;
      console.log("customer.subscription.created", subscription);
      // Then define and call a function to handle the event customer.subscription.created
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = retrievedEvent.data.object;
      console.log("customer.subscription.deleted", subscription);
      // Then define and call a function to handle the event customer.subscription.deleted
      break;
    }
    case "customer.subscription.pending_update_applied": {
      const subscription = retrievedEvent.data.object;
      console.log("customer.subscription.pending_update_applied", subscription);
      // Then define and call a function to handle the event customer.subscription.pending_update_applied
      break;
    }
    case "customer.subscription.pending_update_expired": {
      const subscription = retrievedEvent.data.object;
      console.log("customer.subscription.pending_update_expired", subscription);
      // Then define and call a function to handle the event customer.subscription.pending_update_expired
      break;
    }
    case "customer.subscription.trial_will_end": {
      const subscription = retrievedEvent.data.object;
      console.log("customer.subscription.trial_will_end", subscription);
      // Then define and call a function to handle the event customer.subscription.trial_will_end
      break;
    }
    case "customer.subscription.updated": {
      const subscription = retrievedEvent.data.object;
      console.log("customer.subscription.updated", subscription);
      // Then define and call a function to handle the event customer.subscription.updated
      break;
    }
    case "customer.tax_id.created": {
      const taxId = retrievedEvent.data.object;
      console.log("customer.tax_id.created", taxId);
      // Then define and call a function to handle the event customer.tax_id.created
      break;
    }
    case "customer.tax_id.deleted": {
      const taxId = retrievedEvent.data.object;
      console.log("customer.tax_id.deleted", taxId);
      // Then define and call a function to handle the event customer.tax_id.deleted
      break;
    }
    case "customer.tax_id.updated": {
      const taxId = retrievedEvent.data.object;
      console.log("customer.tax_id.updated", taxId);
      // Then define and call a function to handle the event customer.tax_id.updated
      break;
    }
    case "customer_cash_balance_transaction.created": {
      const customerCashBalanceTransaction = retrievedEvent.data.object;
      console.log("customer_cash_balance_transaction.created", customerCashBalanceTransaction);
      // Then define and call a function to handle the event customer_cash_balance_transaction.created
      break;
    }
    case "file.created": {
      const file = retrievedEvent.data.object;
      console.log("file.created", file);
      // Then define and call a function to handle the event file.created
      break;
    }
    case "financial_connections.account.created": {
      const account = retrievedEvent.data.object;
      console.log("financial_connections.account.created", account);
      // Then define and call a function to handle the event financial_connections.account.created
      break;
    }
    case "financial_connections.account.deactivated": {
      const account = retrievedEvent.data.object;
      console.log("financial_connections.account.deactivated", account);
      // Then define and call a function to handle the event financial_connections.account.deactivated
      break;
    }
    case "financial_connections.account.disconnected": {
      const account = retrievedEvent.data.object;
      console.log("financial_connections.account.disconnected", account);
      // Then define and call a function to handle the event financial_connections.account.disconnected
      break;
    }
    case "financial_connections.account.reactivated": {
      const account = retrievedEvent.data.object;
      console.log("financial_connections.account.reactivated", account);
      // Then define and call a function to handle the event financial_connections.account.reactivated
      break;
    }
    case "financial_connections.account.refreshed_balance": {
      const account = retrievedEvent.data.object;
      console.log("financial_connections.account.refreshed_balance", account);
      // Then define and call a function to handle the event financial_connections.account.refreshed_balance
      break;
    }
    case "identity.verification_session.canceled": {
      const verificationSession = retrievedEvent.data.object;
      console.log("identity.verification_session.canceled", verificationSession);
      // Then define and call a function to handle the event identity.verification_session.canceled
      break;
    }
    case "identity.verification_session.created": {
      const verificationSession = retrievedEvent.data.object;
      console.log("identity.verification_session.created", verificationSession);
      // Then define and call a function to handle the event identity.verification_session.created
      break;
    }
    case "identity.verification_session.processing": {
      const verificationSession = retrievedEvent.data.object;
      console.log("identity.verification_session.processing", verificationSession);
      // Then define and call a function to handle the event identity.verification_session.processing
      break;
    }
    case "identity.verification_session.requires_input": {
      const verificationSession = retrievedEvent.data.object;
      console.log("identity.verification_session.requires_input", verificationSession);
      // Then define and call a function to handle the event identity.verification_session.requires_input
      break;
    }
    case "identity.verification_session.verified": {
      const verificationSession = retrievedEvent.data.object;
      console.log("identity.verification_session.verified", verificationSession);
      // Then define and call a function to handle the event identity.verification_session.verified
      break;
    }
    case "invoice.created": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.created", invoice);
      // Then define and call a function to handle the event invoice.created
      break;
    }
    case "invoice.deleted": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.deleted", invoice);
      // Then define and call a function to handle the event invoice.deleted
      break;
    }
    case "invoice.finalization_failed": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.finalization_failed", invoice);
      // Then define and call a function to handle the event invoice.finalization_failed
      break;
    }
    case "invoice.finalized": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.finalized", invoice);
      // Then define and call a function to handle the event invoice.finalized
      break;
    }
    case "invoice.marked_uncollectible": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.marked_uncollectible", invoice);
      // Then define and call a function to handle the event invoice.marked_uncollectible
      break;
    }
    case "invoice.paid": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.paid", invoice);
      // Then define and call a function to handle the event invoice.paid
      break;
    }
    case "invoice.payment_action_required": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.payment_action_required", invoice);
      // Then define and call a function to handle the event invoice.payment_action_required
      break;
    }
    case "invoice.payment_failed": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.payment_failed", invoice);
      // Then define and call a function to handle the event invoice.payment_failed
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.payment_succeeded", invoice);
      // Then define and call a function to handle the event invoice.payment_succeeded
      break;
    }
    case "invoice.sent": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.sent", invoice);
      // Then define and call a function to handle the event invoice.sent
      break;
    }
    case "invoice.upcoming": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.upcoming", invoice);
      // Then define and call a function to handle the event invoice.upcoming
      break;
    }
    case "invoice.updated": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.updated", invoice);
      // Then define and call a function to handle the event invoice.updated
      break;
    }
    case "invoice.voided": {
      const invoice = retrievedEvent.data.object;
      console.log("invoice.voided", invoice);
      // Then define and call a function to handle the event invoice.voided
      break;
    }
    case "invoiceitem.created": {
      const invoiceitem = retrievedEvent.data.object;
      console.log("invoiceitem.created", invoiceitem);
      // Then define and call a function to handle the event invoiceitem.created
      break;
    }
    case "invoiceitem.deleted": {
      const invoiceitem = retrievedEvent.data.object;
      console.log("invoiceitem.deleted", invoiceitem);
      // Then define and call a function to handle the event invoiceitem.deleted
      break;
    }
    case "invoiceitem.updated": {
      const invoiceitem = retrievedEvent.data.object;
      console.log("invoiceitem.updated", invoiceitem);
      // Then define and call a function to handle the event invoiceitem.updated
      break;
    }
    case "issuing_authorization.created": {
      const issuingAuthorization = retrievedEvent.data.object;
      console.log("issuing_authorization.created", issuingAuthorization);
      // Then define and call a function to handle the event issuing_authorization.created
      break;
    }
    case "issuing_authorization.updated": {
      const issuingAuthorization = retrievedEvent.data.object;
      console.log("issuing_authorization.updated", issuingAuthorization);
      // Then define and call a function to handle the event issuing_authorization.updated
      break;
    }
    case "issuing_card.created": {
      const issuingCard = retrievedEvent.data.object;
      console.log("issuing_card.created", issuingCard);
      // Then define and call a function to handle the event issuing_card.created
      break;
    }
    case "issuing_card.updated": {
      const issuingCard = retrievedEvent.data.object;
      console.log("issuing_card.updated", issuingCard);
      // Then define and call a function to handle the event issuing_card.updated
      break;
    }
    case "issuing_cardholder.created": {
      const issuingCardholder = retrievedEvent.data.object;
      console.log("issuing_cardholder.created", issuingCardholder);
      // Then define and call a function to handle the event issuing_cardholder.created
      break;
    }
    case "issuing_cardholder.updated": {
      const issuingCardholder = retrievedEvent.data.object;
      console.log("issuing_cardholder.updated", issuingCardholder);
      // Then define and call a function to handle the event issuing_cardholder.updated
      break;
    }
    case "issuing_dispute.closed": {
      const issuingDispute = retrievedEvent.data.object;
      console.log("issuing_dispute.closed", issuingDispute);
      // Then define and call a function to handle the event issuing_dispute.closed
      break;
    }
    case "issuing_dispute.created": {
      const issuingDispute = retrievedEvent.data.object;
      console.log("issuing_dispute.created", issuingDispute);
      // Then define and call a function to handle the event issuing_dispute.created
      break;
    }
    case "issuing_dispute.funds_reinstated": {
      const issuingDispute = retrievedEvent.data.object;
      console.log("issuing_dispute.funds_reinstated", issuingDispute);
      // Then define and call a function to handle the event issuing_dispute.funds_reinstated
      break;
    }
    case "issuing_dispute.submitted": {
      const issuingDispute = retrievedEvent.data.object;
      console.log("issuing_dispute.submitted", issuingDispute);
      // Then define and call a function to handle the event issuing_dispute.submitted
      break;
    }
    case "issuing_dispute.updated": {
      const issuingDispute = retrievedEvent.data.object;
      console.log("issuing_dispute.updated", issuingDispute);
      // Then define and call a function to handle the event issuing_dispute.updated
      break;
    }
    case "issuing_transaction.created": {
      const issuingTransaction = retrievedEvent.data.object;
      console.log("issuing_transaction.created", issuingTransaction);
      // Then define and call a function to handle the event issuing_transaction.created
      break;
    }
    case "issuing_transaction.updated": {
      const issuingTransaction = retrievedEvent.data.object;
      console.log("issuing_transaction.updated", issuingTransaction);
      // Then define and call a function to handle the event issuing_transaction.updated
      break;
    }
    case "mandate.updated": {
      const mandate = retrievedEvent.data.object;
      console.log("mandate.updated", mandate);
      // Then define and call a function to handle the event mandate.updated
      break;
    }
    case "order.created": {
      const order = retrievedEvent.data.object;
      console.log("order.created", order);
      // Then define and call a function to handle the event order.created
      break;
    }
    case "payment_intent.amount_capturable_updated": {
      const paymentIntent = retrievedEvent.data.object;
      console.log("payment_intent.amount_capturable_updated", paymentIntent);
      // Then define and call a function to handle the event payment_intent.amount_capturable_updated
      break;
    }
    case "payment_intent.canceled": {
      const paymentIntent = retrievedEvent.data.object;
      console.log("payment_intent.canceled", paymentIntent);
      // Then define and call a function to handle the event payment_intent.canceled
      break;
    }
    case "payment_intent.created": {
      const paymentIntent = retrievedEvent.data.object;
      console.log("payment_intent.created", paymentIntent);
      // Then define and call a function to handle the event payment_intent.created
      break;
    }
    case "payment_intent.partially_funded": {
      const paymentIntent = retrievedEvent.data.object;
      console.log("payment_intent.partially_funded", paymentIntent);
      // Then define and call a function to handle the event payment_intent.partially_funded
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = retrievedEvent.data.object;
      console.log("payment_intent.payment_failed", paymentIntent);
      // Then define and call a function to handle the event payment_intent.payment_failed
      break;
    }
    case "payment_intent.processing": {
      const paymentIntent = retrievedEvent.data.object;
      console.log("payment_intent.processing", paymentIntent);
      // Then define and call a function to handle the event payment_intent.processing
      break;
    }
    case "payment_intent.requires_action": {
      const paymentIntent = retrievedEvent.data.object;
      console.log("payment_intent.requires_action", paymentIntent);
      // Then define and call a function to handle the event payment_intent.requires_action
      break;
    }
    case "payment_intent.succeeded": {
      const paymentIntent = retrievedEvent.data.object;
      console.log("payment_intent.succeeded", paymentIntent);
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    }
    case "payment_link.created": {
      const paymentLink = retrievedEvent.data.object;
      console.log("payment_link.created", paymentLink);
      // Then define and call a function to handle the event payment_link.created
      break;
    }
    case "payment_link.updated": {
      const paymentLink = retrievedEvent.data.object;
      console.log("payment_link.updated", paymentLink);
      // Then define and call a function to handle the event payment_link.updated
      break;
    }
    case "payment_method.attached": {
      const paymentMethod = retrievedEvent.data.object;
      console.log("payment_method.attached", paymentMethod);
      // Then define and call a function to handle the event payment_method.attached
      break;
    }
    case "payment_method.automatically_updated": {
      const paymentMethod = retrievedEvent.data.object;
      console.log("payment_method.automatically_updated", paymentMethod);
      // Then define and call a function to handle the event payment_method.automatically_updated
      break;
    }
    case "payment_method.detached": {
      const paymentMethod = retrievedEvent.data.object;
      console.log("payment_method.detached", paymentMethod);
      // Then define and call a function to handle the event payment_method.detached
      break;
    }
    case "payment_method.updated": {
      const paymentMethod = retrievedEvent.data.object;
      console.log("payment_method.updated", paymentMethod);
      // Then define and call a function to handle the event payment_method.updated
      break;
    }
    case "payout.canceled": {
      const payout = retrievedEvent.data.object;
      console.log("payout.canceled", payout);
      // Then define and call a function to handle the event payout.canceled
      break;
    }
    case "payout.created": {
      const payout = retrievedEvent.data.object;
      console.log("payout.created", payout);
      // Then define and call a function to handle the event payout.created
      break;
    }
    case "payout.failed": {
      const payout = retrievedEvent.data.object;
      console.log("payout.failed", payout);
      // Then define and call a function to handle the event payout.failed
      break;
    }
    case "payout.paid": {
      const payout = retrievedEvent.data.object;
      console.log("payout.paid", payout);
      // Then define and call a function to handle the event payout.paid
      break;
    }
    case "payout.updated": {
      const payout = retrievedEvent.data.object;
      console.log("payout.updated", payout);
      // Then define and call a function to handle the event payout.updated
      break;
    }
    case "person.created": {
      const person = retrievedEvent.data.object;
      console.log("person.created", person);
      // Then define and call a function to handle the event person.created
      break;
    }
    case "person.deleted": {
      const person = retrievedEvent.data.object;
      console.log("person.deleted", person);
      // Then define and call a function to handle the event person.deleted
      break;
    }
    case "person.updated": {
      const person = retrievedEvent.data.object;
      console.log("person.updated", person);
      // Then define and call a function to handle the event person.updated
      break;
    }
    case "plan.created": {
      const plan = retrievedEvent.data.object;
      console.log("plan.created", plan);
      // Then define and call a function to handle the event plan.created
      break;
    }
    case "plan.deleted": {
      const plan = retrievedEvent.data.object;
      console.log("plan.deleted", plan);
      // Then define and call a function to handle the event plan.deleted
      break;
    }
    case "plan.updated": {
      const plan = retrievedEvent.data.object;
      console.log("plan.updated", plan);
      // Then define and call a function to handle the event plan.updated
      break;
    }
    case "price.created": {
      const price = retrievedEvent.data.object;
      console.log("price.created", price);
      // Then define and call a function to handle the event price.created
      break;
    }
    case "price.deleted": {
      const price = retrievedEvent.data.object;
      console.log("price.deleted", price);
      // Then define and call a function to handle the event price.deleted
      break;
    }
    case "price.updated": {
      const price = retrievedEvent.data.object;
      console.log("price.updated", price);
      // Then define and call a function to handle the event price.updated
      break;
    }
    case "product.created": {
      const product = retrievedEvent.data.object;
      console.log("product.created", product);
      // Then define and call a function to handle the event product.created
      break;
    }
    case "product.deleted": {
      const product = retrievedEvent.data.object;
      console.log("product.deleted", product);
      // Then define and call a function to handle the event product.deleted
      break;
    }
    case "product.updated": {
      const product = retrievedEvent.data.object;
      console.log("product.updated", product);
      // Then define and call a function to handle the event product.updated
      break;
    }
    case "promotion_code.created": {
      const promotionCode = retrievedEvent.data.object;
      console.log("promotion_code.created", promotionCode);
      // Then define and call a function to handle the event promotion_code.created
      break;
    }
    case "promotion_code.updated": {
      const promotionCode = retrievedEvent.data.object;
      console.log("promotion_code.updated", promotionCode);
      // Then define and call a function to handle the event promotion_code.updated
      break;
    }
    case "quote.accepted": {
      const quote = retrievedEvent.data.object;
      console.log("quote.accepted", quote);
      // Then define and call a function to handle the event quote.accepted
      break;
    }
    case "quote.canceled": {
      const quote = retrievedEvent.data.object;
      console.log("quote.canceled", quote);
      // Then define and call a function to handle the event quote.canceled
      break;
    }
    case "quote.created": {
      const quote = retrievedEvent.data.object;
      console.log("quote.created", quote);
      // Then define and call a function to handle the event quote.created
      break;
    }
    case "quote.finalized": {
      const quote = retrievedEvent.data.object;
      console.log("quote.finalized", quote);
      // Then define and call a function to handle the event quote.finalized
      break;
    }
    case "radar.early_fraud_warning.created": {
      const earlyFraudWarning = retrievedEvent.data.object;
      console.log("radar.early_fraud_warning.created", earlyFraudWarning);
      // Then define and call a function to handle the event radar.early_fraud_warning.created
      break;
    }
    case "radar.early_fraud_warning.updated": {
      const earlyFraudWarning = retrievedEvent.data.object;
      console.log("radar.early_fraud_warning.updated", earlyFraudWarning);
      // Then define and call a function to handle the event radar.early_fraud_warning.updated
      break;
    }
    case "recipient.created": {
      const recipient = retrievedEvent.data.object;
      console.log("recipient.created", recipient);
      // Then define and call a function to handle the event recipient.created
      break;
    }
    case "recipient.deleted": {
      const recipient = retrievedEvent.data.object;
      console.log("recipient.deleted", recipient);
      // Then define and call a function to handle the event recipient.deleted
      break;
    }
    case "recipient.updated": {
      const recipient = retrievedEvent.data.object;
      console.log("recipient.updated", recipient);
      // Then define and call a function to handle the event recipient.updated
      break;
    }
    case "reporting.report_run.failed": {
      const reportRun = retrievedEvent.data.object;
      console.log("reporting.report_run.failed", reportRun);
      // Then define and call a function to handle the event reporting.report_run.failed
      break;
    }
    case "reporting.report_run.succeeded": {
      const reportRun = retrievedEvent.data.object;
      console.log("reporting.report_run.succeeded", reportRun);
      // Then define and call a function to handle the event reporting.report_run.succeeded
      break;
    }
    case "review.closed": {
      const review = retrievedEvent.data.object;
      console.log("review.closed", review);
      // Then define and call a function to handle the event review.closed
      break;
    }
    case "review.opened": {
      const review = retrievedEvent.data.object;
      console.log("review.opened", review);
      // Then define and call a function to handle the event review.opened
      break;
    }
    case "setup_intent.canceled": {
      const setupIntent = retrievedEvent.data.object;
      console.log("setup_intent.canceled", setupIntent);
      // Then define and call a function to handle the event setup_intent.canceled
      break;
    }
    case "setup_intent.created": {
      const setupIntent = retrievedEvent.data.object;
      console.log("setup_intent.created", setupIntent);
      // Then define and call a function to handle the event setup_intent.created
      break;
    }
    case "setup_intent.requires_action": {
      const setupIntent = retrievedEvent.data.object;
      console.log("setup_intent.requires_action", setupIntent);
      // Then define and call a function to handle the event setup_intent.requires_action
      break;
    }
    case "setup_intent.setup_failed": {
      const setupIntent = retrievedEvent.data.object;
      console.log("setup_intent.setup_failed", setupIntent);
      // Then define and call a function to handle the event setup_intent.setup_failed
      break;
    }
    case "setup_intent.succeeded": {
      const setupIntent = retrievedEvent.data.object;
      console.log("setup_intent.succeeded", setupIntent);
      // Then define and call a function to handle the event setup_intent.succeeded
      break;
    }
    case "sigma.scheduled_query_run.created": {
      const scheduledQueryRun = retrievedEvent.data.object;
      console.log("sigma.scheduled_query_run.created", scheduledQueryRun);
      // Then define and call a function to handle the event sigma.scheduled_query_run.created
      break;
    }
    case "sku.created": {
      const sku = retrievedEvent.data.object;
      console.log("sku.created", sku);
      // Then define and call a function to handle the event sku.created
      break;
    }
    case "sku.deleted": {
      const sku = retrievedEvent.data.object;
      console.log("sku.deleted", sku);
      // Then define and call a function to handle the event sku.deleted
      break;
    }
    case "sku.updated": {
      const sku = retrievedEvent.data.object;
      console.log("sku.updated", sku);
      // Then define and call a function to handle the event sku.updated
      break;
    }
    case "source.canceled": {
      const source = retrievedEvent.data.object;
      console.log("source.canceled", source);
      // Then define and call a function to handle the event source.canceled
      break;
    }
    case "source.chargeable": {
      const source = retrievedEvent.data.object;
      console.log("source.chargeable", source);
      // Then define and call a function to handle the event source.chargeable
      break;
    }
    case "source.failed": {
      const source = retrievedEvent.data.object;
      console.log("source.failed", source);
      // Then define and call a function to handle the event source.failed
      break;
    }
    case "source.mandate_notification": {
      const source = retrievedEvent.data.object;
      console.log("source.mandate_notification", source);
      // Then define and call a function to handle the event source.mandate_notification
      break;
    }
    case "source.refund_attributes_required": {
      const source = retrievedEvent.data.object;
      console.log("source.refund_attributes_required", source);
      // Then define and call a function to handle the event source.refund_attributes_required
      break;
    }
    case "source.transaction.created": {
      const transaction = retrievedEvent.data.object;
      console.log("source.transaction.created", transaction);
      // Then define and call a function to handle the event source.transaction.created
      break;
    }
    case "source.transaction.updated": {
      const transaction = retrievedEvent.data.object;
      console.log("source.transaction.updated", transaction);
      // Then define and call a function to handle the event source.transaction.updated
      break;
    }
    case "subscription_schedule.aborted": {
      const subscriptionSchedule = retrievedEvent.data.object;
      console.log("subscription_schedule.aborted", subscriptionSchedule);
      // Then define and call a function to handle the event subscription_schedule.aborted
      break;
    }
    case "subscription_schedule.canceled": {
      const subscriptionSchedule = retrievedEvent.data.object;
      console.log("subscription_schedule.canceled", subscriptionSchedule);
      // Then define and call a function to handle the event subscription_schedule.canceled
      break;
    }
    case "subscription_schedule.completed": {
      const subscriptionSchedule = retrievedEvent.data.object;
      console.log("subscription_schedule.completed", subscriptionSchedule);
      // Then define and call a function to handle the event subscription_schedule.completed
      break;
    }
    case "subscription_schedule.created": {
      const subscriptionSchedule = retrievedEvent.data.object;
      console.log("subscription_schedule.created", subscriptionSchedule);
      // Then define and call a function to handle the event subscription_schedule.created
      break;
    }
    case "subscription_schedule.expiring": {
      const subscriptionSchedule = retrievedEvent.data.object;
      console.log("subscription_schedule.expiring", subscriptionSchedule);
      // Then define and call a function to handle the event subscription_schedule.expiring
      break;
    }
    case "subscription_schedule.released": {
      const subscriptionSchedule = retrievedEvent.data.object;
      console.log("subscription_schedule.released", subscriptionSchedule);
      // Then define and call a function to handle the event subscription_schedule.released
      break;
    }
    case "subscription_schedule.updated": {
      const subscriptionSchedule = retrievedEvent.data.object;
      console.log("subscription_schedule.updated", subscriptionSchedule);
      // Then define and call a function to handle the event subscription_schedule.updated
      break;
    }
    case "tax_rate.created": {
      const taxRate = retrievedEvent.data.object;
      console.log("tax_rate.created", taxRate);
      // Then define and call a function to handle the event tax_rate.created
      break;
    }
    case "tax_rate.updated": {
      const taxRate = retrievedEvent.data.object;
      console.log("tax_rate.updated", taxRate);
      // Then define and call a function to handle the event tax_rate.updated
      break;
    }
    case "terminal.reader.action_failed": {
      const reader = retrievedEvent.data.object;
      console.log("terminal.reader.action_failed", reader);
      // Then define and call a function to handle the event terminal.reader.action_failed
      break;
    }
    case "terminal.reader.action_succeeded": {
      const reader = retrievedEvent.data.object;
      console.log("terminal.reader.action_succeeded", reader);
      // Then define and call a function to handle the event terminal.reader.action_succeeded
      break;
    }
    case "test_helpers.test_clock.advancing": {
      const testClock = retrievedEvent.data.object;
      console.log("test_helpers.test_clock.advancing", testClock);
      // Then define and call a function to handle the event test_helpers.test_clock.advancing
      break;
    }
    case "test_helpers.test_clock.created": {
      const testClock = retrievedEvent.data.object;
      console.log("test_helpers.test_clock.created", testClock);
      // Then define and call a function to handle the event test_helpers.test_clock.created
      break;
    }
    case "test_helpers.test_clock.deleted": {
      const testClock = retrievedEvent.data.object;
      console.log("test_helpers.test_clock.deleted", testClock);
      // Then define and call a function to handle the event test_helpers.test_clock.deleted
      break;
    }
    case "test_helpers.test_clock.internal_failure": {
      const testClock = retrievedEvent.data.object;
      console.log("test_helpers.test_clock.internal_failure", testClock);
      // Then define and call a function to handle the event test_helpers.test_clock.internal_failure
      break;
    }
    case "test_helpers.test_clock.ready": {
      const testClock = retrievedEvent.data.object;
      console.log("test_helpers.test_clock.ready", testClock);
      // Then define and call a function to handle the event test_helpers.test_clock.ready
      break;
    }
    case "topup.canceled": {
      const topup = retrievedEvent.data.object;
      console.log("topup.canceled", topup);
      // Then define and call a function to handle the event topup.canceled
      break;
    }
    case "topup.created": {
      const topup = retrievedEvent.data.object;
      console.log("topup.created", topup);

      // Then define and call a function to handle the event topup.created
      break;
    }
    case "topup.failed": {
      const topup = retrievedEvent.data.object;
      console.log("topup.failed", topup);
      // Then define and call a function to handle the event topup.failed
      break;
    }
    case "topup.reversed": {
      const topup = retrievedEvent.data.object;
      console.log("topup.reversed", topup);
      // Then define and call a function to handle the event topup.reversed
      break;
    }
    case "topup.succeeded": {
      const topup = retrievedEvent.data.object;
      console.log("topup.succeeded", topup);
      // Then define and call a function to handle the event topup.succeeded
      break;
    }
    case "transfer.created": {
      const transfer = retrievedEvent.data.object;
      console.log("transfer.created", transfer);
      // Then define and call a function to handle the event transfer.created
      break;
    }
    case "transfer.reversed": {
      const transfer = retrievedEvent.data.object;
      console.log("transfer.reversed", transfer);
      // Then define and call a function to handle the event transfer.reversed
      break;
    }
    case "transfer.updated": {
      const transfer = retrievedEvent.data.object;
      console.log("transfer.updated", transfer);
      // Then define and call a function to handle the event transfer.updated
      break;
    }
    case "order.canceled": {
      const order = retrievedEvent.data.object;
      console.log("order.canceled", order);
      // Then define and call a function to handle the event order.canceled
      break;
    }
    case "order.completed": {
      const order = retrievedEvent.data.object;
      console.log("order.completed", order);
      // Then define and call a function to handle the event order.completed
      break;
    }
    case "order.inventory_reservation_expired": {
      const order = retrievedEvent.data.object;
      console.log("order.inventory_reservation_expired", order);
      // Then define and call a function to handle the event order.inventory_reservation_expired
      break;
    }
    case "order.payment_completed": {
      const order = retrievedEvent.data.object;
      console.log("order.payment_completed", order);
      // Then define and call a function to handle the event order.payment_completed
      break;
    }
    case "order.processing": {
      const order = retrievedEvent.data.object;
      console.log("order.processing", order);
      // Then define and call a function to handle the event order.processing
      break;
    }
    case "order.reopened": {
      const order = retrievedEvent.data.object;
      console.log("order.reopened", order);
      // Then define and call a function to handle the event order.reopened
      break;
    }
    case "order.submitted": {
      const order = retrievedEvent.data.object;
      console.log("order.submitted", order);
      // Then define and call a function to handle the event order.submitted
      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${retrievedEvent.type}`);
  }
  return new Response("Hello World");
};

serve(handler);
