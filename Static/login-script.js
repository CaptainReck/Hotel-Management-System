document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("login_form");
  const emailValidationMessage = document.getElementById("emailValidationMessage");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const form_data = new FormData(form);
    const email = form_data.get('email');
    const password = form_data.get('password');
    const data_sent = {
      email: email,
      password: password
    };
    
    const requestOptions = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data_sent)
    };
    
    const serverURL = "http://127.0.0.1:5000";
    
    fetch(serverURL, requestOptions)
      .then(response => {
        if (response.status !== 200) {
          throw new Error(`Login failed. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.verified === "yes") {
          document.getElementById("work").innerHTML = "Login successful";
          setTimeout(function() {
            window.location.href = serverURL + "/protected-page"; // Redirect to protected page
          }, 1000);
        } else {
          console.log(requestOptions)
          console.log("Not Verified");
          document.getElementById("work").innerHTML = "Failed";
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
        document.getElementById("work").innerHTML = "An error occurred. Please try again later.";
      });
  });
});
