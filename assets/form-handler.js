
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        try {
            const response = await fetch('../api/submit_inquiry.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert('Thank you! Your details have been submitted successfully.');
                form.reset();
            } else {
                alert('Error: ' + (result.message || 'Something went wrong.'));
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Something went wrong. Please check your internet connection and try again.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});
