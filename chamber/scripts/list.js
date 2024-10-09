const buttons = document.querySelectorAll("#grid, #list");
const display = document.getElementById("member-container");

// Function to toggle view
function toggleView(view) {
  display.classList.remove("grid", "list");
  display.classList.add(view);
}

// Add event listeners
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleView(button.id); // use button id ("grid" or "list")
  });
});
