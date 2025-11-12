const fetchVisitorCount = async () => {
    try {
        console.log("Checking visitor status...");

        const lastVisit = localStorage.getItem("lastVisit");
        const storedCount = parseInt(localStorage.getItem("visitorCount")) || 0;
        const now = Date.now();
        const viewCountElement = document.getElementById('viewCount');

        // Show stored value immediately
        viewCountElement.innerText = storedCount;

        // Only fetch if 10 min passed
        if (!lastVisit || now - lastVisit > 10 * 60 * 1000) {
            console.log("Fetching updated count...");

            const response = await fetch('https://portfolio-chatbot-ozkz.onrender.com/visitor');
            const data = await response.json();

            if (data && data.count !== undefined) {
                const newCount = parseInt(data.count);

                // ✅ Only update if API value is higher
                if (newCount > storedCount) {
                    console.log(`Updating from ${storedCount} → ${newCount}`);
                    animateCount(viewCountElement, storedCount, newCount);
                    localStorage.setItem("visitorCount", newCount);
                    localStorage.setItem("lastVisit", now);
                } else {
                    console.log(`Keeping stored count ${storedCount}, API returned ${newCount}`);
                }
            } else {
                console.error("Invalid API response");
            }
        } else {
            console.log("Visited recently — using cached count.");
        }
    } catch (err) {
        console.error("Error fetching visitor count:", err);
    }
};

// Animation (unchanged)
const animateCount = (element, start, end) => {
    let duration = 2000;
    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
};

// Observer
const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                fetchVisitorCount();
                counterObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

window.onload = () => {
    const counterSection = document.querySelector(".counter-container");
    if (counterSection) counterObserver.observe(counterSection);
};
