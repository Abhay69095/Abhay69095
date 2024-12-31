document.addEventListener('DOMContentLoaded', function() {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        window.location.href = 'home.html';
        return;
    }

    // Update profile header information
    document.getElementById('businessName').textContent = userData.businessName || 'Business Name';
    document.getElementById('providerName').textContent = 
        `${userData.firstName || ''} ${userData.lastName || ''}`;
    document.getElementById('serviceType').textContent = formatServiceType(userData.serviceType);
    document.getElementById('experienceYears').textContent = userData.experience || '0';

    // Update avatar if available
    if (userData.profileImageUrl) {
        document.getElementById('providerAvatar').src = userData.profileImageUrl;
        document.getElementById('userAvatar').src = userData.profileImageUrl;
    }

    // Update user display name in nav
    document.getElementById('userDisplayName').textContent = userData.businessName;

    // Update contact information
    document.getElementById('emailDisplay').textContent = userData.email || 'Not provided';
    document.getElementById('phoneDisplay').textContent = userData.phone || 'Not provided';
    document.getElementById('websiteDisplay').textContent = userData.website || 'Not provided';
    
    if (userData.website) {
        document.getElementById('websiteDisplay').innerHTML = 
            `<a href="${userData.website}" target="_blank">${userData.website}</a>`;
    }

    // Update description/about section
    document.getElementById('description').textContent = userData.description || 
        'No description provided yet.';

    // Update service areas
    updateServiceAreas(userData.serviceAreas);

    // Update social media links
    updateSocialLinks(userData.socialMedia);

    // Initialize portfolio section
    initializePortfolio(userData.portfolio);
});

// Format service type for display
function formatServiceType(type) {
    if (!type) return 'Service Provider';
    return type.charAt(0).toUpperCase() + type.slice(1);
}

// Update service areas
function updateServiceAreas(areas) {
    const serviceAreasContainer = document.getElementById('serviceAreas');
    if (!serviceAreasContainer) return;

    if (!areas || areas.length === 0) {
        serviceAreasContainer.innerHTML = '<p>No service areas specified</p>';
        return;
    }

    const areaIcons = {
        'weddings': 'fa-ring',
        'corporate': 'fa-building',
        'parties': 'fa-glass-cheers',
        'conferences': 'fa-users'
    };

    const areaHTML = areas.map(area => `
        <div class="service-tag">
            <i class="fas ${areaIcons[area.toLowerCase()] || 'fa-check'}"></i>
            ${area}
        </div>
    `).join('');

    serviceAreasContainer.innerHTML = areaHTML;
}

// Update social media links
function updateSocialLinks(socialMedia) {
    const socialLinksContainer = document.getElementById('socialLinks');
    if (!socialLinksContainer) return;

    if (!socialMedia) {
        socialLinksContainer.innerHTML = '<p>No social media links provided</p>';
        return;
    }

    const links = socialMedia.split(',').map(link => link.trim());
    const socialHTML = links.map(link => {
        const platform = getSocialPlatform(link);
        return `
            <a href="${link}" class="social-link ${platform.name}" target="_blank" 
               title="${platform.name}">
                <i class="fab ${platform.icon}"></i>
            </a>
        `;
    }).join('');

    socialLinksContainer.innerHTML = `
        <h3>Social Media</h3>
        <div class="social-links-grid">
            ${socialHTML}
        </div>
    `;
}

// Helper function to determine social media platform
function getSocialPlatform(url) {
    const platforms = {
        'facebook.com': { name: 'facebook', icon: 'fa-facebook-f' },
        'instagram.com': { name: 'instagram', icon: 'fa-instagram' },
        'linkedin.com': { name: 'linkedin', icon: 'fa-linkedin-in' },
        'twitter.com': { name: 'twitter', icon: 'fa-twitter' }
    };

    for (let [domain, platform] of Object.entries(platforms)) {
        if (url.includes(domain)) return platform;
    }
    return { name: 'website', icon: 'fa-globe' };
}

// Initialize portfolio section
function initializePortfolio(portfolio) {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;

    if (!portfolio || portfolio.length === 0) {
        portfolioGrid.innerHTML = `
            <div class="empty-portfolio">
                <i class="fas fa-images"></i>
                <p>No portfolio images added yet</p>
                <button class="add-photos-btn">
                    <i class="fas fa-plus"></i>
                    Add Photos
                </button>
            </div>
        `;
        return;
    }

    const portfolioHTML = portfolio.map(image => `
        <div class="portfolio-item">
            <img src="${image}" alt="Portfolio item">
            <div class="portfolio-item-overlay">
                <button class="delete-photo">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');

    portfolioGrid.innerHTML = portfolioHTML;

    // Add event listeners for delete buttons
    portfolioGrid.querySelectorAll('.delete-photo').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            userData.portfolio.splice(index, 1);
            localStorage.setItem('userData', JSON.stringify(userData));
            initializePortfolio(userData.portfolio);
        });
    });
}

// Handle profile edit button
document.querySelector('.edit-btn')?.addEventListener('click', function() {
    // Store current page URL in session storage
    sessionStorage.setItem('returnToProfile', window.location.href);
    // Redirect to edit page
    window.location.href = 'edit-profile.html';
});

// Handle avatar edit button
document.querySelector('.edit-avatar')?.addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const userData = JSON.parse(localStorage.getItem('userData'));
                userData.profileImageUrl = event.target.result;
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Update all instances of the avatar
                document.getElementById('providerAvatar').src = event.target.result;
                document.getElementById('userAvatar').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}); 