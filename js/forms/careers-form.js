// ============================
// CAREERS / RECRUITING FORM
// ============================

function getRecruitingLeadSource() {
    const params = new URLSearchParams(window.location.search);
    const source = params.get("source");

    if (!source) {
        return "Careers Page";
    }

    return "Recruiting SEO - " +
        source
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
}

const recruitingForm = document.getElementById("recruitingForm");
const careerSuccess = document.getElementById("careerSuccess");
const careerError = document.getElementById("careerError");

function showCareerError(message) {
    careerSuccess?.classList.add("hidden");

    if (careerError) {
        careerError.textContent = message;
        careerError.classList.remove("hidden");
        careerError.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}

if (recruitingForm) {
    let recruitingFormStarted = false;

    const trackRecruitingFormStart = () => {
        if (recruitingFormStarted) return;
        recruitingFormStarted = true;

        window.trackGaEvent?.("lead_form_start", {
            form_name: "career_interest_form",
            lead_source: getRecruitingLeadSource(),
            page_path: window.location.pathname
        });
    };

    recruitingForm.addEventListener("input", trackRecruitingFormStart);
    recruitingForm.addEventListener("change", trackRecruitingFormStart);

    recruitingForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        careerSuccess?.classList.add("hidden");
        careerError?.classList.add("hidden");

        const submitButton =
            recruitingForm.querySelector("button[type='submit']");

        if (typeof window.getContactConsent !== "function") {
            console.error("Career consent helper is unavailable.");
            showCareerError(
                "The form could not verify your contact permission. Please refresh the page and try again."
            );
            return;
        }

        const consent = window.getContactConsent({
            container: recruitingForm,
            checkboxId: "careerContactConsent"
        });

        if (!consent) {
            showCareerError(
                "Please agree to the contact permission before submitting."
            );
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        const userMessage =
            document.getElementById("careerMessage").value.trim();

        const consentRecord = [
            "Contact consent: yes",
            `Consent version: ${consent.contact_consent_version}`,
            `Consent text: ${consent.contact_consent_text}`,
            `Consent page: ${consent.contact_consent_page}`,
            `Consent recorded at: ${new Date().toISOString()}`
        ].join(" | ");

        const careerLead = {
            lead_source: getRecruitingLeadSource(),
            first_name:
                document.getElementById("careerFirstName").value.trim(),
            last_name:
                document.getElementById("careerLastName").value.trim(),
            email:
                document.getElementById("careerEmail").value.trim(),
            phone:
                document.getElementById("careerPhone").value.trim(),
            state:
                document.getElementById("careerState").value.trim(),
            zip_code:
                document.getElementById("careerZip").value.trim() || null,
            license_status:
                document.getElementById("licenseStatus").value,
            experience_level:
                document.getElementById("experienceLevel").value,
            message: userMessage
                ? `${userMessage}\n\n${consentRecord}`
                : consentRecord,
            status: "New"
        };

        try {
            const { error } = await window.supabaseClient
                .from("recruiting_leads")
                .insert([careerLead]);

            if (error) {
                throw error;
            }

            window.trackGaEvent?.("generate_lead", {
                lead_source: getRecruitingLeadSource(),
                form_name: "career_interest_form",
                lead_type: "Recruiting",
                page_path: window.location.pathname
            });

            recruitingForm.reset();

            if (careerSuccess) {
                careerSuccess.classList.remove("hidden");
                careerSuccess.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        } catch (error) {
            console.error("Supabase recruiting error:", error);
            showCareerError(
                "We could not submit your career interest. Please try again or contact Clay directly."
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Career Interest";
            }
        }
    });
}
