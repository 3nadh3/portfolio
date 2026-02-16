const BACKEND_URL = "https://portfolio-chatbot-ozkz.onrender.com/visitor";
const MIN_COUNT = 1500;

let backendCountGlobal = null; // store fetched count

// 🔥 wake backend immediately when site opens
async function wakeBackendOnLoad() {
    console.log("Waking backend in background...");

    let success = false;

    while (!success) {
        try {
            const res = await fetch(BACKEND_URL);
            const data = await res.json();

            if (data && data.count !== undefined) {
                backendCountGlobal = parseInt(data.count);
                success = true;
                console.log("Backend awake. Count:", backendCountGlobal);
            } else {
                throw new Error("Invalid response");
            }

        } catch (err) {
            console.log("Backend sleeping... retrying in 4s");
            await new Promise(r => setTimeout(r, 4000));
        }
    }
}

// 🎯 show count when footer visible
function showVisitorCount() {
    const el = document.getElementById("viewCount");
    if (!el) return;

    if (backendCountGlobal === null) {
        el.innerText = "1500+";
        return;
    }

    let finalCount = backendCountGlobal;
    if (finalCount < MIN_COUNT) finalCount = MIN_COUNT;

    animateCount(el, MIN_COUNT, finalCount);
}

// smooth animation
function animateCount(el, start, end) {
    let startTime = null;
    const duration = 1800;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;

        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);

        el.innerText = value + "+";

        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// run when page opens
document.addEventListener("DOMContentLoaded", () => {

    // 🔥 wake backend immediately
    wakeBackendOnLoad();

    // 👀 show count when footer visible
    const section = document.querySelector(".counter-container");
    if (!section) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showVisitorCount();
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
});
