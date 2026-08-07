// ============================
// HOMEPAGE LEAD FORM
// ============================

const leadForm = document.getElementById("leadForm");
const successMessage = document.getElementById("success");
const formErrorMessage = document.getElementById("formError");

if (leadForm) {

    const getValue = (id) => {
        const value = document
            .getElementById(id)
            ?.value
            ?.trim();

        return value || null;
    };

    const showFormError = (message) => {
        if (successMessage) {
            successMessage.classList.add("hidden");
        }

        if (formErrorMessage) {
            formErrorMessage.textContent = message;
            formErrorMessage.classList.remove("hidden");
            formErrorMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    };

    const clearFormMessages = () => {
        successMessage?.classList.add("hidden");
        formErrorMessage?.classList.add("hidden");
    };

        // ============================
    // LEAD FORM START TRACKING
    // ============================

    let leadFormStarted = false;

    const trackLeadFormStart = () => {

        if (leadFormStarted) {
            return;
        }

        leadFormStarted = true;

        window.trackGaEvent?.(
            "lead_form_start",
            {
                form_name: "homepage_lead_form",
                page_path: window.location.pathname
            }
        );

    };

    leadForm.addEventListener(
        "input",
        trackLeadFormStart
    );

    leadForm.addEventListener(
        "change",
        trackLeadFormStart
    );

    leadForm.addEventListener("submit", async function (event) {

        event.preventDefault();
        clearFormMessages();

        const submitButton =
            leadForm.querySelector('button[type="submit"]');

        if (typeof window.getContactConsent !== "function") {
            console.error(
                "Consent helper is unavailable. Make sure consent.js loads before lead-form.js."
            );

            showFormError(
                "The form could not verify your contact permission. Please refresh the page and try again."
            );
            return;
        }

        const consent = window.getContactConsent({
            container: leadForm,
            checkboxId: "contactConsent"
        });

        if (!consent) {
            showFormError(
                "Please agree to the contact permission before submitting."
            );
            return;
        }

        const fullName = getValue("fullName");
        const nameParts = fullName ? fullName.split(/\s+/) : [];
        const firstName = nameParts.shift() || null;
        const lastName = nameParts.length > 0
            ? nameParts.join(" ")
            : null;

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
                ...consent
            });

            if (error) {
                throw error;
            }

            // ============================
            // SUCCESSFUL LEAD CONVERSION
            // ============================

            window.trackGaEvent?.(
                "generate_lead",
                {
                    lead_source: "Website",
                    form_name: "homepage_lead_form",
                    page_path: window.location.pathname
                }
            );

            leadForm.reset();

            if (successMessage) {
                successMessage.classList.remove("hidden");
                successMessage.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        } catch (error) {
            console.error("Supabase lead form error:", error);
            showFormError(
                "We could not send your request. Please try again or contact Clay directly."
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Request a Call";
            }
        }
    });
}
