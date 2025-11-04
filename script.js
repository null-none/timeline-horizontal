const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".article-block");
let lockScroll = false;

function setActive(id) {
  navLinks.forEach((link) => {
    if (link.dataset.target === id) {
      link.classList.add("active");
      link.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    } else {
      link.classList.remove("active");
    }
  });
}

function scrollToSection(section) {
  const nav = document.querySelector(".top-nav");
  const offset = nav ? nav.offsetHeight + 4 : 80;
  const y = section.getBoundingClientRect().top + window.pageYOffset - offset;
  lockScroll = true;
  window.scrollTo({ top: y, behavior: "smooth" });
  setTimeout(() => (lockScroll = false), 500);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.dataset.target;
    const section = document.getElementById(id);
    if (!section) return;
    setActive(id);
    scrollToSection(section);
  });
});

window.addEventListener("scroll", () => {
  if (lockScroll) return;
  const nav = document.querySelector(".top-nav");
  const offset = nav ? nav.offsetHeight + 40 : 110;
  const scrollPos = window.scrollY;
  for (const sec of sections) {
    const top = sec.offsetTop - offset;
    const bottom = top + sec.offsetHeight;
    if (scrollPos >= top && scrollPos < bottom) {
      setActive(sec.id);
      break;
    }
  }
});

setActive("article-1");
