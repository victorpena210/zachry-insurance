// LIFE INSURANCE CONDITIONAL FIELDS

const insuranceStatus =
document.getElementById('insuranceStatus');

const existingFields =
document.getElementById('existingFields');

if (insuranceStatus && existingFields) {

    insuranceStatus.addEventListener(
    'change',
    function(){

if (this.value === "yes") {
    existingFields.classList.remove("hidden");
} else {
    existingFields.classList.add("hidden");

    existingFields
        .querySelectorAll("input, select")
        .forEach((field) => {
            field.value = "";
        });
}

    });

}

// SMOOTH SCROLL

document.querySelectorAll(
'a[href^="#"]'
).forEach(anchor => {

anchor.addEventListener(
'click',
function(e){

e.preventDefault();

document.querySelector(
this.getAttribute('href')
).scrollIntoView({

behavior:'smooth'

});

}
);

});

// ============================
// DROPDOWN NAV MENU
// ============================

const menuToggle =
document.getElementById("menuToggle");

const dropdownMenu =
document.getElementById("dropdownMenu");

if (menuToggle && dropdownMenu) {

    const careerDropdown =
    dropdownMenu.querySelector(".dropdown-section");

    const careerDropdownButton =
    dropdownMenu.querySelector(".dropdown-parent");

    function closeDropdownMenu() {

        dropdownMenu.classList.remove("open");
        menuToggle.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        if (careerDropdown && careerDropdownButton) {

            careerDropdown.classList.remove("open");

            careerDropdownButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

    menuToggle.addEventListener("click", function () {

        const isOpen =
        dropdownMenu.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

    if (careerDropdown && careerDropdownButton) {

        careerDropdownButton.addEventListener("click", function () {

            const isOpen =
            careerDropdown.classList.toggle("open");

            careerDropdownButton.setAttribute(
                "aria-expanded",
                isOpen
            );

        });

    }

    document.addEventListener("click", function (e) {

        if (
            !menuToggle.contains(e.target) &&
            !dropdownMenu.contains(e.target)
        ) {

            closeDropdownMenu();

        }

    });

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            closeDropdownMenu();

        }

    });

    dropdownMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener("click", function () {

            closeDropdownMenu();

        });

    });

}


