
document.addEventListener("DOMContentLoaded", function () {

    // Select all elements that need scroll animation
    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    // Detect reduced-motion preference
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    // Make all elements visible immediately when reduced motion is enabled
    if (prefersReducedMotion.matches) {
        animatedElements.forEach(element => {
            element.classList.add("in-view");
        });
        return;
    }

    // Fallback for browsers without IntersectionObserver support
    if (!("IntersectionObserver" in window)) {
        animatedElements.forEach(element => {
            element.classList.add("in-view");
        });
        return;
    }

    // Observer configuration
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };

    // Handle elements entering the viewport
    const observerCallback = (entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("in-view");

                // Stop observing after animation starts
                observer.unobserve(entry.target);
            }

        });

    };

    // Create IntersectionObserver
    const scrollObserver = new IntersectionObserver(
        observerCallback,
        observerOptions
    );

    // Observe each animated element
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });

});
