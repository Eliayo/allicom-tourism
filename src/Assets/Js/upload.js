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
  formData.append("Tour Title", document.getElementById("tour-title").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("min_age", document.getElementById("min_age").value);
  formData.append("max_age", document.getElementById("max_age").value);
  formData.append("duration", document.getElementById("duration").value);

  const selectedDays = Array.from(
    document.querySelectorAll('input[name="days"]:checked')
  ).map((checkbox) => checkbox.value);
  formData.append("available_days", JSON.stringify(selectedDays));

  const uploadedImages = document.getElementById("uploaded_images").files;
  for (let i = 0; i < uploadedImages.length; i++) {
    formData.append("uploaded_images", uploadedImages[i]);
  }

  try {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.allicomtravels.com/tour/tourism-site/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Token YOUR_API_TOKEN`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    alert("Tourism site uploaded successfully!");
    window.location.reload();
  } catch (error) {
    console.error("Error:", error);
    alert("Error uploading site. Please try again.");
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
  .addEventListener("change", function (e) {
    const files = e.target.files;
    const imagePreview = document.getElementById("imagePreview");
    imagePreview.innerHTML = "";

    if (files.length > 4) {
      alert("Please select a maximum of 4 images");
      e.target.value = "";
      return;
    }

    for (let file of files) {
      if (!file.type.startsWith("image/")) {
        alert("Please select only image files");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        const div = document.createElement("div");
        div.innerHTML = `<img src="${e.target.result}" class="w-full h-16 object-cover rounded" />`;
        imagePreview.appendChild(div);
      };
      reader.readAsDataURL(file);
    }
  });

function showPreview() {
  const form = document.getElementById("tourForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const selectedDays = Array.from(
    document.querySelectorAll('input[name="days"]:checked')
  )
    .map((checkbox) => checkbox.value)
    .join(", ");

  const previewContent = document.getElementById("previewContent");
  previewContent.innerHTML = `
                <div class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><p class="font-medium text-gray-600">Location</p><p>${
                          document.getElementById("city").value
                        }, ${document.getElementById("country").value}</p></div>
                        
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div><p class="font-medium text-gray-600">Tour Title</p><p>${
                          document.getElementById("tour-title").value
                        }</p></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div><p class="font-medium text-gray-600">Description</p><p class="text-gray-700">${
                          document.getElementById("description").value
                        }</p></div>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><p class="font-medium text-gray-600">Price</p><p>₦${
                          document.getElementById("price").value
                        }</p></div>
                        
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><p class="font-medium text-gray-600">Duration</p><p>${
                          document.getElementById("duration").value
                        } hours</p></div>
                        
                    </div>
                    <div><p class="font-medium text-gray-600">Age Range</p><p>${
                      document.getElementById("min_age").value
                    } - ${
    document.getElementById("max_age").value
  } years</p></div>
                    <div><p class="font-medium text-gray-600">Available Days</p><p>${
                      selectedDays || "None selected"
                    }</p></div>
                    <div><p class="font-medium text-gray-600">Selected Images</p><div class="grid grid-cols-4 gap-2 mt-2">${
                      document.getElementById("imagePreview").innerHTML
                    }</div></div>
                </div>
            `;

  // Add click event listeners to preview images
  const previewImages = previewContent.querySelectorAll("#imagePreview img");
  previewImages.forEach((img) => {
    img.addEventListener("click", () => {
      // Create overlay
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
      overlay.innerHTML = `<img src="${img.src}" alt="Enlarged Image" class="max-w-screen-lg max-h-screen-lg">`;

      // Add close button
      const closeButton = document.createElement("button");
      closeButton.innerHTML = "&times;"; // Or an SVG close icon
      closeButton.classList.add(
        "absolute",
        "top-4",
        "right-4",
        "text-white",
        "text-4xl",
        "cursor-pointer"
      );
      closeButton.addEventListener("click", () => {
        overlay.remove();
      });
      overlay.appendChild(closeButton);

      document.body.appendChild(overlay);
    });
  });

  document.getElementById("inputPage").classList.add("hidden");
  document.getElementById("previewPage").classList.remove("hidden");
}

function goBack() {
  document.getElementById("previewPage").classList.add("hidden");
  document.getElementById("inputPage").classList.remove("hidden");
}

async function submitForm() {
  const formData = new FormData();
  formData.append("city", document.getElementById("city").value);
  formData.append("country", document.getElementById("country").value);
  formData.append("Tour Title", document.getElementById("tour-title").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("price", document.getElementById("price").value);
  formData.append("min_age", document.getElementById("min_age").value);
  formData.append("max_age", document.getElementById("max_age").value);
  formData.append("duration", document.getElementById("duration").value);

  const selectedDays = Array.from(
    document.querySelectorAll('input[name="days"]:checked')
  ).map((checkbox) => checkbox.value);
  formData.append("available_days", selectedDays.join(", "));

  const files = document.getElementById("uploaded_images").files;
  for (let i = 0; i < files.length; i++) {
    formData.append("images", files[i]);
  }

  try {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api.allicomtravels.com/tour/tourism-site/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Token YOUR_API_TOKEN`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    alert("Tourism site uploaded successfully!");
    window.location.reload();
  } catch (error) {
    console.error("Error:", error);
    alert("Error uploading site. Please try again.");
  }
}
