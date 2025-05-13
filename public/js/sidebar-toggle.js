document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.querySelector(".aside-toggle");
    const sidebar = document.getElementById("sidebar");
    if (toggleButton && sidebar) {
        toggleButton.addEventListener("click", function () {
            const isActive = sidebar.classList.contains("active");
            sidebar.classList.toggle("active");
            toggleButton.setAttribute("aria-expanded", !isActive);

            // Update button text
            toggleButton.textContent = isActive ? "Show Sidebar" : "Hide Sidebar";
        });
    }
});