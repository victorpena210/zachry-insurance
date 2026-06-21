document
.getElementById('mortgageForm')
.addEventListener('submit', function(e){

    e.preventDefault();

    const mortgage =
        parseFloat(
            document.getElementById('mortgageBalance').value
        );

    const income =
        parseFloat(
            document.getElementById('annualIncome').value
        );

    const children =
        parseInt(
            document.getElementById('children').value
        );

    const incomeReplacement =
        income * 10;

    const childBenefit =
        children * 50000;

    const recommendedCoverage =
        mortgage +
        incomeReplacement +
        childBenefit;

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

            <a href="#leadForm">
                Get A Personalized Quote
            </a>
        </div>
    `;

});