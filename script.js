

// Add this JavaScript code to your existing script.js file or in a separate file

// Add an event listener to the navbar icon for toggling the body content
// document.addEventListener('DOMContentLoaded', function () {
//     const navbarIcon = document.querySelector('.navbar-icon');
//     const bodyContent = document.querySelector('.body');

//     navbarIcon.addEventListener('click', function () {
//         bodyContent.classList.toggle('expanded');
//     });
// });

// Function to handle form submission
function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get form values
    var firstName = document.getElementById('fname').value;
    var lastName = document.getElementById('lname').value;
    var suggestion = document.getElementById('suggestion').value;

    // Send the form data to your server-side script using fetch API
    fetch('/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            suggestion: suggestion
        })
    })
        .then(function (response) {
            // Handle the response from the server
            if (response.ok) {
                alert('Thank you for your suggestion!'); // Display a success message
                document.getElementById('contact-form').reset(); // Clear the form
            } else {
                alert('Oops! Something went wrong.'); // Display an error message
            }
        })
        .catch(function (error) {
            console.log('Error:', error);
            alert('Oops! Something went wrong.'); // Display an error message
        });
}

// Attach the submitForm function to the form's submit event
document.getElementById('contact-form').addEventListener('submit', submitForm);