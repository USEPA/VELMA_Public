// suggestion box modal
document.addEventListener('DOMContentLoaded', function() {
    console.log("Suggestion box loaded")
    const suggestionModal = document.getElementById('suggestionModal');
    const modalContent = document.querySelector('.modal-content');
    const closeBtn = document.querySelector('.close');
    const suggestionForm = document.getElementById('suggestionForm');
    const suggestionText = document.getElementById('suggestionText');
    const plusSign = document.getElementsByClassName('plus-sign');
    const main_div = document.getElementById('main_body');
    console.log(plusSign[0])
    plusSign.item(0).addEventListener('click', function() {
        console.log(main_div)
        openModal(main_div);
    });

    // Function to show the plus sign
    function showPlusSign(event) {
        const div = event.target;
        console.log("Adding plus sign to --", div);
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
    // const suggestionBoxes = document.querySelectorAll('.suggesstion-box');
    // const divs = document.getElementsByTagName('div');
    // console.log(divs)
    // Array.from(divs).forEach(box => {
    //     console.log("added listener to", box);
    //     box.addEventListener('mouseenter', showPlusSign);
    //     box.addEventListener('mouseleave', hidePlusSign);
    // });

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
            const json_url = 'https://raw.githubusercontent.com/USEPA/VELMA_Public/refs/heads/develop/docs/public/js/suggestions.json'
            const response = await fetch(json_url, {
                method: 'GET'
            });
            let suggestions = await response.json();

            if (!Array.isArray(suggestions)) {
                suggestions = [];
            }

            suggestions.push(suggestionData);

            await fetch(json_url, {
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