console.log(
'Mortgage calculator loaded'
);
let recommendedCoverage = 0;

let mortgage = 0;
let income = 0;
let children = 0;

document
.getElementById('mortgageForm')
.addEventListener('submit', function(e){

    e.preventDefault();

    mortgage =
        parseFloat(
            document.getElementById('mortgageBalance').value
        );

    income =
        parseFloat(
            document.getElementById('annualIncome').value
        );

    children =
        parseInt(
            document.getElementById('children').value
        );

    const incomeReplacement =
        income * 10;

    const childBenefit =
        children * 50000;

    recommendedCoverage =
        mortgage +
        incomeReplacement +
        childBenefit;

    document.getElementById('results').innerHTML = `

        <div class="lead-gate">

            <h2>
                Your Results Are Ready
            </h2>

            <p>
                Enter your information to unlock your personalized coverage recommendation.
            </p>

            <input
                type="text"
                id="firstName"
                placeholder="First Name"
            >

            <input
                type="text"
                id="lastName"
                placeholder="Last Name"
            >

            <input
                type="email"
                id="leadEmail"
                placeholder="Email Address"
            >

            <input
                type="tel"
                id="leadPhone"
                placeholder="Phone Number"
            >

            <button
                id="unlockResults"
                class="submit-btn"
            >
                Show My Results
            </button>

        </div>

    `;

    setupUnlockButton();

});

function setupUnlockButton() {

    document
    .getElementById('unlockResults')
    .addEventListener('click', saveMortgageLead);
}

async function saveMortgageLead() {

const firstName =
    document.getElementById('firstName').value;

const lastName =
    document.getElementById('lastName').value;

    const email =
        document.getElementById('leadEmail').value;

    const phone =
        document.getElementById('leadPhone').value;


    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone
    ) {

        alert(
            'Please complete all fields.'
        );

        return;
    }


const { error } =
    await saveLead({

        lead_source:
            'Mortgage Calculator',

        first_name:
            firstName,

        last_name:
            lastName,

        email:
            email,

        phone:
            phone,

        mortgage_balance:
            mortgage,

        annual_income:
            income,

        children_count:
            children,

        recommended_coverage:
            recommendedCoverage,

        status:
            'New'

    });


    if(error){

        console.error(error);

        alert(
            'Unable to save lead.'
        );

        return;
    }


    document.getElementById('results').innerHTML = `

        <div class="result-card">

            <h2>
                Recommended Coverage
            </h2>

            <h1>
                $${recommendedCoverage.toLocaleString()}
            </h1>

            <p>
                Based on the information provided,
                this is a general estimate.
            </p>

<a
    href="https://calendly.com/clay-christian-zachry/30min"
    target="_blank"
    class="primary-btn"
>
    Schedule Consultation
</a>

        </div>

    `;
}