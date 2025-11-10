// Honeypot field check function
function checkHoneypot() {
    const honeypotField = document.getElementById('website');
    if (honeypotField && honeypotField.value.trim() !== '') {
        // Bot detected - silently reject
        console.log('Bot submission detected and rejected');
        // Optionally show a generic error message to avoid revealing the honeypot
        document.getElementById("alert").innerHTML = "Something Went Wrong !!!. Please Contact via other social Handels."
        return false;
    }
    return true;
}

document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Check honeypot field first
    if (!checkHoneypot()) {
        return; // Stop submission if honeypot is filled
    }
    
    emailjs.sendForm('service_buj4qoj', 'template_kc16rla', '#contact-form')
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById("success").innerHTML = "We got your message. Will contact you as soon as possible."
            document.getElementById('contact-form').reset();
        }, function (error) {
            document.getElementById("alert").innerHTML = "Something Went Wrong !!!. Please Contact via other social Handels."
            console.log('FAILED...', error);
        });

});

const scriptURL = 'https://script.google.com/macros/s/AKfycbylI_4YgXxR9VIoXQNHhCvpQPQGxkBinYmpKFqbNNt_mHOLvamgvHiTT0HPCnRjKFfR/exec'
const form = document.getElementById('contact-form')

form.addEventListener('submit', e => {
    e.preventDefault()
    
    // Check honeypot field before submitting to Google Sheets
    if (!checkHoneypot()) {
        return; // Stop submission if honeypot is filled
    }
    
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
})