# HisabPay Phase 4 release gates

**Release status: BLOCKED — do not enable statutory payroll or live disbursements.**

## Authorization
- Database-level simulated unauthorized-user invitation creation rejected.
- Database-level unauthorized payroll and invitation reads returned no rows.
- Required before release: three separate verified test accounts and business fixture; test preparer/reviewer/approver happy path, self-approval rejection, cross-business denial, revoked/expired/wrong-email invitation rejection, and concurrent approval race.
- Production database currently has no business or payroll-run records; no real multi-user approval flow has been exercised.

## Build
- GitHub Actions CI workflow added to run `npm run build` on push and PR.
- No successful CI run or local production build evidence obtained in this session. Verify build and fix failures before approval.
- Dependency lockfile absent from repository; create and commit a reviewed lockfile and change CI to `npm ci` for reproducibility.

## Invitations
- Database implements single-use hashed invitation tokens, seven-day expiry, verified-email matching, owner revocation, and role assignment on acceptance.
- Client invitation creation and acceptance pages implemented.
- Automated delivery is not enabled: configure a HisabPay-owned transactional email provider, server-side delivery function, and delivery/bounce logs. Never place mail API secrets in NEXT_PUBLIC variables or client code.

## Ethiopian statutory payroll
- Draft tax/pension rules are marked `pending_legal_review` and are not applied automatically.
- Require an Ethiopian qualified accountant/legal reviewer to confirm authoritative proclamation text, effective dates, employment classification, taxable allowances, pension base, withholding calculation, rounding, and statutory filings. Record signed approval and versioned calculation test vectors.
- No AI, automated test, or software deployment substitutes for professional sign-off.

## Security advisor
- Re-run Supabase security advisors before release; review public authenticated SECURITY DEFINER RPC exposure and enable leaked-password protection where available.

## Deployment
- No deployment authorization implied by this document. Never activate real-money transfers until separate financial compliance, integration, and reconciliation checks pass.
