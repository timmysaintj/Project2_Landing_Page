/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const sectionElements = document.querySelectorAll('section');
const navbarList = document.getElementById('navbar__list');
const mybutton = document.getElementById("myBtn");


/**
 * End Global Variables
 * Start Helper Functions
 *
 */
 
/**
 * The Element.getBoundingClientRect() method returns the size of an element and its
 * position relative to the viewport.
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
 */
const isInViewport = function(el) {
  const bounding = el.getBoundingClientRect();
  return (bounding.top <= 250 && bounding.top >= -300);
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

function buildNav() {
  const fragment = document.createDocumentFragment();
  for (const el of sectionElements) {
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'menu__link');
    newLi.setAttribute('data-link', el.id);
    newLi.textContent = el.dataset.nav;
    fragment.appendChild(newLi);
  }
  navbarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport

function activateSectionInView() {
  for (const el of sectionElements) {
    const navListElement = document.querySelector(`.menu__link[data-link='${el.id}']`);
    if (isInViewport(el)) {
      el.classList.add('active-class');
      navListElement.classList.add('active__link');
    } else {
      el.classList.remove('active-class');
      navListElement.classList.remove('active__link');
    }
  }
}

// Scroll to top of page found in w3schools.
//https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
window.onscroll = function(event) {
  scrollFunction(event)
};

function scrollFunction(event) {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 350) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// Scroll to anchor ID using scrollTO event

function scrollToSection(evnt) {
  if (evnt.target.hasAttribute('data-link')) {
    const scrollToElement = document.getElementById(evnt.target.dataset.link);
    window.scrollTo({
      top: scrollToElement.offsetTop - 100,
      behavior: 'smooth'
    });
  }
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
document.addEventListener('DOMContentLoaded', buildNav);
// Scroll to section on link click
navbarList.addEventListener('click', scrollToSection);
// Set sections as active
window.addEventListener('scroll', activateSectionInView, false);
// Set the Top button for click
mybutton.addEventListener('click', (event) => goToTop(event));
// Go to top function
function goToTop(event) {
  document.documentElement.scrollTop = 1
}
