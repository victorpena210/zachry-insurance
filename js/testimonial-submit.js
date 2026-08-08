// ============================
// CLIENT TESTIMONIAL SUBMISSION
// ============================

const testimonialForm = document.getElementById("testimonialForm");
const testimonialSuccess = document.getElementById("testimonialSuccess");
const testimonialError = document.getElementById("testimonialError");

if (testimonialForm) {
    let testimonialFormStarted = false;

    const trackStart = () => {
        if (testimonialFormStarted) return;
        testimonialFormStarted = true;

        window.trackGaEvent?.("lead_form_start", {
            form_name: "testimonial_submission_form",
            page_path: window.location.pathname
        });
    };

    testimonialForm.addEventListener("input", trackStart);
    testimonialForm.addEventListener("change", trackStart);

    testimonialForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        testimonialSuccess?.classList.add("hidden");
        testimonialError?.classList.add("hidden");

        const submitButton = testimonialForm.querySelector('button[type="submit"]');
        const permissionCheckbox = document.getElementById("testimonialPermission");
        const permissionText = document.getElementById("testimonialPermissionText")?.textContent?.trim() || "";

        if (!permissionCheckbox?.checked) {
            if (testimonialError) {
                testimonialError.textContent = "Please give permission before submitting your testimonial.";
                testimonialError.classList.remove("hidden");
            }
            return;
        }

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        try {
            const { error } = await window.supabaseClient
                .from("testimonials")
                .insert([{
                    display_name: document.getElementById("testimonialName").value.trim(),
                    email: document.getElementById("testimonialEmail").value.trim(),
                    testimonial: document.getElementById("testimonialText").value.trim(),
                    permission_to_publish: true,
                    permission_text: permissionText,
                    permission_recorded_at: new Date().toISOString(),
                    status: "pending",
                    source_page: window.location.pathname
                }]);

            if (error) throw error;

            window.trackGaEvent?.("testimonial_submission", {
                form_name: "testimonial_submission_form",
                page_path: window.location.pathname
            });

            testimonialForm.reset();
            testimonialSuccess?.classList.remove("hidden");
            testimonialSuccess?.scrollIntoView({ behavior: "smooth", block: "center" });
        } catch (error) {
            console.error("Testimonial submission error:", error);

            if (testimonialError) {
                testimonialError.textContent = "We could not submit your testimonial. Please try again or contact Zachry Insurance.";
                testimonialError.classList.remove("hidden");
                testimonialError.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Testimonial";
            }
        }
    });
}
