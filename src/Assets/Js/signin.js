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
// document.getElementById("signin-form").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const email = document.getElementById("signin-email").value;
//   const password = document.getElementById("signin-password").value;

//   if (email === "" || password === "") {
//     alert("Please fill in all fields."); // Example validation
// return; // Stop further execution
// }

// If validation passes, redirect:
//   window.location.href = "./upload.html";
// });

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
    e.preventDefault(); // ✅ Prevent form from refreshing

    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value.trim();

    // ✅ Basic validation
    if (!email || !password) {
      this.showMessage("Please fill in all fields.", true, "signin");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}auth/login-supplier/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // ✅ Send login details as JSON
      });

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }

      const data = await response.json();

      if (!data.token) {
        throw new Error("Login failed: No token returned from API");
      }

      // ✅ Store authentication token
      localStorage.setItem("authToken", data.token);

      this.showMessage("Login successful! Redirecting...", false, "signin");

      setTimeout(() => {
        window.location.href = "upload.html"; // ✅ Redirect to upload page
      }, 2000);
    } catch (error) {
      this.showMessage(error.message, true, "signin");
    }
  }

  // ✅ Helper function to validate email format
  validateEmail(email) {
    return /^[\w\.-]+@[\w\.-]+\.\w+$/.test(email);
  }

  async handleSignup(e) {
    e.preventDefault();

    const formData = new FormData();

    // ✅ Collect all fields (API confirmed these fields)
    formData.append("name", document.getElementById("username").value);
    formData.append("email", document.getElementById("business-email").value);
    formData.append("password", document.getElementById("password").value);

    // ✅ Business details
    formData.append(
      "trading_name",
      document.getElementById("trading-name").value
    );
    formData.append(
      "company_name",
      document.getElementById("company-name").value
    );
    formData.append(
      "registration_number",
      document.getElementById("registration-number").value
    );
    formData.append(
      "business_address",
      document.getElementById("business-address").value
    );
    formData.append(
      "business_phone_number",
      document.getElementById("business-phone").value
    );
    formData.append(
      "business_email",
      document.getElementById("business-email").value
    );

    // ✅ Business owner details
    formData.append(
      "business_owner_full_name",
      document.getElementById("owner-name").value
    );
    formData.append(
      "business_owner_phone_number",
      document.getElementById("owner-phone").value
    );
    formData.append(
      "business_owner_email",
      document.getElementById("owner-email").value
    );

    // ✅ Contact person details
    formData.append(
      "contact_person_full_name",
      document.getElementById("contact-name").value
    );
    formData.append(
      "contact_person_phone_number",
      document.getElementById("contact-phone").value
    );
    formData.append(
      "contact_person_email",
      document.getElementById("contact-email").value
    );

    // ✅ File Uploads
    const businessCert = document.getElementById("business-certificate")
      .files[0];
    const membershipCert = document.getElementById("membership-certificate")
      .files[0];

    if (businessCert) formData.append("business_certificate", businessCert);
    if (membershipCert)
      formData.append("association_membership_certificate", membershipCert);

    try {
      const response = await fetch(`${API_BASE_URL}auth/signup-supplier/`, {
        method: "POST",
        body: formData, // ✅ API requires FormData for file uploads
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // ✅ Store authentication token
      localStorage.setItem("authToken", data.token);

      this.showMessage(
        "Account created successfully! Redirecting to login...",
        false
      );

      setTimeout(() => {
        window.location.href = "signin.html"; // Redirect to sign-in page
      }, 2000);
    } catch (error) {
      this.showMessage(error.message, true);
    }
  }

  showMessage(message, isError = false, target = "dynamic") {
    let messageDiv;

    if (target === "signin") {
      // ✅ Use existing error message element for Sign-In
      messageDiv = document.getElementById("signin-error");
      messageDiv.textContent = message;
      messageDiv.classList.toggle("hidden", false);
      messageDiv.classList.toggle(
        isError ? "text-red-500" : "text-green-500",
        true
      );

      // Hide the message after 5 seconds
      setTimeout(() => messageDiv.classList.add("hidden"), 5000);
    } else {
      // ✅ Create a new message for other forms (e.g., signup)
      messageDiv = document.createElement("div");
      messageDiv.textContent = message;
      messageDiv.className = `p-4 rounded-md mb-4 ${
        isError ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
      }`;

      const form = document.querySelector("form");
      form.parentNode.insertBefore(messageDiv, form);

      setTimeout(() => messageDiv.remove(), 5000);
    }
  }
}

// Initialize form handler
document.addEventListener("DOMContentLoaded", () => {
  new AuthFormHandler();
});
