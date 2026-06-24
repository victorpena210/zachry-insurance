// ============================
// HOMEPAGE LEAD FORM
// ============================

const leadForm = document.getElementById("leadForm");

if (leadForm) {

    leadForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const inputs =
            document.querySelectorAll("#leadForm input");

        const firstName = inputs[0].value;
        const lastName = inputs[1].value;
        const email = inputs[2].value;
        const phone = inputs[3].value;

        const { data, error } =
            await saveLead({
                lead_source: "Website",

                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,

                dob:
                    document.getElementById("dob")?.value || null,

                state:
                    document.getElementById("state")?.value || null,

                zip_code:
                    document.getElementById("zipCode")?.value || null,

                lead_type:
                    document.getElementById("leadType")?.value || null,

                current_company:
                    document.getElementById("currentCompany")?.value || null,

                current_premium:
                    document.getElementById("currentPremium")?.value || null,

                current_coverage:
                    document.getElementById("currentCoverage")?.value || null,

                years_with_policy:
                    document.getElementById("yearsWithPolicy")?.value || null,

                comments:
                    document.getElementById("comments")?.value || null
            });

        if (error) {

            console.error("Supabase Error:", error);

            alert(
                "Error: " +
                error.message
            );

            return;
        }

        alert("Lead saved successfully!");

        leadForm.reset();

    });

}