# HisabPay authentication email setup

These are production-oriented **HTML email templates** for Supabase Auth. They are version-controlled designs, **not automatically installed** in the Supabase Auth service.

## Required Supabase configuration

1. Open [HisabPay Supabase Auth URL Configuration](https://supabase.com/dashboard/project/marvsyzskpavnywtdnpt/auth/url-configuration).
2. Set Site URL to `https://hisabpay-gulitshop.vercel.app`.
3. Add `https://hisabpay-gulitshop.vercel.app/auth` to the Redirect URL allow list. If `hisabpay-kappa.vercel.app` is also an intended official entry point, add its exact `/auth` redirect too.
4. In [Auth Email Templates](https://supabase.com/dashboard/project/marvsyzskpavnywtdnpt/auth/templates), paste the corresponding HTML from `email-templates/confirmation.html`, `email-templates/recovery.html`, and `email-templates/magic-link.html` into the Confirm signup, Reset password, and Magic link templates. Choose matching subjects. Preserve `{{ .ConfirmationURL }}` exactly.
5. Configure and verify a custom SMTP provider and domain authentication (SPF/DKIM/DMARC) for reliable delivery. Supabase's default mail service may have delivery/rate limits and is not a production mail service.
6. Keep email confirmation enabled. Review auth rate limits and enable CAPTCHA/bot protection where appropriate. Never put service-role keys in client code.
7. Test with a newly registered email: sign up → receive email → click verification → session established; reset password → email → new password; sign out → sign in; invalid/expired links; spam folder and mobile clients.

**Status:** UI and template files are committed. Actual Auth email template installation, SMTP configuration, redirect allow list and inbox delivery remain to be verified in the Supabase dashboard. No test email was sent by this repository change.
