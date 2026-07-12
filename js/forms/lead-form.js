// ============================
// HOMEPAGE LEAD FORM
// ============================

const leadForm = document.getElementById("leadForm");

if (leadForm) {
    const getValue = (id) => {
        const value = document.getElementById(id)?.value?.trim();
        return value || null;
    };

    leadForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const insuranceStatus = getValue("insuranceStatus");
        const hasExistingInsurance = insuranceStatus === "yes";

        const contactMethod =
            leadForm.querySelector(
                'input[name="contactMethod"]:checked'
            )?.value || null;

        const { error } = await saveLead({
            lead_source: "Website",

            first_name: getValue("firstName"),
            last_name: getValue("lastName"),
            email: getValue("email"),
            phone: getValue("phone"),

            dob: getValue("dob"),
            state: getValue("state"),
            zip_code: getValue("zipCode"),
            lead_type: getValue("leadType"),

            insurance_status: insuranceStatus,

            current_company:
                hasExistingInsurance
                    ? getValue("currentCompany")
                    : null,

            current_premium:
                hasExistingInsurance
                    ? getValue("currentPremium")
                    : null,

            current_coverage:
                hasExistingInsurance
                    ? getValue("currentCoverage")
                    : null,

            years_with_policy:
                hasExistingInsurance
                    ? getValue("yearsWithPolicy")
                    : null,

            policy_type:
                hasExistingInsurance
                    ? getValue("policyType")
                    : null,

            review_reason:
                hasExistingInsurance
                    ? getValue("reviewReason")
                    : null,

            review_trigger:
                hasExistingInsurance
                    ? getValue("reviewTrigger")
                    : null,

            marital_status: getValue("maritalStatus"),
            has_children: getValue("hasChildren"),
            tobacco_use: getValue("tobaccoUse"),
            contact_method: contactMethod,
            best_contact_time: getValue("bestContactTime"),
            comments: getValue("comments")
        });

        if (error) {
            console.error("Supabase Error:", error);
            alert("Error: " + error.message);
            return;
        }

        alert("Lead saved successfully!");

        leadForm.reset();

        document
            .getElementById("existingFields")
            ?.classList.add("hidden");
    });
}