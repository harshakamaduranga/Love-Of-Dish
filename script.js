const myNumber = "94729698328"; // ඔයාගේ WhatsApp Number එක මෙතනට දාන්න (94 සමඟ)

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
                const title = titleMatch ? titleMatch[1].replace(/"/g, "").trim() : "Untitled";
                const image = imageMatch ? imageMatch[1].trim() : "";
                const description = text.split('---').pop().trim();

                const dishCard = `
                    <div class="dish-card">
                        <img src="${image}" alt="${title}" onerror="this.src='https://via.placeholder.com/400x250?text=No+Image'">
                        <div class="dish-content">
                            <h2>${title}</h2>
                            <p>${description.substring(0, 100)}...</p>
                            <button class="order-btn" onclick="openContact('${title}')">Order Now</button>
                        </div>
                    </div>
                `;
                container.innerHTML += dishCard;
            }
        }
    } catch (error) {
        container.innerHTML = "<p class='loading'>Error loading dishes.</p>";
    }
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

// Close modal if clicked outside
window.onclick = function(event) {
    const modal = document.getElementById('contact-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', fetchDishes);
