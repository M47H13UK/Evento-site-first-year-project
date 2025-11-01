function showModal() {
    document.getElementById('cardModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('cardModal').style.display = 'none';
}

function submitCardDetails() {
    const title = document.getElementById('cardTitle').value;
    const firstParagraph = document.getElementById('cardParagraph').value;
    const dateTime = document.getElementById('cardDateTime').value;

    if (!title || !firstParagraph || !dateTime) {
        alert("Please fill out all fields");
        return;
    }

    console.log("Card details collected, showing file input dialog");

    document.getElementById('imageInput').click();

    window.newCardDetails = {
        title: title,
        firstParagraph: firstParagraph,
        dateTime: dateTime
    };

    document.getElementById('cardForm').reset();

    closeModal();
}

function handleImageChange(event) {
    console.log("handleImageChange() called");
    const file = event.target.files[0];
    if (!file) {
        console.log("No file selected, exiting handleImageChange()");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const imageUrl = e.target.result;

        console.log("File read successfully, creating new card");

        const gridContainer = document.getElementById('grid-container');

        const newCard = document.createElement('div');
        newCard.classList.add('card');
        
        const newCardImg = document.createElement('img');
        newCardImg.src = imageUrl; 
        newCardImg.alt = window.newCardDetails.title;

        const newCardText = document.createElement('div');
        newCardText.classList.add('card-text');

        const newCardTitle = document.createElement('h3');
        newCardTitle.textContent = window.newCardDetails.title;
        newCardText.appendChild(newCardTitle);

        const newCardFirstParagraph = document.createElement('p');
        newCardFirstParagraph.textContent = window.newCardDetails.firstParagraph;
        newCardText.appendChild(newCardFirstParagraph);

        const newCardCountdown = document.createElement('p');
        newCardCountdown.classList.add('countdown');
        newCardCountdown.setAttribute('data-datetime', window.newCardDetails.dateTime);
        newCardText.appendChild(newCardCountdown);

        newCard.appendChild(newCardImg);
        newCard.appendChild(newCardText);

        gridContainer.insertBefore(newCard, gridContainer.lastElementChild);

        console.log("New card added successfully");

        startCountdown(newCardCountdown);
    };
    reader.readAsDataURL(file);

    event.target.value = '';

    console.log("handleImageChange() completed");
}

document.getElementById('imageInput').addEventListener('change', handleImageChange);

function startCountdown(element) {
    const updateCountdown = () => {
        const now = new Date();
        const eventDate = new Date(element.getAttribute('data-datetime'));
        const timeDiff = eventDate - now;

        if (timeDiff <= 0) {
            element.textContent = "Enjoy the Event";
        } else {
            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            element.textContent = `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
        }
    };

    updateCountdown(); 
    setInterval(updateCountdown, 1000); 
}

document.querySelectorAll('.countdown').forEach(startCountdown);
