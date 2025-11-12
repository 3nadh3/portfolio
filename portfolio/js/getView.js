const fetchVisitorCount = async () => {
    const viewCountElement = document.getElementById("viewCount");
    if (!viewCountElement) return;

    try {
        const now = Date.now();
        const lastVisit = localStorage.getItem("lastVisit");
        const lastCount = localStorage.getItem("visitorCount");

        // ✅ Show temporary placeholder instead of wrong old count
        viewCountElement.innerText = lastCount ? lastCount : "Loading...";

        const shouldFetch =
            !lastVisit || now - parseInt(lastVisit) > 10 * 60 * 1000; // 10 min

        if (shouldFetch) {
            console.log("Fetching updated visitor count...");

            const response = await fetch("https://portfolio-chatbot-ozkz.onrender.com/visitor", {
                cache: "no-store",
            });
            const data = await response.json();

            if (data?.count !== undefined) {
                const newCount = data.count;

                // ✅ Smoothly animate only if there’s a difference
                if (!lastCount || parseInt(lastCount) !== newCount) {
                    animateCount(
                        viewCountElement,
                        parseInt(lastCount || 0),
                        newCount
                    );
                }

                // ✅ Update cache
                localStorage.setItem("visitorCount", newCount);
                localStorage.setItem("lastVisit", now);
            } else {
                console.error("API did not return a valid count:", data);
            }
        } else {
            console.log("Recent visitor, using cached value:", lastCount);
        }
    } catch (error) {
        console.error("Error fetching visitor count:", error);
    }
};

// ✅ Smooth counter animation
const animateCount = (element, start, end) => {
    const duration = 1500; // 1.5 seconds
    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};

// ✅ Observe when counter section appears on screen
const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                fetchVisitorCount();
                counterObserver.unobserve(entry.target); // only once
            }
        });
    },
    { threshold: 0.5 }
);

// ✅ Initialize when page loads
window.onload = () => {
    const counterSection = document.querySelector(".counter-container");
    if (counterSection) {
        counterObserver.observe(counterSection);
    }
};
