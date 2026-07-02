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

        applicationMessage.textContent = "Submitting application...";
        applicationMessage.classList.remove("success", "error");

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

            notes:
                document.getElementById("notes").value.trim() || null,

            status:
                "Submitted"
        };

        const { data, error } =
            await window.supabaseClient
                .from("agent_applications")
                .insert([applicationData]);

        if (error) {
            console.error("Application submission error:", error);

            applicationMessage.textContent =
                "Something went wrong. Please try again or contact Clay directly.";

            applicationMessage.classList.add("error");
            return;
        }

        applicationMessage.textContent =
            "Application submitted successfully. Clay will review it and follow up with you.";

        applicationMessage.classList.add("success");

        agentApplicationForm.reset();

    });

}