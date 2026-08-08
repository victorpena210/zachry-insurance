# zachry-insurance

## August 7, 2026 site hardening update

This build adds:

- Accessible labels/autocomplete metadata to the careers form.
- GA4 conversion events for career-interest submissions and agent applications.
- GA4 tracking for Calendly scheduling clicks.
- Clay Christian Zachry on the Our Team page.
- A working office-contact fallback on Shane Stuart's profile until his direct number is available.
- Synchronized structured-data review dates.
- A client testimonial submission workflow at `/share-your-experience`.
- Homepage rendering of approved testimonials only.
- `supabase-security-and-testimonials.sql` for Row Level Security and the testimonial table.

### Required Supabase step

Before the testimonial form can save submissions, open Supabase -> SQL Editor and run `supabase-security-and-testimonials.sql` once. Review the SQL first. After that, Clay can approve testimonials in Table Editor by changing `status` from `pending` to `approved`; approved testimonials will automatically appear on the homepage.
