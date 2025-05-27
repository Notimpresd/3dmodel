const models = [
  { name: "Large pot 1", file: "Large pot 1.glb" },
  { name: "Lunch cup 1", file: "Lunch cup 1.glb" },
  { name: "Lunch box 1", file: "Lunch box 1.glb" },
  { name: "Cuttlery 1", file: "Cuttlery 1.glb" },
  { name: "Lunch box kids 1", file: "Lunch box kids 1.glb" }
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