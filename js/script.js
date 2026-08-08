

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

// ============================
// GOOGLE ANALYTICS EVENT TRACKING
// ============================

window.trackGaEvent = function (eventName, parameters = {}) {

    if (typeof window.gtag !== "function") {
        console.warn(
            "Google Analytics is not available:",
            eventName
        );
        return;
    }

    window.gtag(
        "event",
        eventName,
        parameters
    );
};


// ============================
// POLICY REVIEW CTA CLICKS
// ============================

document
    .querySelectorAll(
        'a[href="#quote"], a[href="/#quote"]'
    )
    .forEach(link => {

        link.addEventListener("click", function () {

            window.trackGaEvent(
                "policy_review_click",
                {
                    page_path: window.location.pathname,
                    link_text:
                        this.textContent.trim()
                }
            );

        });

    });


// ============================
// PHONE CLICKS
// ============================

document
    .querySelectorAll('a[href^="tel:"]')
    .forEach(link => {

        link.addEventListener("click", function () {

            window.trackGaEvent(
                "phone_click",
                {
                    page_path: window.location.pathname,
                    link_text:
                        this.textContent.trim()
                }
            );

        });

    });




// ============================
// SCHEDULING / CALENDLY CLICKS
// ============================

document
    .querySelectorAll('a[href*="calendly.com"]')
    .forEach(link => {

        link.addEventListener("click", function () {

            window.trackGaEvent(
                "schedule_consultation_click",
                {
                    page_path: window.location.pathname,
                    link_text: this.textContent.trim()
                }
            );

        });

    });
