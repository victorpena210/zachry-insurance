// ============================
// CAREERS PAGE TOOLS
// Career Quiz, Income Calculator, FAQ
// ============================

function runCareersPageTools() {

    // ============================
    // CAREER QUIZ
    // ============================

    const careerQuizForm =
    document.getElementById("careerQuizForm");

    if (careerQuizForm) {

        careerQuizForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const formData =
            new FormData(careerQuizForm);

            const questions =
            ["q1", "q2", "q3", "q4", "q5"];

            const allAnswered =
            questions.every(question => formData.has(question));

            if (!allAnswered) {

                alert("Please answer every question before seeing your result.");

                return;
            }

            const score =
            questions.reduce(function (total, question) {

                return total + Number(formData.get(question));

            }, 0);

            const quizResult =
            document.getElementById("quizResult");

            const quizResultTitle =
            document.getElementById("quizResultTitle");

            const quizResultText =
            document.getElementById("quizResultText");

            if (!quizResult || !quizResultTitle || !quizResultText) {
                return;
            }

            if (score >= 17) {

                quizResultTitle.textContent =
                "Strong Fit";

                quizResultText.textContent =
                "You may be a strong fit for a life insurance career. Your answers show motivation, coachability, communication skills, and interest in helping families.";

            } else if (score >= 12) {

                quizResultTitle.textContent =
                "Possible Fit";

                quizResultText.textContent =
                "You may be a good fit, especially with the right training and mentorship. A short conversation with Clay can help you understand the opportunity better.";

            } else {

                quizResultTitle.textContent =
                "Worth A Conversation";

                quizResultText.textContent =
                "You may still be exploring whether this is right for you. That is okay. The next step is simply learning more and asking questions.";

            }

            quizResult.classList.remove("hidden");

            quizResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    // ============================
    // INCOME CALCULATOR
    // ============================

    const incomeCalculatorForm =
    document.getElementById("incomeCalculatorForm");

    if (incomeCalculatorForm) {

        incomeCalculatorForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const policiesPerMonth =
            Number(document.getElementById("policiesPerMonth").value);

            const averageCommission =
            Number(document.getElementById("averageCommission").value);

            const activeMonths =
            Number(document.getElementById("activeMonths").value);

            if (
                policiesPerMonth < 0 ||
                averageCommission < 0 ||
                activeMonths <= 0
            ) {

                alert("Please enter valid calculator numbers.");

                return;
            }

            const monthlyIncome =
            policiesPerMonth * averageCommission;

            const annualIncome =
            monthlyIncome * activeMonths;

            const monthlyIncomeElement =
            document.getElementById("monthlyIncome");

            const annualIncomeElement =
            document.getElementById("annualIncome");

            const incomeResult =
            document.getElementById("incomeResult");

            monthlyIncomeElement.textContent =
            monthlyIncome.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0
            });

            annualIncomeElement.textContent =
            annualIncome.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0
            });

            incomeResult.classList.remove("hidden");

            incomeResult.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        });

    }


    // ============================
    // FAQ ACCORDION
    // ============================

    const faqButtons =
    document.querySelectorAll(".faq-question");

    faqButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const faqItem =
            button.closest(".faq-item");

            const faqIcon =
            button.querySelector(".faq-icon");

            const isOpen =
            faqItem.classList.toggle("open");

            button.setAttribute(
                "aria-expanded",
                isOpen
            );

            if (faqIcon) {
                faqIcon.textContent = isOpen ? "−" : "+";
            }

        });

    });

}

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        runCareersPageTools
    );

} else {

    runCareersPageTools();

}