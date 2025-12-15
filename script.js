document.addEventListener('DOMContentLoaded', function() {
    const phrases = [
        "Best Roblox Scripts",
        "Nice Community",
        "Content Creators",
        "Devs Mostly Active"
    ];

    const textElement = document.querySelector('.dynamic-text');
    const cursorElement = document.querySelector('.cursor'); // Get the cursor element

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; 
    const deletingSpeed = 50;
    const pauseTime = 1500; 
    const blinkInterval = 500; // Standard blink rate for the cursor when paused

    // Function to make the cursor flash on/off
    function toggleCursorFlash(isOn) {
        if (isOn) {
            cursorElement.classList.remove('flashing'); // Show the cursor
        } else {
            cursorElement.classList.add('flashing'); // Hide the cursor
        }
    }
    
    // Set a variable to hold the blinking interval when the process is paused
    let blinkTimer;

    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        // --- 1. Typing/Deleting Logic ---
        if (isDeleting) {
            charIndex--;
            textElement.textContent = currentPhrase.substring(0, charIndex);
        } else {
            charIndex++;
            textElement.textContent = currentPhrase.substring(0, charIndex);
        }
        
        // Make the cursor flash (hide/show) with every character typed
        toggleCursorFlash(!isDeleting); 
        
        // --- 2. Speed and Transition Logic ---
        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentPhrase.length) {
            // Finished typing: Pause, start standard blinking, then start deleting
            clearInterval(blinkTimer); // Clear typing-flash
            blinkTimer = setInterval(() => {
                cursorElement.classList.toggle('flashing');
            }, blinkInterval);
            
            isDeleting = true;
            speed = pauseTime; // Use pause time before deletion
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting: Stop standard blinking, move to next phrase
            clearInterval(blinkTimer);
            toggleCursorFlash(true); // Ensure cursor is visible before typing starts
            
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 300; // Short pause before typing the new phrase
        }
        
        // --- 3. Set the Next Interval ---
        setTimeout(typeWriter, speed);
    }

    // Start the process
    typeWriter();
});
