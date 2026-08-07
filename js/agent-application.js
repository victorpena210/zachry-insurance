// ============================
// AGENT APPLICATION FORM
// ============================

const agentApplicationForm =
    document.getElementById("agentApplicationForm");

const applicationMessage =
    document.getElementById("applicationMessage");

if (agentApplicationForm) {
    agentApplicationForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const submitButton =
            agentApplicationForm.querySelector('button[type="submit"]');

        applicationMessage.textContent = "";
        applicationMessage.classList.remove("success", "error");

        if (typeof window.getContactConsent !== "function") {
            console.error("Application consent helper is unavailable.");
            applicationMessage.textContent =
                "The form could not verify your contact permission. Please refresh the page and try again.";
            applicationMessage.classList.add("error");
            return;
        }

        const consent = window.getContactConsent({
            container: agentApplicationForm,
            checkboxId: "applicationContactConsent"
        });

        if (!consent) {
            applicationMessage.textContent =
                "Please agree to the contact permission before submitting.";
            applicationMessage.classList.add("error");
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        applicationMessage.textContent = "Submitting application...";

        const userNotes =
            document.getElementById("notes").value.trim();

        const consentRecord = [
            "Contact consent: yes",
            `Consent version: ${consent.contact_consent_version}`,
            `Consent text: ${consent.contact_consent_text}`,
            `Consent page: ${consent.contact_consent_page}`,
            `Consent recorded at: ${new Date().toISOString()}`
        ].join(" | ");

        const applicationData = {
            application_source: "Post-call Agent Application",
            first_name:
                document.getElementById("firstName").value.trim(),
            last_name:
                document.getElementById("lastName").value.trim(),
            email:
                document.getElementById("email").value.trim(),
            phone:
                document.getElementById("phone").value.trim(),
            city:
                document.getElementById("city").value.trim(),
            state:
                document.getElementById("state").value.trim(),
            licensed:
                document.getElementById("licensed").value,
            npn:
                document.getElementById("npn").value.trim() || null,
            experience:
                document.getElementById("experience").value,
            availability:
                document.getElementById("availability").value,
            why_interested:
                document.getElementById("whyInterested").value.trim(),
            goals:
                document.getElementById("goals").value.trim() || null,
            notes: userNotes
                ? `${userNotes}\n\n${consentRecord}`
                : consentRecord,
            status: "Submitted"
        };

        try {
            const { error } = await window.supabaseClient
                .from("agent_applications")
                .insert([applicationData]);

            if (error) {
                throw error;
            }

            applicationMessage.textContent =
                "Application submitted successfully. Clay will review it and follow up with you.";
            applicationMessage.classList.add("success");

            agentApplicationForm.reset();
        } catch (error) {
            console.error("Application submission error:", error);

            applicationMessage.textContent =
                "Something went wrong. Please try again or contact Clay directly.";
            applicationMessage.classList.add("error");
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Application";
            }
        }
    });
}
