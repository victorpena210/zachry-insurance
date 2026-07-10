// ============================
// CAREERS / RECRUITING FORM
// ============================

function getRecruitingLeadSource() {

    const params =
    new URLSearchParams(window.location.search);

    const source =
    params.get("source");

    if (!source) {
        return "Careers Page";
    }

    return "Recruiting SEO - " +
    source
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

}

const recruitingForm =
document.getElementById("recruitingForm");

if (recruitingForm) {

    recruitingForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton =
        recruitingForm.querySelector("button[type='submit']");

        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        const careerLead = {

            lead_source:
            getRecruitingLeadSource(),

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

            message:
            document.getElementById("careerMessage").value.trim() || null,

            status:
            "New"

        };

        const { error } =
        await window.supabaseClient
            .from("recruiting_leads")
            .insert([careerLead]);

        if (error) {

            console.error("Supabase recruiting error:", error);

            alert(
                "Unable to submit career interest: " +
                error.message
            );

            submitButton.disabled = false;
            submitButton.textContent = "Submit Career Interest";

            return;
        }

        recruitingForm.reset();

        const successMessage =
        document.getElementById("careerSuccess");

        if (successMessage) {
            successMessage.classList.remove("hidden");
        }

        submitButton.disabled = false;
        submitButton.textContent = "Submit Career Interest";

    });

}