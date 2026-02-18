
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (!form) return;

    // Detect form type based on URL or content
    let formType = 'Contact Us';
    if (window.location.href.includes('distributor')) formType = 'Distributor';
    if (window.location.href.includes('career')) formType = 'Career';

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};

        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            // For file inputs, just store the name
            if (value instanceof File) {
                data[key] = value.name ? (value.name + ' (' + (value.size / 1024).toFixed(1) + 'KB)') : 'No file';
            } else {
                data[key] = value;
            }
        }

        // Add metadata
        const entry = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            type: formType,
            data: data,
            status: 'New'
        };

        // Save to localStorage
        try {
            const existing = JSON.parse(localStorage.getItem('adminInquiries') || '[]');
            existing.unshift(entry); // Add to top
            localStorage.setItem('adminInquiries', JSON.stringify(existing));

            // Show success and reset
            alert('Thank you! Your details have been submitted successfully.');
            form.reset();
        } catch (err) {
            console.error('Error saving form data:', err);
            alert('Something went wrong. Please try again or contact us directly.');
        }
    });
});
