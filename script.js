/*
document.addEventListener('DOMContentLoaded', function() {
    // Show modal when page loads
    const modal = document.getElementById('userTypeModal');
    modal.style.display = 'flex';

    // Function to handle role selection
    window.selectRole = function(role) {
        if (role === 'organizer') {
            // Redirect to service provider connection page
            window.location.href = '#connect';
            
        } else if (role === 'provider') {
            // Redirect to provider registration
            window.location.href = '#provider-registration';
        }
        
        // Close the modal
        modal.style.display = 'none';
        
        // Store user preference in localStorage
        localStorage.setItem('userRole', role);
    }

    // Check if user has already selected a role
    const userRole = localStorage.getItem('userRole');
    if (userRole) {
        modal.style.display = 'none';
        if (userRole === 'provider') {
            window.location.href = '#provider-registration';
        }
    }

    // Profile dropdown functionality
    const profileTrigger = document.querySelector('.profile-trigger');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Show/hide profile section based on login status
    function updateProfileVisibility() {
        const profileSection = document.getElementById('profileSection');
        const userRole = localStorage.getItem('userRole');
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn === 'true' && userRole === 'provider') {
            profileSection.style.display = 'block';
        } else {
            profileSection.style.display = 'none';
        }
    }

    // Call this function when page loads and after login/logout
    updateProfileVisibility();

    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");
    
    function showSlides() {
        // Hide all slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        
        // Increment slideIndex
        slideIndex++;
        
        // Reset to first slide if at the end
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        
        // Display current slide
        slides[slideIndex - 1].style.display = "block";
        
        // Call showSlides again after 5 seconds
        setTimeout(showSlides, 5000);
    }

    // Start the slideshow if there are slides
    if (slides.length > 0) {
        showSlides();
    }

    // Wait for document to be ready
    $(document).ready(function() {
        const locationSearch = $('#locationSearch');
        const locationDropdown = $('#locationDropdown');
        const locationOptions = $('.location-option');
        
        // Toggle dropdown on input focus
        locationSearch.on('focus', function() {
            locationDropdown.addClass('active');
        });
        
        // Close dropdown when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.search-style').length) {
                locationDropdown.removeClass('active');
            }
        });
        
        // Search functionality
        locationSearch.on('input', function() {
            const searchText = $(this).val().toLowerCase();
            
            $('.location-option').each(function() {
                const locationText = $(this).text().toLowerCase();
                const locationGroup = $(this).closest('.location-group');
                
                if (locationText.includes(searchText)) {
                    $(this).show();
                    locationGroup.show();
                } else {
                    $(this).hide();
                }
                
                // Hide group if all options are hidden
                if (locationGroup.find('.location-option:visible').length === 0) {
                    locationGroup.hide();
                }
            });
        });
        
        // Select location on click
        locationOptions.on('click', function() {
            const selectedLocation = $(this).text();
            locationSearch.val(selectedLocation);
            locationDropdown.removeClass('active');
        });
        
        // Keyboard navigation
        locationSearch.on('keydown', function(e) {
            const highlighted = $('.location-option.highlighted');
            const visible = $('.location-option:visible');
            
            switch(e.keyCode) {
                case 40: // Down arrow
                    e.preventDefault();
                    if (!highlighted.length) {
                        visible.first().addClass('highlighted');
                    } else {
                        highlighted.removeClass('highlighted')
                            .nextAll('.location-option:visible').first()
                            .addClass('highlighted');
                    }
                    break;
                    
                case 38: // Up arrow
                    e.preventDefault();
                    if (!highlighted.length) {
                        visible.last().addClass('highlighted');
                    } else {
                        highlighted.removeClass('highlighted')
                            .prevAll('.location-option:visible').first()
                            .addClass('highlighted');
                    }
                    break;
                    
                case 13: // Enter
                    if (highlighted.length) {
                        locationSearch.val(highlighted.text());
                        locationDropdown.removeClass('active');
                    }
                    break;
            }
        });
    });

    // Ensure proper cleanup
    $(window).on('unload', function() {
        $('#locationSelect').select2('destroy');
    });
});
*/