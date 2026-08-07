console.log("Mortgage calculator loaded");

let recommendedCoverage = 0;
let mortgage = 0;
let income = 0;
let children = 0;

const mortgageForm = document.getElementById("mortgageForm");

if (mortgageForm) {
    mortgageForm.addEventListener("submit", function (e) {
        e.preventDefault();

        mortgage = parseFloat(
            document.getElementById("mortgageBalance").value
        );

        income = parseFloat(
            document.getElementById("annualIncome").value
        );

        children = parseInt(
            document.getElementById("children").value,
            10
        );

        const incomeReplacement = income * 10;
        const childBenefit = children * 50000;

        recommendedCoverage =
            mortgage + incomeReplacement + childBenefit;

        document.getElementById("results").innerHTML = `
            <div class="lead-gate" id="mortgageLeadGate">
                <h2>Your Results Are Ready</h2>

                <p>
                    Enter your information to unlock your personalized coverage recommendation.
                </p>

                <input
                    type="text"
                    id="firstName"
                    placeholder="First Name"
                    autocomplete="given-name"
                    required
                >

                <input
                    type="text"
                    id="lastName"
                    placeholder="Last Name"
                    autocomplete="family-name"
                    required
                >

                <input
                    type="email"
                    id="leadEmail"
                    placeholder="Email Address"
                    autocomplete="email"
                    required
                >

                <input
                    type="tel"
                    id="leadPhone"
                    placeholder="Phone Number"
                    autocomplete="tel"
                    required
                >

                <div class="consent-group">
                    <label class="consent-label" for="mortgageContactConsent">
                        <input
                            type="checkbox"
                            id="mortgageContactConsent"
                            required
                        >

                        <span data-consent-text>
                            I agree that Zachry Insurance may contact me by
                            phone, email, or text about this request. I have
                            read the
                            <a href="/privacy-policy" target="_blank" rel="noopener">
                                Privacy Policy
                            </a>.
                        </span>
                    </label>

                    <p class="consent-note">
                        This permission is for responding to this request.
                        It does not authorize automated or prerecorded
                        marketing calls or texts.
                    </p>
                </div>

                <button
                    id="unlockResults"
                    class="submit-btn"
                    type="button"
                >
                    Show My Results
                </button>

                <div
                    id="mortgageLeadError"
                    class="form-error hidden"
                    role="alert"
                    aria-live="assertive"
                ></div>
            </div>
        `;

        setupUnlockButton();
    });
}

function setupUnlockButton() {
    document
        .getElementById("unlockResults")
        ?.addEventListener("click", saveMortgageLead);
}

function showMortgageError(message) {
    const errorElement = document.getElementById("mortgageLeadError");

    if (!errorElement) {
        return;
    }

    errorElement.textContent = message;
    errorElement.classList.remove("hidden");
}

async function saveMortgageLead() {
    const firstName =
        document.getElementById("firstName").value.trim();

    const lastName =
        document.getElementById("lastName").value.trim();

    const email =
        document.getElementById("leadEmail").value.trim();

    const phone =
        document.getElementById("leadPhone").value.trim();

    const unlockButton =
        document.getElementById("unlockResults");

    document
        .getElementById("mortgageLeadError")
        ?.classList.add("hidden");

    if (!firstName || !lastName || !email || !phone) {
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

    const leadGate = document.getElementById("mortgageLeadGate");
    const consent = window.getContactConsent({
        container: leadGate,
        checkboxId: "mortgageContactConsent"
    });

    if (!consent) {
        showMortgageError(
            "Please agree to the contact permission before viewing your results."
        );
        return;
    }

    if (unlockButton) {
        unlockButton.disabled = true;
        unlockButton.textContent = "Saving...";
    }

    try {
        const { error } = await saveLead({
            lead_source: "Mortgage Calculator",
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
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

        document.getElementById("results").innerHTML = `
            <div class="result-card">
                <h2>Recommended Coverage</h2>

                <h1>$${recommendedCoverage.toLocaleString()}</h1>

                <p>
                    Based on the information provided,
                    this is a general estimate.
                </p>

                <a
                    href="https://calendly.com/clay-christian-zachry/30min"
                    target="_blank"
                    rel="noopener"
                    class="primary-btn"
                >
                    Schedule Consultation
                </a>
            </div>
        `;
    } catch (error) {
        console.error("Mortgage lead submission error:", error);
        showMortgageError(
            "We could not save your request. Please try again or contact Clay directly."
        );
    } finally {
        if (unlockButton && document.body.contains(unlockButton)) {
            unlockButton.disabled = false;
            unlockButton.textContent = "Show My Results";
        }
    }
}
