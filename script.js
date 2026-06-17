// LIFE INSURANCE CONDITIONAL FIELDS

const insuranceStatus =
document.getElementById('insuranceStatus');

const existingFields =
document.getElementById('existingFields');

insuranceStatus.addEventListener(
'change',
function(){

if(this.value === 'yes'){

existingFields.classList.remove(
'hidden'
);

}else{

existingFields.classList.add(
'hidden'
);

}

}
);

// CONTACT METHOD

const contactOptions =
document.querySelectorAll(
'input[name="contactMethod"]'
);

const scheduleSection =
document.getElementById(
'scheduleSection'
);

contactOptions.forEach(option => {

option.addEventListener(
'change',
function(){

if(this.value === 'schedule'){

scheduleSection.classList.remove(
'hidden'
);

}else{

scheduleSection.classList.add(
'hidden'
);

}

}
);

});

// FORM SUBMISSION

const leadForm =
document.getElementById(
'leadForm'
);

const success =
document.getElementById(
'success'
);

leadForm.addEventListener(
'submit',
function(e){

e.preventDefault();

leadForm.style.display = 'none';

success.classList.remove(
'hidden'
);

success.scrollIntoView({
behavior:'smooth'
});

}
);

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