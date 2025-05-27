const models = [
  { name: "Cuttlery - Pink", file: "Cuttlery - Pink.glb" },
  { name: "Cuttlery - Turqoise", file: "Cuttlery - Turqoise.glb" },
  { name: "Large pot - Blue", file: "Large pot - Blue.glb" },
  { name: "Large pot - Green", file: "Large pot - Green.glb" },
  { name: "Large pot - Pink", file: "Large pot - Pink.glb" },
  { name: "Lunch box - Green", file: "Lunch box - Green.glb" },
  { name: "Lunch box - Pink", file: "Lunch box - Pink.glb" },
  { name: "Lunch box - Turqoise", file: "Lunch box - Turqoise.glb" },
  { name: "Lunch box kids - Blue", file: "Lunch box kids - Blue.glb" },
  { name: "Lunch box kids - Orange", file: "Lunch box kids - Orange.glb" },
  { name: "Lunch cup", file: "Lunch cup.glb" }
];


const catalog = document.getElementById("catalog");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("fullscreenModal");
const modalViewer = document.getElementById("modalViewer");
const closeBtn = document.getElementById("closeBtn");

// Create each product card
function createProduct({ name, file }) {
  const div = document.createElement("div");
  div.className = "product";
  div.dataset.name = name.toLowerCase();

  div.innerHTML = `
    <h3>${name}</h3>
    <model-viewer 
      src="${file}" 
      alt="${name}"
      auto-rotate 
      camera-controls 
      shadow-intensity="1"
      environment-image="neutral"
      loading="eager"
      onclick="openModal('${file}')"
        interaction-prompt="none">
    </model-viewer>
    <a href="${file}" download>
      <button class="download-btn">Download</button>
    </a>
  `;

  return div;
}

// Initialize catalog
models.forEach(model => {
  catalog.appendChild(createProduct(model));
});

// Live search
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  document.querySelectorAll(".product").forEach(product => {
    product.style.display = product.dataset.name.includes(filter) ? "block" : "none";
  });
});

// Modal logic
window.openModal = function(src) {
  modalViewer.setAttribute("src", src);
  modal.style.display = "flex";
};

function closeModal() {
  modal.style.display = "none";
  modalViewer.setAttribute("src", "");
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});