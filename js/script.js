// ============================
// SUPABASE CONNECTION
// ============================

const supabaseClient = window.supabase.createClient(
  'https://laixkfncclwojayzwifa.supabase.co',
  'sb_publishable_YFaPUMHnFUMqsOmLbMn5qw_Lcgd5uFM'
);
window.supabaseClient = supabaseClient;


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

function showTab(tabId, button){

    document
        .querySelectorAll('.tab-content')
        .forEach(tab=>{
            tab.classList.remove('active-content');
        });

    document
        .querySelectorAll('.tab-btn')
        .forEach(btn=>{
            btn.classList.remove('active');
        });

    document
        .getElementById(tabId)
        .classList
        .add('active-content');

    button.classList.add('active');
}