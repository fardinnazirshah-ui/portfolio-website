document.addEventListener("DOMContentLoaded", function () {

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function handleFirstTab(e) {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-user");
      window.removeEventListener("keydown", handleFirstTab);
    }
  }
  window.addEventListener("keydown", handleFirstTab);

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        var targetEl = document.querySelector(targetId);

        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth" });
          history.pushState(null, "", targetId);
        }
      });
    });
  }

  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav a");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  var images = document.querySelectorAll("img");
  images.forEach(function (img) {
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });

});

