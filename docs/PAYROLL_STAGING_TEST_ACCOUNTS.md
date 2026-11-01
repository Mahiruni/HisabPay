# HisabPay isolated authorization-test accounts

Do not use real employees, personal email addresses, salary records, or live bank accounts.

## Required identities
Create four distinct verified accounts in a **dedicated staging Supabase project**, not the existing production auth tenant:
- Owner: owns the fictional staging business and sends three invitations.
- Preparer: creates a fictional payroll run and its lines.
- Reviewer: reviews that run, but cannot approve their own review.
- Approver: approves the reviewed run, but cannot create/review that run.

Use controlled inboxes on a domain owned by the testing organization, not invented addresses or third-party inboxes. Do not create accounts until a staging Supabase project and controlled inboxes are provisioned.

## Test cases
1. Owner sends an invite for each role; correct verified account accepts once; reuse fails.
2. Wrong-email, expired, and revoked invitations fail.
3. Preparer creates draft, edits lines; reviewer cannot edit draft lines.
4. Preparer cannot review; reviewer reviews; reviewer cannot approve; approver approves.
5. Approver cannot approve draft or approve twice.
6. Cross-business account cannot read or modify other business payroll or invitations.
7. Concurrent approval attempts produce one approval/audit event.
8. Test records contain synthetic ETB figures only; no disbursement integration is enabled.

## SMTP staging setup
Hostinger mailbox discovered: `mahir@hisabtech.com`. It is a real existing mailbox; do not use it to send test invitations until an authorized controlled recipient is selected.
Server environment (never NEXT_PUBLIC): `HISABPAY_SMTP_USER`, `HISABPAY_SMTP_PASSWORD` (dedicated app password), `HISABPAY_APP_URL`. SMTP host: `smtp.hostinger.com`, TLS port 465. The API uses a signed-in Supabase access token and sends only after an owner-authorized invitation RPC.
SMTP credential provisioning and deliverability tests remain blocked until the mailbox app password is supplied through the secret manager. Do not commit credentials.

## Release evidence
Attach CI build log, authenticated staging E2E results, email delivery evidence, security advisor results, and Ethiopian accountant/legal statutory sign-off. Until then: release blocked.
