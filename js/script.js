function toggleNav() {
  var navItems = document.getElementById("nav-items");
  var navToggleIcon = document.querySelector(".nav-responsive-toggle i");

  if (navItems.classList.contains("active")) {
      // Close nav bar
      navItems.classList.remove("active");
      navToggleIcon.classList.remove("fa-times");
      navToggleIcon.classList.add("fa-bars");
  } else {
      // Open nav bar
      navItems.classList.add("active");
      navToggleIcon.classList.remove("fa-bars");
      navToggleIcon.classList.add("fa-times");
  }
}

// Add event listeners to each nav link to close nav bar after click
var navLinks = document.querySelectorAll("#nav-items .nav-item");
navLinks.forEach(function(link) {
  link.addEventListener("click", function() {
      toggleNav(); // Close nav bar
  });
});
