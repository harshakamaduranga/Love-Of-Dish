// Pop-up එක පෙන්වන Function එක
function openContact(dishName) {
    const modal = document.getElementById('contact-modal');
    const modalTitle = document.getElementById('modal-title');
    const whatsappLink = document.getElementById('whatsapp-link');

    modalTitle.innerText = "Order " + dishName;
    
    // WhatsApp එකට message එකක් යන ලින්ක් එක (ඔයාගේ number එක මෙතනට දාන්න)
    const myNumber = "947XXXXXXXX"; // උදා: 94771234567
    const message = encodeURIComponent("Hi Love of Dish! I would like to order: " + dishName);
    whatsappLink.href = `https://wa.me/${myNumber}?text=${message}`;

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById('contact-modal').style.display = "none";
}

// කලින් තිබූ fetchDishes function එකේ dishCard එක මෙහෙම වෙනස් කරන්න
// ඉහත code එකට පහත dishCard කොටස update කරන්න:
/*
const dishCard = `
    <div class="dish-card">
        <img src="${image}" alt="${title}">
        <div class="dish-content">
            <h2>${title}</h2>
            <p>${description.substring(0, 100)}...</p>
            <button class="order-btn" onclick="openContact('${title}')">Order Now</button>
        </div>
    </div>
`;
*/
