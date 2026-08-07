// ============================
// SHARED CONTACT CONSENT RECORD
// ============================

const CONTACT_CONSENT_VERSION = "2026-08-06-v1";

window.getContactConsent = function ({
    container,
    checkboxId
}) {

    const checkbox =
        document.getElementById(checkboxId);

    if (!checkbox || !checkbox.checked) {
        return null;
    }

    const consentTextElement =
        container.querySelector("[data-consent-text]");

    const consentText =
        consentTextElement
            ?.textContent
            ?.replace(/\s+/g, " ")
            ?.trim();

    if (!consentText) {
        console.error(
            "The displayed consent wording could not be found."
        );

        return null;
    }

    return {
        contact_consent: true,
        contact_consent_version:
            CONTACT_CONSENT_VERSION,

        contact_consent_text:
            consentText,

        contact_consent_page:
            window.location.pathname || "/"
    };

};