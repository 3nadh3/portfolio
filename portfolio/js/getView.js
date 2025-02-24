const fetchVisitorCount = async () => {
    try {
        console.log("Checking if the user is a new visitor...");

        const lastVisit = localStorage.getItem("lastVisit");
        const lastCount = localStorage.getItem("visitorCount"); // Get stored count
        const now = new Date().getTime();
        const viewCountElement = document.getElementById('viewCount');

        // If count exists in localStorage, display it immediately
        if (lastCount !== null) {
            console.log("Displaying stored count:", lastCount);
            viewCountElement.innerText = lastCount;
        } else {
            console.log("No stored count found, setting to 0...");
            viewCountElement.innerText = "0"; // Set to 0 instead of "Loading..."
        }

        if (!lastVisit || now - lastVisit > 10 * 60 * 1000) { // 10 minutes in milliseconds
            console.log("User is a new visitor (or 10 minutes passed), updating count...");

            // Fetch updated count from API
            const response = await fetch('https://portfolio-chatbot-ozkz.onrender.com/visitor');
            const data = await response.json();

            console.log("API Response:", data);

            if (data.count !== undefined) {
                console.log("Updating UI with new count:", data.count);

                // Store new count & visit timestamp
                localStorage.setItem("visitorCount", data.count);
                localStorage.setItem("lastVisit", now);

                // Animate the counter when it becomes visible
                animateCount(viewCountElement, parseInt(viewCountElement.innerText), data.count);
            } else {
                console.error("Error: API did not return a valid count");
            }
        } else {
            console.log("User visited within the last 10 minutes. Not updating count.");
        }
    } catch (error) {
        console.error("Error fetching visitor count:", error);
    }
};

// Function to animate the count
const animateCount = (element, start, end) => {
    let duration = 2000; // 2 seconds
    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        let progress = Math.min((timestamp - startTime) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
};

// Observer to trigger fetch when section is visible
const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                console.log("Counter section is visible, updating count...");
                fetchVisitorCount();
                counterObserver.unobserve(entry.target); // Stop observing after updating
            }
        });
    },
    { threshold: 0.5 } // Trigger when 50% of the section is visible
);

// Run when the page loads
window.onload = () => {
    const counterSection = document.querySelector(".counter-container");
    if (counterSection) {
        counterObserver.observe(counterSection);
    }
};
