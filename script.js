document.addEventListener('DOMContentLoaded', () => {
    async function fetchQuestion() {
        try {
            const response = await fetch('/get-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const lines = data.questions.split('\n').filter(line => line.trim() !== "");
            document.querySelector('.question').textContent = lines[0] || 'No question available';
            const options = document.querySelectorAll('.option');
            for (let i = 0; i < options.length; i++) {
                options[i].textContent = lines[i + 1] || 'Option not available';
            }
        } catch (error) {
            console.error('Error fetching question:', error);
            document.querySelector('.question').textContent = 'Failed to load question.';
        }
    }

    fetchQuestion();

    document.getElementById('next-btn').addEventListener('click', fetchQuestion);
});
