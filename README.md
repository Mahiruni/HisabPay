# HisabPay

Ethiopian business payments and payroll disbursement platform. **Not an ERP.**

## Phase 1 scope
- Business onboarding and role-based membership
- Bank/mobile-wallet beneficiaries
- ETB salary and bulk payment batches
- Maker/checker approval workflows (planned)
- Reconciliation and provider adapters (planned)

## Backend
Dedicated Supabase project: `marvsyzskpavnywtdnpt`.

### Current database foundation
Tables: `businesses`, `business_members`, `beneficiaries`, `payment_batches`, `payment_items`.

The initial Supabase migration has been applied to the dedicated project. RLS is enabled on every public table. Business membership is checked for reads; direct client writes to beneficiaries, batches, and payment items are deliberately disabled pending server-side authorization and approval implementation. Creating a business automatically assigns its creator the owner membership.

### Financial safety
- No live disbursement or payment provider integration is enabled.
- Never place service-role credentials in frontend code or git.
- Amounts are stored in integer minor units (ETB cents).
- A payment batch's idempotency key is unique per business.
- Do not interpret a batch marked approved as a completed bank transfer.

## Next engineering milestones
1. Implement Supabase authentication and onboarding UI.
2. Implement server-validated beneficiary creation and draft batch APIs.
3. Add maker/checker authorization, audit log and immutable approval history.
4. Integrate payment provider sandbox and webhook signature verification.
5. Implement reconciliation and production release security tests.

No bank credentials or customer data belong in this repository.
