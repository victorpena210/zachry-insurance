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