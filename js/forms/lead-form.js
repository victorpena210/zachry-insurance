// ============================
// HOMEPAGE LEAD FORM
// ============================

const leadForm = document.getElementById("leadForm");
const successMessage = document.getElementById("success");

if (leadForm) {

    const getValue = (id) => {
        const value = document
            .getElementById(id)
            ?.value
            ?.trim();

        return value || null;
    };

    leadForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            leadForm.querySelector('button[type="submit"]');

        /*
         * Make sure the shared consent helper loaded correctly.
         */
        if (typeof window.getContactConsent !== "function") {

            console.error(
                "Consent helper is unavailable. " +
                "Make sure consent.js loads before lead-form.js."
            );

            alert(
                "The form could not verify your contact permission. " +
                "Please refresh the page and try again."
            );

            return;
        }

        /*
         * Read the required homepage consent checkbox and
         * create the consent information that will be saved.
         */
        const consent =
            window.getContactConsent({
                container: leadForm,
                checkboxId: "contactConsent"
            });

        if (!consent) {

            alert(
                "Please agree to the contact permission " +
                "before submitting."
            );

            return;
        }

        const fullName = getValue("fullName");

        /*
         * Split the full-name field so the form can continue
         * using the existing first_name and last_name columns
         * in Supabase.
         */
        const nameParts = fullName
            ? fullName.split(/\s+/)
            : [];

        const firstName =
            nameParts.shift() || null;

        const lastName =
            nameParts.length > 0
                ? nameParts.join(" ")
                : null;

        /*
         * Only disable the button after validation succeeds.
         */
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {

            const { error } = await saveLead({

                lead_source: "Website",

                first_name: firstName,
                last_name: lastName,

                email: getValue("email"),
                phone: getValue("phone"),
                state: getValue("state"),
                lead_type: getValue("leadType"),

                /*
                 * Adds:
                 * contact_consent
                 * contact_consent_version
                 * contact_consent_text
                 * contact_consent_page
                 *
                 * Supabase generates contact_consent_at.
                 */
                ...consent

            });

            if (error) {
                throw error;
            }

            leadForm.reset();

            if (successMessage) {

                successMessage.classList.remove("hidden");

                successMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        } catch (error) {

            console.error(
                "Supabase lead form error:",
                error
            );

            alert(
                "We could not send your request. " +
                "Please try again or contact Clay directly."
            );

        } finally {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Request a Call";
            }

        }

    });

}