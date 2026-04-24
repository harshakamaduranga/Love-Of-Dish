const myNumber = "94729698328"; // Update this with your WhatsApp/Call number

async function fetchDishes() {
    const container = document.getElementById('dish-container');
    const username = 'harshakamaduranga';
    const repo = 'Love-Of-Dish';

    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/content/dishes`);
        if (!response.ok) throw new Error("Could not fetch dishes");

        const files = await response.json();
        if (files.length === 0) {
            container.innerHTML = "<p class='loading'>No dishes found. Add your first dish from Admin Panel!</p>";
            return;
        }

        container.innerHTML = "";

        for (const file of files) {
            if (file.name.endsWith('.md')) {
                const fileData = await fetch(file.download_url);
                const text = await fileData.text();

                const titleMatch = text.match(/title: (.*)/);
                const imageMatch = text.match(/image: (.*)/);
                const videoMatch = text.match(/video: (.*)/);
                
                const title = titleMatch ? titleMatch[1].replace(/"/g, "").trim() : "Untitled";
                const image = imageMatch ? imageMatch[1].trim() : "";
                const videoLink = videoMatch ? videoMatch[1].replace(/"/g, "").trim() : "";
                const description = text.split('---').pop().trim();

                let mediaHTML = `<img src="${image}" alt="${title}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">`;
                
                if (videoLink && videoLink !== "") {
                    const embedUrl = getEmbedUrl(videoLink);
                    if(embedUrl) {
                        mediaHTML = `<iframe src="${embedUrl}" allowfullscreen></iframe>`;
                    }
                }

                const dishCard = `
                    <div class="dish-card">
                        <div class="media-container">${mediaHTML}</div>
                        <div class="dish-content">
                            <h2>${title}</h2>
                            <p>${description.substring(0, 110)}...</p>
                            <button class="order-btn" onclick="openContact('${title}')">Order Now</button>
                        </div>
                    </div>
                `;
                container.innerHTML += dishCard;
            }
        }
    } catch (error) {
        container.innerHTML = "<p class='loading'>Error loading dishes from GitHub.</p>";
    }
}

// Function to convert YouTube/Vimeo links to embed links
function getEmbedUrl(url) {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length == 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
    }
    if (url.includes('vimeo.com')) {
        const regExp = /vimeo.com\/(\d+)/;
        const match = url.match(regExp);
        return match ? `https://player.vimeo.com/video/${match[1]}` : null;
    }
    return null;
}

function openContact(dishName) {
    const modal = document.getElementById('contact-modal');
    const modalTitle = document.getElementById('modal-title');
    const whatsappLink = document.getElementById('whatsapp-link');

    modalTitle.innerText = "Order " + dishName;
    const message = encodeURIComponent("Hi Love of Dish! I would like to order: " + dishName);
    whatsappLink.href = `https://wa.me/${myNumber}?text=${message}`;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('contact-modal').style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById('contact-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', fetchDishes);
