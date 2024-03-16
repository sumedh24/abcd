/*const form = document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess= document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br> Phone Number: ${phone.value}<br> Message: ${mess.value}`;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "sumedhbhatkar80@gmail.com",
        Password : "E84381284F19F25443682A577DB90078C0A5",
        To : 'sumedhbhatkar80@gmail.com',
        From : "sumedhbhatkar80@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => alert(message)
    );
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    sendEmail();
});
*/

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        // Convert formData to JSON
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Check if phone number exists in MongoDB
        fetch('/checkPhoneNumber', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber: data.phoneNumber })
        })
        .then(response => response.json())
        .then(result => {
            if (result.exists) {
                alert("You're already registered. You'll be redirected to the main page.");
                // Redirect to main page
                window.location.href = 'index1.html'; // Replace 'main.html' with your actual main page URL
            } else {
                alert("You're registering for the first time. You can't be redirected to the main page.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });

        // Store data in MongoDB
        fetch('/submitData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Data submitted successfully:', result);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});
