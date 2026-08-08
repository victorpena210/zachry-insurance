// ============================
// APPROVED CLIENT TESTIMONIALS
// ============================

(async function loadApprovedTestimonials() {
    const section = document.getElementById("clientTestimonials");
    const grid = document.getElementById("testimonialGrid");

    if (!section || !grid || !window.supabaseClient) return;

    try {
        const { data, error } = await window.supabaseClient
            .from("testimonials")
            .select("id, display_name, testimonial, approved_at")
            .order("approved_at", { ascending: false })
            .limit(6);

        if (error) throw error;
        if (!data || data.length === 0) return;

        const fragment = document.createDocumentFragment();

        data.forEach(item => {
            const card = document.createElement("article");
            card.className = "client-testimonial-card";

            const quote = document.createElement("blockquote");
            quote.textContent = item.testimonial;

            const name = document.createElement("p");
            name.className = "client-testimonial-name";
            name.textContent = `— ${item.display_name}`;

            card.append(quote, name);
            fragment.appendChild(card);
        });

        grid.replaceChildren(fragment);
        section.classList.remove("hidden");
    } catch (error) {
        // Testimonials are supplemental content, so failure should not interrupt the page.
        console.error("Approved testimonial load error:", error);
    }
})();
