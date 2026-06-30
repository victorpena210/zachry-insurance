// LIFE INSURANCE CONDITIONAL FIELDS

const insuranceStatus =
document.getElementById('insuranceStatus');

const existingFields =
document.getElementById('existingFields');

if (insuranceStatus && existingFields) {

    insuranceStatus.addEventListener(
    'change',
    function(){

        if(this.value === 'yes'){
            existingFields.classList.remove('hidden');
        } else {
            existingFields.classList.add('hidden');
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

    menuToggle.addEventListener("click", function () {

        const isOpen =
        dropdownMenu.classList.toggle("open");

        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    });

    document.addEventListener("click", function (e) {

        if (
            !menuToggle.contains(e.target) &&
            !dropdownMenu.contains(e.target)
        ) {

            dropdownMenu.classList.remove("open");
            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

    document.addEventListener("keydown", function (e) {

        if (e.key === "Escape") {

            dropdownMenu.classList.remove("open");
            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    });

    dropdownMenu
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener("click", function () {

            dropdownMenu.classList.remove("open");
            menuToggle.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        });

    });

}

