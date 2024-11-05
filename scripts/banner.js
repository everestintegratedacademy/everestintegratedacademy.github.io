const banner = document.querySelector(".banner");
const closeBtn = document.querySelector("#close-banner-btn");

closeBtn.addEventListener("click", () => {
    // banner.style.display = "none" // alternative to below
    banner.classList.toggle("none");
});
