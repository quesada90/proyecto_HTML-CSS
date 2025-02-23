document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission initially
    let isValid = true;

    // Seleccionar todos los inputs y textareas
    const inputs = document.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      const errorElement = document.createElement("p");
      errorElement.classList.add("error-message");
      errorElement.style.color = "red";
      errorElement.style.fontSize = "0.8em";

      // Remueve el mensaje de error si existe
      if (
        input.nextElementSibling &&
        input.nextElementSibling.classList.contains("error-message")
      ) {
        input.nextElementSibling.remove();
      }

      if (input.value.trim() === "") {
        errorElement.textContent = "This field is required";
        input.parentNode.appendChild(errorElement);
        isValid = false;
      }
    });

    // Vaidación de email
    const emailInput = document.getElementById("email");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {
      const emailError = document.createElement("p");
      emailError.classList.add("error-message");
      emailError.style.color = "red";
      emailError.style.fontSize = "0.8em";
      emailError.textContent = "Please enter a valid email address";
      emailInput.parentNode.appendChild(emailError);
      isValid = false;
    }

    // Si el formulario es válido, se envía
    if (isValid) {
      form.submit();
    }
  });
});
