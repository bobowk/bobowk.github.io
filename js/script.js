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


let mouseDown = false;
let startX, scrollLeft, velocity, momentumID, mouseDownTime;
const slider = document.querySelector('.scrolling-wrapper');
const friction = 0.9;  // Adjust this value to change the friction effect
const maxVelocity = 20;  // Limit the maximum velocity
const minMovement = 1;  // Minimum movement threshold to prevent snapping
const flickTimeThreshold = 400; // Adjust the time threshold for flicks

const startDragging = (e) => {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  velocity = 0;
  mouseDownTime = new Date().getTime();
  cancelMomentumTracking();
}

const stopDragging = (e) => {
  mouseDown = false;
  const mouseUpTime = new Date().getTime();
  if (Math.abs(velocity) > minMovement && (mouseUpTime - mouseDownTime) < flickTimeThreshold) {
    beginMomentumTracking();
  }
}

const move = (e) => {
  e.preventDefault();
  if (!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scroll = x - startX;
  velocity = (scroll - (slider.scrollLeft - scrollLeft)) * 0.2; // Reduced multiplier for velocity
  slider.scrollLeft = scrollLeft - scroll;
}

const beginMomentumTracking = () => {
  cancelMomentumTracking();
  momentumID = requestAnimationFrame(momentumLoop);
}

const cancelMomentumTracking = () => {
  cancelAnimationFrame(momentumID);
}

const momentumLoop = () => {
  if (Math.abs(velocity) > 0.1) {
    slider.scrollLeft -= velocity;
    velocity *= friction;
    if (Math.abs(velocity) > maxVelocity) {
      velocity = velocity > 0 ? maxVelocity : -maxVelocity;
    }
    momentumID = requestAnimationFrame(momentumLoop);
  }
}

// Add the event listeners
slider.addEventListener('mousemove', move, false);
slider.addEventListener('mousedown', startDragging, false);
slider.addEventListener('mouseup', stopDragging, false);
slider.addEventListener('mouseleave', stopDragging, false);
