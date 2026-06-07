
document.addEventListener("DOMContentLoaded", () => {

  const images = [
    "image/ph1.jpg",
    "image/ph2.jpg",
    "image/ph3.jpg",
    "image/ph4.jpg",
  ];

  let i = 0;
  const bg = document.querySelector(".img");

  function changeBg() {
    bg.style.backgroundImage = `url('${images[i]}')`;
    i = (i + 1) % images.length;
  }

  changeBg(); 
  setInterval(changeBg, 4000);

});
/* ==========================
   HERO IMAGE FADE
========================== */
window.addEventListener("load", () => {
  const heroImg = document.querySelector(".img");

  setTimeout(() => {
    heroImg?.classList.add("show");
  }, 300);
});


/* ==========================
   SCROLL REVEAL
========================== */
const revealElements = document.querySelectorAll(
  ".about-content, .product-card, .avis-card, .cat-big, .cat-small, .section-header"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-reveal");
      }
    });
  },
  {
    threshold: 0.15
  }
);

revealElements.forEach((el) => {
  el.classList.add("hidden-reveal");
  revealObserver.observe(el);
});


/* ==========================
   LOGO PARALLAX
========================== */
const logo = document.querySelector(".logo");

logo?.addEventListener("mousemove", () => {
  logo.style.transform = "translateY(-3px) scale(1.05)";
});

logo?.addEventListener("mouseleave", () => {
  logo.style.transform = "";
});


/* ==========================
   ICON FLOAT
========================== */
const icons = document.querySelectorAll(
  ".left-icon a, .right-icon a"
);

icons.forEach((icon) => {
  icon.addEventListener("mouseenter", () => {

    if (icon.closest(".left-icon")) {
      icon.style.transform =
        "translateX(5px) scale(1.1)";
    } else {
      icon.style.transform =
        "translateX(-5px) scale(1.1)";
    }

  });

  icon.addEventListener("mouseleave", () => {
    icon.style.transform = "";
  });
});


/* ==========================
   CARD TILT EFFECT
========================== */
const cards = document.querySelectorAll(
  ".product-card, .avis-card, .cat-big, .cat-small"
);

cards.forEach((card) => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 18;
    const rotateY = (centerX - x) / 18;

    card.style.transform =
      `perspective(1000px)
       rotateX(${rotateX}deg)
       rotateY(${rotateY}deg)
       translateY(-6px)`;

  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0)";
  });

});


/* ==========================
   COUNTER CART
========================== */
const cartCount = document.querySelector(".cart-count");

if (cartCount) {

  let current = 0;
  const target = parseInt(cartCount.textContent);

  const counter = setInterval(() => {

    if (current >= target) {
      clearInterval(counter);
      return;
    }

    current++;
    cartCount.textContent = current;

  }, 80);

}
/* ==========================
   SHOW CART COUNT AFTER 3s
========================== */

const cartCountElement = document.querySelector(".cart-count");

if (cartCountElement) {
  setTimeout(() => {
    cartCountElement.style.visibility = "visible";
    cartCountElement.style.opacity = "1.5";
  }, 3000);
}
