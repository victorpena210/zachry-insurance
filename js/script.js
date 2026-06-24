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

