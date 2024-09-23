// suggestion box modal
document.addEventListener('DOMContentLoaded', function() {
    const suggestionModal = document.getElementById('suggestionModal');
    const modalContent = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.close');
    const suggestionForm = document.getElementById('suggestionForm');
    const suggestionText = document.getElementById('suggestionText');

    // Function to show the plus sign
    function showPlusSign(event) {
        const div = event.target;
        const plusSign = document.createElement('div');
        plusSign.className = 'plus-sign';
        plusSign.textContent = '+';
        div.appendChild(plusSign);

        plusSign.addEventListener('click', function() {
            openModal(div.id);
        });
    }

    // Function to hide the plus sign
    function hidePlusSign(event) {
        const div = event.target;
        const plusSign = div.querySelector('.plus-sign');
        if (plusSign) {
            div.removeChild(plusSign);
        }
    }

    // Function to open the modal
    function openModal(divId) {
        suggestionModal.style.display = 'block';
        suggestionForm.dataset.divId = divId;
    }

    // Function to close the modal
    function closeModal() {
        suggestionModal.style.display = 'none';
        suggestionText.value = '';
    }

    // Add event listeners to suggestion boxes
    const suggestionBoxes = document.querySelectorAll('.suggesstion-box');
    suggestionBoxes.forEach(box => {
        box.addEventListener('mouseenter', showPlusSign);
        box.addEventListener('mouseleave', hidePlusSign);
    });

    // Close the modal when the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target == suggestionModal) {
            closeModal();
        }
    });

    // Close the modal when the user clicks the close button
    closeBtn.addEventListener('click', closeModal);

    // Handle form submission
    suggestionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const divId = suggestionForm.dataset.divId;
        const suggestion = suggestionText.value;
        const fileName = window.location.pathname.split('/').pop();

        const suggestionData = {
            file: fileName,
            div: divId,
            suggestion: suggestion
        };

        saveSuggestion(suggestionData);
        closeModal();
    });

    // Function to save the suggestion to a JSON file
    async function saveSuggestion(suggestionData) {
        try {
            const response = await fetch('suggestions.json', {
                method: 'GET'
            });
            let suggestions = await response.json();

            if (!Array.isArray(suggestions)) {
                suggestions = [];
            }

            suggestions.push(suggestionData);

            await fetch('suggestions.json', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(suggestions)
            });

            alert('Suggestion submitted successfully!');
        } catch (error) {
            console.error('Error saving suggestion:', error);
            alert('Failed to submit suggestion. Please try again later.');
        }
    }
});