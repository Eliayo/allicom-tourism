// mobile
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

//
function toggleForm() {
  const form = document.getElementById("tour-operator-form");
  form.classList.toggle("hidden");
}

function toggleForm() {
  const form = document.getElementById("tour-operator-form");
  form.classList.toggle("hidden");
}

// File validation and preview
// document
//   .getElementById("uploaded_images")
//   .addEventListener("change", function (e) {
//     const files = e.target.files;
//     const imagePreview = document.getElementById("imagePreview");
//     imagePreview.innerHTML = "";

//     if (files.length > 4) {
//       alert("Please select a maximum of 4 images");
//       e.target.value = "";
//       return;
//     }

//     for (let file of files) {
//       if (!file.type.startsWith("image/")) {
//         alert("Please select only image files");
//         e.target.value = "";
//         return;
//       }

//       const reader = new FileReader();
//       reader.onload = function (e) {
//         const div = document.createElement("div");
//         div.innerHTML = `<img src="${e.target.result}" class="w-full h-16 object-cover rounded" />`;
//         imagePreview.appendChild(div);
//       };
//       reader.readAsDataURL(file);
//     }
//   });

// Validate form
// function showPreview() {
//   const form = document.getElementById("tourForm");
//   if (!form.checkValidity()) {
//     form.reportValidity();
//     return;
//   }

//   const selectedDays = Array.from(
//     document.querySelectorAll('input[name="days"]:checked')
//   )
//     .map((checkbox) => checkbox.value)
//     .join(", ");

//   const previewContent = document.getElementById("previewContent");
//   previewContent.innerHTML = `
//           <div class="space-y-4">
//             <div class="grid grid-cols-2 gap-4">
//               <div>
//                 <p class="font-medium text-gray-600">Location</p>
//                 <p>${document.getElementById("city").value}, ${
//     document.getElementById("country").value
//   }</p>
//               </div>
//               <div>
//                 <p class="font-medium text-gray-600">Tour Title</p>
//                 <p>${document.getElementById("tour-title").value}</p>
//               </div>
//             </div>

//             <div>
//               <p class="font-medium text-gray-600">Description</p>
//               <p class="text-gray-700">${
//                 document.getElementById("description").value
//               }</p>
//             </div>

//             <div class="grid grid-cols-2 gap-4">
//               <div>
//                 <p class="font-medium text-gray-600">Price</p>
//                 <p>₦${document.getElementById("price").value}</p>
//               </div>
//               <div>
//                 <p class="font-medium text-gray-600">Duration</p>
//                 <p>${document.getElementById("duration").value} hours</p>
//               </div>
//             </div>

//             <div>
//               <p class="font-medium text-gray-600">Age Range</p>
//               <p>${document.getElementById("min_age").value} - ${
//     document.getElementById("max_age").value
//   } years</p>
//             </div>

//             <div>
//               <p class="font-medium text-gray-600">Available Days</p>
//               <p>${selectedDays || "None selected"}</p>
//             </div>

//             <div>
//               <p class="font-medium text-gray-600">Selected Images</p>
//               <div class="grid grid-cols-4 gap-2 mt-2">
//                 ${document.getElementById("imagePreview").innerHTML}
//               </div>
//             </div>
//           </div>
//         `;

//   document.getElementById("inputPage").classList.add("hidden");
//   document.getElementById("previewPage").classList.remove("hidden");
// }

function goBack() {
  document.getElementById("previewPage").classList.add("hidden");
  document.getElementById("inputPage").classList.remove("hidden");
}

async function submitForm() {
  const formData = new FormData();

  formData.append("city", document.getElementById("city").value);
  formData.append("country", document.getElementById("country").value);
  formData.append("tour_title", document.getElementById("tour-title").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("age_limit", document.getElementById("age_limit").value);
  formData.append(
    "duration",
    parseInt(document.getElementById("duration").value, 10)
  );

  const selectedDays = Array.from(
    document.querySelectorAll('input[name="days"]:checked')
  ).map((checkbox) => checkbox.value);
  formData.append("available_days", JSON.stringify(selectedDays));

  const files = document.getElementById("uploaded_images").files;
  for (let i = 0; i < files.length; i++) {
    formData.append("uploaded_images", files[i]);
  }

  const authToken = localStorage.getItem("authToken");
  if (!authToken) {
    alert("User is not authenticated. Please log in again.");
    return;
  }

  // ✅ Show the loading indicator & disable the button
  document.getElementById("loadingIndicator").classList.remove("hidden");
  const uploadButton = document.querySelector("button[onclick='submitForm()']");
  uploadButton.disabled = true;
  uploadButton.textContent = "Uploading...";

  try {
    const response = await fetch(
      "https://api.allicomtravels.com/tour/tourism-site/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Token ${authToken.replace("Token ", "").trim()}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    alert("Tourism site uploaded successfully!");
    window.location.reload();
  } catch (error) {
    console.error("Error:", error);
    alert("Error uploading site. Please try again.");
  } finally {
    // ✅ Hide loading indicator & re-enable the button after upload
    document.getElementById("loadingIndicator").classList.add("hidden");
    uploadButton.disabled = false;
    uploadButton.textContent = "Upload";
  }
}

// -------------------------------------------
function showForm(formId) {
  const forms = document.querySelectorAll('[id$="-form"]'); // Select all forms
  forms.forEach((form) => form.classList.add("hidden")); // Hide all forms

  const selectedForm = document.getElementById(formId);
  if (selectedForm) {
    selectedForm.classList.remove("hidden");
  }
}

// File validation and preview
document
  .getElementById("uploaded_images")
  .addEventListener("change", function () {
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.innerHTML = ""; // Clear previous previews

    const files = this.files;
    if (files.length > 4) {
      alert("You can only upload a maximum of 4 images.");
      this.value = ""; // Reset input
      return;
    }

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.classList.add(
            "w-24",
            "h-24",
            "rounded",
            "object-cover",
            "cursor-pointer"
          );
          imagePreview.appendChild(img);
        };
        reader.readAsDataURL(file);
      }
    });
  });

function showPreview() {
  const city = document.getElementById("city");
  const country = document.getElementById("country");
  const tourTitle = document.getElementById("tour-title");
  const description = document.getElementById("description");
  const price = document.getElementById("price");
  const duration = document.getElementById("duration");
  const ageLimit = document.getElementById("age_limit");

  // ✅ Ensure all fields exist before accessing their values
  if (
    !city ||
    !country ||
    !tourTitle ||
    !description ||
    !price ||
    !duration ||
    !ageLimit
  ) {
    alert(
      "Error: One or more form fields are missing. Please check your HTML."
    );
    return;
  }

  const selectedDays = Array.from(
    document.querySelectorAll('input[name="days"]:checked')
  )
    .map((checkbox) => checkbox.value)
    .join(", ");

  const previewContent = document.getElementById("previewContent");
  if (!previewContent) {
    alert("Error: Preview container not found.");
    return;
  }

  previewContent.innerHTML = `
      <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><p class="font-medium text-gray-600">Location</p><p>${
                city.value
              }, ${country.value}</p></div>
          </div>
          <div><p class="font-medium text-gray-600">Tour Title</p><p>${
            tourTitle.value
          }</p></div>
          <div><p class="font-medium text-gray-600">Description</p><p>${
            description.value
          }</p></div>
          <div><p class="font-medium text-gray-600">Price</p><p>₦${
            price.value
          }</p></div>
          <div><p class="font-medium text-gray-600">Duration</p><p>${
            duration.value
          } hours</p></div>
          <div><p class="font-medium text-gray-600">Age Limit</p><p>${
            ageLimit.value
          } years</p></div>
          <div><p class="font-medium text-gray-600">Available Days</p><p>${
            selectedDays || "None selected"
          }</p></div>
          <div><p class="font-medium text-gray-600">Selected Images</p><div class="grid grid-cols-4 gap-2 mt-2">
              ${document.getElementById("imagePreview")?.innerHTML || ""}
          </div></div>
      </div>
  `;

  function enableImageZoom() {
    const previewContent = document.getElementById("previewContent");
    if (!previewContent) return;

    // ✅ Select images inside previewContent, not #imagePreview directly
    const previewImages = previewContent.querySelectorAll("img");

    previewImages.forEach((img) => {
      img.addEventListener("click", () => {
        // ✅ Create overlay for zoom effect
        const overlay = document.createElement("div");
        overlay.classList.add(
          "fixed",
          "top-0",
          "left-0",
          "w-full",
          "h-full",
          "bg-black/80",
          "z-50",
          "flex",
          "items-center",
          "justify-center"
        );

        // ✅ Create zoomed-in image
        const zoomedImage = document.createElement("img");
        zoomedImage.src = img.src;
        zoomedImage.alt = "Enlarged Image";
        zoomedImage.classList.add(
          "max-w-screen-md",
          "max-h-screen-md",
          "transform",
          "scale-150", // ✅ Smooth zoom effect
          "transition",
          "duration-300",
          "shadow-lg",
          "rounded-lg"
        );

        // ✅ Close button
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "&times;";
        closeButton.classList.add(
          "absolute",
          "top-4",
          "right-4",
          "text-white",
          "text-4xl",
          "cursor-pointer"
        );
        closeButton.addEventListener("click", () => overlay.remove());

        overlay.appendChild(zoomedImage);
        overlay.appendChild(closeButton);
        document.body.appendChild(overlay);
      });
    });
  }

  // ✅ Call this function AFTER images are added to previewContent
  function showPreview() {
    const previewContent = document.getElementById("previewContent");
    previewContent.innerHTML = `
    <div class="space-y-4">
        <p class="font-medium text-gray-600">Selected Images</p>
        <div id="imagePreview" class="grid grid-cols-4 gap-2 mt-2">
          ${document.getElementById("imagePreview")?.innerHTML || ""}
        </div>
    </div>
  `;

    enableImageZoom(); // ✅ Attach zoom functionality after loading images
  }

  document.getElementById("inputPage").classList.add("hidden");
  document.getElementById("previewPage").classList.remove("hidden");
}

function goBack() {
  document.getElementById("previewPage").classList.add("hidden");
  document.getElementById("inputPage").classList.remove("hidden");
}
