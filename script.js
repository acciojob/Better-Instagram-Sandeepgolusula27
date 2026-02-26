// 1. Select all the divs that start with the id "div"
const boxes = document.querySelectorAll('div[id^="div"]');
let draggedBox = null;

boxes.forEach(box => {
    // Ensure the browser knows these can be dragged
    box.setAttribute('draggable', 'true');

    // Store the box being dragged
    box.addEventListener('dragstart', (e) => {
        draggedBox = e.target;
        // Optional: Add a ghosting effect
        e.target.style.opacity = '0.5';
    });

    // Reset the appearance when dragging stops
    box.addEventListener('dragend', (e) => {
        e.target.style.opacity = '1';
        // Clear any highlight classes from other boxes
        boxes.forEach(b => b.style.border = "none");
    });

    // Allow the drop by preventing default browser behavior
    box.addEventListener('dragover', (e) => {
        e.preventDefault();
        // Visual cue: show the user where they are dropping
        e.target.style.border = "2px solid #000";
    });

    // Remove the visual cue when the drag leaves the area
    box.addEventListener('dragleave', (e) => {
        e.target.style.border = "none";
    });

    // The logic to swap the background images
    box.addEventListener('drop', (e) => {
        e.preventDefault();
        e.target.style.border = "none";

        if (draggedBox !== e.target) {
            // Swap the 'backgroundImage' style property directly
            const tempImage = e.target.style.backgroundImage;
            e.target.style.backgroundImage = draggedBox.style.backgroundImage;
            draggedBox.style.backgroundImage = tempImage;
            
            // If your images are labels like "Image 1", swap the text too
            const tempText = e.target.innerText;
            e.target.innerText = draggedBox.innerText;
            draggedBox.innerText = tempText;
        }
    });
});