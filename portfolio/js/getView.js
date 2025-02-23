const  fetchVisitorCount = async ()=> {
    try {
        const response = await fetch('https://https://portfolio-chatbot-ozkz.onrender.com/visitor');
        const data = await response.json();
        document.getElementById('viewCount').innerText = data.count;
    } catch (error) {
        console.error('Error fetching visitor count:', error);
    }
}