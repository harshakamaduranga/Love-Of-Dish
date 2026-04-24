async function fetchDishes() {
    const container = document.getElementById('dish-container');
    const username = 'harshakamaduranga'; // ඔයාගේ GitHub Username එක
    const repo = 'Love-Of-Dish';       // ඔයාගේ Repository නම

    try {
        // GitHub API එක හරහා dishes ලිස්ට් එක ලබා ගැනීම
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/content/dishes`);
        
        if (!response.ok) {
            throw new Error("Could not fetch dishes from GitHub");
        }

        const files = await response.json();

        if (files.length === 0) {
            container.innerHTML = "<p class='loading'>No dishes found. Add your first dish from the Admin Panel!</p>";
            return;
        }

        container.innerHTML = ""; // Loading message එක ඉවත් කිරීම

        for (const file of files) {
            if (file.name.endsWith('.md')) {
                const fileData = await fetch(file.download_url);
                const text = await fileData.text();

                // Markdown විස්තර වෙන් කර ගැනීම
                const titleMatch = text.match(/title: "(.*)"/) || text.match(/title: (.*)/);
                const imageMatch = text.match(/image: (.*)/);
                
                const title = titleMatch ? titleMatch[1].replace(/"/g, "") : "Untitled Dish";
                const image = imageMatch ? imageMatch[1].trim() : "";
                
                // Description එක Markdown file එකේ අවසාන කොටසින් ලබා ගැනීම
                const description = text.split('---').pop().trim();

                // වෙබ් අඩවියේ පෙන්වන Card එක
                const dishCard = `
                    <div class="dish-card">
                        <img src="${image}" alt="${title}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
                        <div class="dish-content">
                            <h2>${title}</h2>
                            <p>${description.substring(0, 120)}...</p>
                            <button class="view-btn">View Recipe</button>
                        </div>
                    </div>
                `;
                container.innerHTML += dishCard;
            }
        }
    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = "<p class='loading'>Error loading dishes. Please try again later.</p>";
    }
}

// සයිට් එක Load වූ පසු Function එක ක්‍රියාත්මක කිරීම
document.addEventListener('DOMContentLoaded', fetchDishes);
