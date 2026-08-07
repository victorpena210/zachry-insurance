console.log("Mortgage calculator loaded");

const mortgageForm = document.getElementById("mortgageForm");
const resultsElement = document.getElementById("results");

function getMortgageValue(id) {
    return document.getElementById(id)?.value?.trim() || "";
}

function showMortgageError(message) {
    const errorElement = document.getElementById("mortgageLeadError");

    if (!errorElement) {
        return;
    }

    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
}

function clearMortgageError() {
    const errorElement = document.getElementById("mortgageLeadError");

    if (!errorElement) {
        return;
    }

    errorElement.textContent = "";
    errorElement.classList.add("hidden");
}

function calculateRecommendedCoverage(mortgage, income, children) {
    const incomeReplacement = income * 10;
    const childBenefit = children * 50000;

    return mortgage + incomeReplacement + childBenefit;
}

function showMortgageResults(recommendedCoverage) {
    if (!resultsElement) {
        return;
    }

    resultsElement.innerHTML = `
        <div class="result-card" tabindex="-1">
            <p class="result-eyebrow">YOUR EDUCATIONAL ESTIMATE</p>
            <h2>Recommended Coverage</h2>
            <h1>$${recommendedCoverage.toLocaleString()}</h1>
            <p>
                This estimate uses your mortgage balance, ten years of annual
                income, and $50,000 per child as a simple starting point. It is
                not a quote, policy offer, or guarantee of eligibility.
            </p>
            <a
                href="https://calendly.com/clay-christian-zachry/30min"
                target="_blank"
                rel="noopener"
                class="primary-btn">
                Schedule Consultation
            </a>
        </div>
    `;

    const resultCard = resultsElement.querySelector(".result-card");
    resultCard?.focus();
    resultCard?.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

if (mortgageForm) {
    mortgageForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearMortgageError();

        const submitButton = document.getElementById("mortgageSubmitButton");

        const mortgage = Number.parseFloat(getMortgageValue("mortgageBalance"));
        const income = Number.parseFloat(getMortgageValue("annualIncome"));
        const children = Number.parseInt(getMortgageValue("children"), 10);

        const firstName = getMortgageValue("mortgageFirstName");
        const lastName = getMortgageValue("mortgageLastName");
        const email = getMortgageValue("mortgageEmail");
        const phone = getMortgageValue("mortgagePhone");
        const state = getMortgageValue("mortgageState");

        if (
            !Number.isFinite(mortgage) || mortgage < 0 ||
            !Number.isFinite(income) || income < 0 ||
            !Number.isInteger(children) || children < 0
        ) {
            showMortgageError(
                "Please enter valid mortgage, income, and children values."
            );
            return;
        }

        if (!firstName || !lastName || !email || !phone || !state) {
            showMortgageError("Please complete all contact fields.");
            return;
        }

        if (typeof window.getContactConsent !== "function") {
            console.error("Mortgage consent helper is unavailable.");
            showMortgageError(
                "The form could not verify your contact permission. Please refresh the page and try again."
            );
            return;
        }

        if (typeof window.saveLead !== "function" && typeof saveLead !== "function") {
            console.error("Mortgage lead-saving helper is unavailable.");
            showMortgageError(
                "The form could not connect to the lead system. Please refresh the page and try again."
            );
            return;
        }

        const consent = window.getContactConsent({
            container: mortgageForm,
            checkboxId: "mortgageContactConsent"
        });

        if (!consent) {
            showMortgageError(
                "Please agree to the contact permission before viewing your estimate."
            );
            return;
        }

        const recommendedCoverage = calculateRecommendedCoverage(
            mortgage,
            income,
            children
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Saving Your Information...";
        }

        try {
            const { error } = await saveLead({
                lead_source: "Mortgage Calculator",
                lead_type: "quote",
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone,
                state: state,
                mortgage_balance: mortgage,
                annual_income: income,
                children_count: children,
                recommended_coverage: recommendedCoverage,
                status: "New",
                ...consent
            });

            if (error) {
                throw error;
            }

            showMortgageResults(recommendedCoverage);
        } catch (error) {
            console.error("Mortgage lead submission error:", error);
            showMortgageError(
                "We could not save your request, so your estimate was not displayed. Please try again or contact Clay directly."
            );
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Get My Coverage Estimate";
            }
        }
    });
}
