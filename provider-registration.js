document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('providerRegistrationForm');
    const imageInput = document.getElementById('portfolio');
    const imagePreview = document.getElementById('imagePreview');

    // Handle image preview
    imageInput.addEventListener('change', function(e) {
        const files = e.target.files;
        
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.classList.add('preview-image');
                    
                    // Add remove button
                    const container = document.createElement('div');
                    container.classList.add('image-preview-container');
                    const removeBtn = document.createElement('button');
                    removeBtn.innerHTML = '×';
                    removeBtn.classList.add('remove-image');
                    removeBtn.onclick = function() {
                        container.remove();
                    };
                    
                    container.appendChild(img);
                    container.appendChild(removeBtn);
                    imagePreview.appendChild(container);
                }
                reader.readAsDataURL(file);
            }
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Get all form values
        const formData = {
            businessName: document.getElementById('businessName').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            serviceType: document.getElementById('serviceType').value,
            description: document.getElementById('description').value,
            website: document.getElementById('website').value,
            socialMedia: document.getElementById('socialMedia').value,
            experience: document.getElementById('experience').value,
            serviceAreas: Array.from(document.querySelectorAll('input[name="serviceArea"]:checked'))
                .map(checkbox => checkbox.value),
            portfolio: [] // Will store portfolio image URLs
        };

        // Get portfolio images
        const portfolioImages = document.querySelectorAll('#imagePreview img');
        portfolioImages.forEach(img => {
            formData.portfolio.push(img.src);
        });

        // Store in localStorage
        localStorage.setItem('userData', JSON.stringify({
            ...formData,
            profileImageUrl: 'default-avatar.png',
            userType: 'provider'
        }));

        // Redirect to profile page
        window.location.href = 'provider-profile.html';
    });

    // Handle cancel button
    document.querySelector('.cancel-btn').addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel registration?')) {
            window.location.href = 'index.html';
        }
    });
}); 