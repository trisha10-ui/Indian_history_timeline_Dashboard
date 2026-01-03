async function loadTimeline() {
    try {
        // 1. Fetch the CSV file
        const response = await fetch('excel.csv'); 
        const data = await response.text();

        // 2. Break the CSV into rows
        const rows = data.split('\n').slice(1); // Skip the header row
        const timelineContainer = document.getElementById('timeline');

        rows.forEach(row => {
            // Split row by comma (Assuming standard CSV format)
            const columns = row.split(','); 
            
            if (columns.length >= 4) {
                const year = columns[0];
                const title = columns[1];
                const description = columns[2];
                const imagePath = columns[6]; // Based on your screenshot, ImageLink is the 7th col

                // 3. Create the HTML card
                const card = `
                    <div class="timeline-item">
                        <div class="timeline-date">${year}</div>
                        <div class="timeline-content">
                            <h3>${title}</h3>
                            <img src="${imagePath.trim()}" alt="${title}" onerror="this.src='images/placeholder.jpg'">
                            <p>${description}</p>
                        </div>
                    </div>
                `;
                timelineContainer.innerHTML += card;
            }
        });
    } catch (error) {
        console.error("Error loading timeline:", error);
    }
}

// Run the function when the page loads
window.onload = loadTimeline;