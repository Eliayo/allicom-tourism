// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

function toggleForm() {
  const form = document.getElementById("registration-form");
  form.classList.toggle("hidden");
}

function toggleForm() {
  const form = document.getElementById("registration-form");
  form.classList.toggle("hidden");
}

// Password visibility toggle
document.getElementById("toggle-password").addEventListener("click", () => {
  const passwordField = document.getElementById("password");
  const toggleButton = document.getElementById("toggle-password");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleButton.textContent = "Hide"; // Change button text to "Hide"
  } else {
    passwordField.type = "password";
    toggleButton.textContent = "Show"; // Change button text to "Show"
  }
});

// Password matching validation
const passwordField = document.getElementById("password");
const confirmPasswordField = document.getElementById("confirm-password");
const signupButton = document.getElementById("signup-button");
const passwordMatchError = document.getElementById("password-match-error");

const validatePasswords = () => {
  if (passwordField.value === confirmPasswordField.value) {
    passwordMatchError.classList.add("hidden");
    signupButton.disabled = false;
  } else {
    passwordMatchError.classList.remove("hidden");
    signupButton.disabled = true;
  }
};

passwordField.addEventListener("input", validatePasswords);
confirmPasswordField.addEventListener("input", validatePasswords);

// Handle sign-in form submission
document.getElementById("signin-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  if (email === "" || password === "") {
    alert("Please fill in all fields."); // Example validation
    return; // Stop further execution
  }

  // If validation passes, redirect:
  window.location.href = "./upload.html";
});

// Handle sign-up form submission
document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Sign-Up Successful! Redirecting to Sign-In page...");
  showForm("signin-form-container", "signup-details"); // Go back to Sign-In after Sign-Up
});

// Switch to Sign-In page
document.getElementById("nav-signin").addEventListener("click", function (e) {
  e.preventDefault();
  showForm("signin-form-container", "signup-details", "registration-form");
});

// Switch to Sign-Up page
document.getElementById("nav-signup").addEventListener("click", function (e) {
  e.preventDefault();
  showForm("signup-details", "signin-form-container");
});

// Mobile menu links
// document
//   .getElementById("mobile-signup")
//   .addEventListener("click", function (e) {
//     e.preventDefault();
//     showForm("signup-details", "signin-form-container");
//   });

// document
//   .getElementById("mobile-signin")
//   .addEventListener("click", function (e) {
//     e.preventDefault();
//     showForm("signin-form-container", "signup-details");
//   });

// Quick links
// document.getElementById("link-signup").addEventListener("click", function (e) {
//   e.preventDefault();
//   showForm("signup-details", "signin-form-container");
// });

// document.getElementById("link-signin").addEventListener("click", function (e) {
//   e.preventDefault();
//   showForm("signin-form-container", "signup-details");
// });

// Utility function to toggle forms
function showForm(showId, ...hideIds) {
  const showElement = document.getElementById(showId);

  if (showElement) {
    showElement.classList.remove("hidden");
  }

  hideIds.forEach((hideId) => {
    const hideElement = document.getElementById(hideId);
    if (hideElement) {
      hideElement.classList.add("hidden");
    }
  });
}

// Navigation: Switch to Sign-In page
document.getElementById("nav-signin").addEventListener("click", function (e) {
  e.preventDefault();
  showForm("signin-form-container", "signup-details", "registration-form");
});

// Navigation: Switch to Sign-Up page
document.getElementById("nav-signup").addEventListener("click", function (e) {
  e.preventDefault();
  showForm("signup-details", "signin-form-container");
});

// Quick Links: Switch to Sign-In page
document.getElementById("link-signin").addEventListener("click", function (e) {
  e.preventDefault();
  showForm("signin-form-container", "signup-details", "registration-form");
});

// Quick Links: Switch to Sign-Up page
document.getElementById("link-signup").addEventListener("click", function (e) {
  e.preventDefault();
  showForm("signup-details", "signin-form-container");
});

// "Don't have an account?" Link (go-to-signup): Switch to Sign-Up page
document.getElementById("go-to-signup").addEventListener("click", function (e) {
  e.preventDefault();
  showForm("signup-details", "signin-form-container");
});

// Mobile Links: Switch to Sign-Up page
document
  .getElementById("mobile-signup")
  .addEventListener("click", function (e) {
    e.preventDefault();
    showForm("signup-details", "signin-form-container");
  });

// Mobile Links: Switch to Sign-In page
document
  .getElementById("mobile-signin")
  .addEventListener("click", function (e) {
    e.preventDefault();
    showForm("signin-form-container", "signup-details", "registration-form");
  });

// Form Validation Class
class FormValidator {
  static validateEmail(email) {
    return /^[\w\.-]+@[\w\.-]+\.\w+$/.test(email);
  }

  static validatePhoneNumber(phone) {
    return /^\d{10,}$/.test(phone.replace(/\D/g, ""));
  }
}

// -------------------------------

// Constants
const API_BASE_URL = "http://api.allicomtravels.com/";
const TOKEN_KEY = "authToken";
// Form Handler Class
class AuthFormHandler {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Login form handler
    const loginForm = document.getElementById("signin-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => this.handleLogin(e));
    }

    // Signup form handler
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => this.handleSignup(e));
      this.setupSignupValidation();
    }

    // Password toggle buttons
    const toggleBtns = document.querySelectorAll('[id^="toggle-password"]');
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => this.togglePasswordVisibility(btn));
    });
  }

  setupSignupValidation() {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const signupButton = document.getElementById("signup-button");
    const errorMessage = document.getElementById("password-match-error");

    const validatePasswords = () => {
      const passwordsMatch = password.value === confirmPassword.value;
      const passwordValid = FormValidator.validatePassword(
        password.value
      ).isValid;

      errorMessage.classList.toggle("hidden", passwordsMatch);
      signupButton.disabled = !passwordsMatch || !passwordValid;
    };

    password.addEventListener("input", validatePasswords);
    confirmPassword.addEventListener("input", validatePasswords);
  }

  togglePasswordVisibility(btn) {
    const passwordInput = btn.previousElementSibling;
    const type = passwordInput.type === "password" ? "text" : "password";
    passwordInput.type = type;
    btn.textContent = type === "password" ? "Show" : "Hide";
  }

  async handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login-b2b/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      this.showMessage("Login successful!", false);
      window.location.href = "/dashboard"; // Redirect after successful login
    } catch (error) {
      this.showMessage(error.message, true);
    }
  }

  async handleSignup(e) {
    e.preventDefault();

    try {
      // Create FormData object for file uploads
      const formData = new FormData();

      // Add all form fields to FormData
      const fields = [
        "trading-name",
        "company-name",
        "registration-number",
        "business-address",
        "business-phone",
        "business-email",
        "owner-name",
        "owner-phone",
        "owner-email",
        "contact-name",
        "contact-phone",
        "contact-email",
        "username",
        "password",
      ];

      fields.forEach((field) => {
        formData.append(field, document.getElementById(field).value);
      });

      // Add file uploads
      const businessCert = document.getElementById("business-certificate")
        .files[0];
      const membershipCert = document.getElementById("membership-certificate")
        .files[0];
      formData.append("business_certificate", businessCert);
      formData.append("membership_certificate", membershipCert);

      const response = await fetch(`${API_BASE_URL}/auth/signup-b2b/`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      this.showMessage("Account created successfully!", false);
      window.location.href = "/dashboard"; // Redirect after successful signup
    } catch (error) {
      this.showMessage(error.message, true);
    }
  }

  showMessage(message, isError = false) {
    const messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.className = `p-4 rounded-md mb-4 ${
      isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
    }`;

    const form = document.querySelector("form");
    form.parentNode.insertBefore(messageDiv, form);

    setTimeout(() => messageDiv.remove(), 5000);
  }
}

// Initialize form handler
document.addEventListener("DOMContentLoaded", () => {
  new AuthFormHandler();
});
