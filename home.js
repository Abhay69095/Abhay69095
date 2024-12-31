document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds
    
    // Function to reset all slides
    function resetSlides() {
        slides.forEach(slide => {
            slide.style.display = 'none';
            slide.style.opacity = '0';
        });
    }
    
    // Function to show specific slide
    function showSlide(index) {
        resetSlides();
        slides[index].style.display = 'block';
        
        // Trigger reflow
        slides[index].offsetHeight;
        
        // Fade in
        slides[index].style.opacity = '1';
    }
    
    // Function to move to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Initialize first slide
    showSlide(0);
    
    // Start slideshow
    setInterval(nextSlide, slideInterval);
});

// Sample provider data organized by category
const providersByCategory = {
    catering: [
        {
            image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
            name: "Gourmet Delights Catering",
            rating: 4.5,
            description: "Exquisite catering for all types of events",
            tags: ["Corporate", "Weddings", "Private Events"],
        },
        {
            image: "https://images.unsplash.com/photo-1555244162-803834f70033",
            name: "Elite Food Services",
            rating: 4.8,
            description: "Specialized in international cuisine",
            tags: ["Weddings", "Corporate", "Parties"],
        }
    ],
    photography: [
        {
            image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07",
            name: "Capture Moments Studio",
            rating: 5.0,
            description: "Professional photography and videography services",
            tags: ["Weddings", "Corporate", "Events"],
        },
        {
            image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d",
            name: "Light & Shadow Photography",
            rating: 4.7,
            description: "Capturing your special moments perfectly",
            tags: ["Portraits", "Events", "Commercial"],
        }
    ],
    decoration: [
        {
            image: "https://images.unsplash.com/photo-1478146059778-26028b07395a",
            name: "Elegant Events Decor",
            rating: 4.9,
            description: "Transforming spaces into magical environments",
            tags: ["Weddings", "Corporate", "Themed"],
        },
        {
            image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
            name: "Creative Spaces Design",
            rating: 4.6,
            description: "Innovative decoration solutions for every occasion",
            tags: ["Parties", "Corporate", "Festivals"],
        }
    ],
    entertainment: [
        {
            image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
            name: "Rhythm Masters",
            rating: 4.8,
            description: "Professional DJ and live music services",
            tags: ["Weddings", "Parties", "Corporate"],
        },
        {
            image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
            name: "Event Entertainers Co.",
            rating: 4.7,
            description: "Complete entertainment solutions for events",
            tags: ["Live Shows", "Parties", "Festivals"],
        }
    ],
    venues: [
        {
            image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
            name: "Grand Plaza Events",
            rating: 4.9,
            description: "Luxurious venues for memorable occasions",
            tags: ["Weddings", "Corporate", "Conferences"],
        },
        {
            image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329",
            name: "Urban Event Spaces",
            rating: 4.6,
            description: "Modern venues in prime city locations",
            tags: ["Parties", "Meetings", "Exhibitions"],
        }
    ],
    gifts: [
        {
            image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
            name: "Memorable Gifts Co.",
            rating: 4.7,
            description: "Unique and personalized gift solutions",
            tags: ["Corporate", "Personal", "Custom"],
        },
        {
            image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a",
            name: "Gift & Favors Studio",
            rating: 4.5,
            description: "Creative event favors and gift packages",
            tags: ["Weddings", "Corporate", "Parties"],
        }
    ]
};

// Function to generate star rating HTML
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    return `${starsHTML}<span>(${rating})</span>`;
}

// Function to display providers for selected category
function displayProviders(category) {
    const providersGrid = document.getElementById('providersGrid');
    const providers = providersByCategory[category] || [];
    
    if (providers.length === 0) {
        providersGrid.innerHTML = `
            <div class="no-providers">
                <i class="fas fa-search"></i>
                <p>No providers found for this category</p>
            </div>
        `;
        return;
    }
    
    providersGrid.innerHTML = providers.map(provider => `
        <div class="provider-card">
            <div class="provider-image">
                <img src="${provider.image}" alt="${provider.name}">
            </div>
            <div class="provider-info">
                <h3>${provider.name}</h3>
                <div class="rating">
                    ${generateStarRating(provider.rating)}
                </div>
                <p>${provider.description}</p>
                <div class="provider-tags">
                    ${provider.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
                <button class="contact-provider">Contact Provider</button>
            </div>
        </div>
    `).join('');
}

// Add click event listeners to category items
document.addEventListener('DOMContentLoaded', () => {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all categories
            categoryItems.forEach(cat => cat.classList.remove('active'));
            // Add active class to clicked category
            item.classList.add('active');
            
            // Get category name from the span text and convert to lowercase
            const categoryName = item.querySelector('span').textContent.toLowerCase();
            displayProviders(categoryName);
        });
    });
});

// Add some CSS styles for the no-providers state
const style = document.createElement('style');
style.textContent = `
    .no-providers {
        text-align: center;
        padding: 2rem;
        grid-column: 1 / -1;
    }
    
    .no-providers i {
        font-size: 3rem;
        color: #ccc;
        margin-bottom: 1rem;
    }
    
    .no-providers p {
        color: #666;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);

// Show modal when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        document.getElementById('authModal').style.display = 'flex';
    }
});

function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    tabs.forEach(t => t.classList.remove('active'));
    if (tab === 'login') {
        tabs[0].classList.add('active');
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        tabs[1].classList.add('active');
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.querySelector('#loginForm input[type="email"]').value;
    const password = document.querySelector('#loginForm input[type="password"]').value;

    try {
        // Add your authentication logic here
        // For example:
        // const response = await authenticateUser(email, password);
        
        // Temporary simulation of successful login
        const userData = {
            fullName: 'John Doe',
            email: email,
            profileImageUrl: 'default-avatar.png'
        };

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));

        // Update UI
        document.getElementById('authModal').style.display = 'none';
        updateProfileDisplay(userData);
        
        // Optional: Redirect to dashboard
        // window.location.href = 'dashboard.html';
    } catch (error) {
        console.error('Login failed:', error);
        // Handle login error (show message to user)
    }
}

function handleSignup(event) {
    event.preventDefault();
    // Add your signup logic here
    localStorage.setItem('isLoggedIn', 'true');
    document.getElementById('authModal').style.display = 'none';
    return false;
}

// Update the Profile Dropdown Functionality - Consolidate the DOMContentLoaded events
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slideshow and other existing functionality
    initializeSlideshow();
    
    // Initialize profile and dropdown functionality
    initializeProfileAndDropdown();
    
    // Initialize auth modal
    initializeAuthModal();
});

function initializeProfileAndDropdown() {
    const profileTrigger = document.getElementById('profileTrigger');
    const profileDropdown = document.getElementById('profileDropdown');
    const userAvatar = document.getElementById('userAvatar');
    const userDisplayName = document.getElementById('userDisplayName');

    // Check if user is logged in and update display
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        updateProfileDisplay(userData);
    }

    // Toggle dropdown
    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle the dropdown
            const isVisible = profileDropdown.style.display === 'block';
            profileDropdown.style.display = isVisible ? 'none' : 'block';
            
            // Toggle the arrow rotation
            profileTrigger.classList.toggle('active', !isVisible);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target) && !profileTrigger.contains(e.target)) {
                profileDropdown.style.display = 'none';
                profileTrigger.classList.remove('active');
            }
        });
    }
}

function initializeAuthModal() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        const authModal = document.getElementById('authModal');
        if (authModal) {
            authModal.style.display = 'flex';
        }
    }
}

// Authentication Check
function checkAuthStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginButton = document.getElementById('loginButton');
    const profileSection = document.querySelector('.profile-section');

    if (isLoggedIn === 'true') {
        if (loginButton) loginButton.style.display = 'none';
        if (profileSection) profileSection.style.display = 'flex';
    } else {
        if (loginButton) loginButton.style.display = 'block';
        if (profileSection) profileSection.style.display = 'none';
    }
}

// Logout Handler
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    
    // Reset UI to default state
    const userAvatar = document.getElementById('userAvatar');
    const userDisplayName = document.getElementById('userDisplayName');
    
    if (userDisplayName) {
        userDisplayName.textContent = 'Guest';
    }
    
    if (userAvatar) {
        userAvatar.src = 'default-avatar.png';
    }
    
    // Show auth modal
    document.getElementById('authModal').style.display = 'flex';
}

// Update Profile Information
function updateProfileInfo(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
    const userDisplayName = document.getElementById('userDisplayName');
    const userAvatar = document.getElementById('userAvatar');
    
    if (userDisplayName) userDisplayName.textContent = userData.fullName;
    if (userAvatar && userData.profileImageUrl) {
        userAvatar.src = userData.profileImageUrl;
    }
}

// Update profile display function
function updateProfileDisplay(userData) {
    const userAvatar = document.getElementById('userAvatar');
    const userDisplayName = document.getElementById('userDisplayName');
    
    if (userDisplayName) {
        userDisplayName.textContent = userData.fullName;
    }
    
    if (userAvatar && userData.profileImageUrl) {
        userAvatar.src = userData.profileImageUrl;
    }
}

// Update form switching function
function switchForm(formType) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginSwitch = document.getElementById('loginSwitch');
    const registerSwitch = document.getElementById('registerSwitch');

    if (formType === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        loginSwitch.style.display = 'none';
        registerSwitch.style.display = 'block';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        loginSwitch.style.display = 'block';
        registerSwitch.style.display = 'none';
    }
}

// Initialize profile section
function initializeProfile() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        updateProfileDisplay(userData);
    }
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProfile();
    // ... rest of your existing DOMContentLoaded code
}); 