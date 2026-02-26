//your code here
// 1. Select all the image divs
const divs = document.querySelectorAll('div[id^="div"]');
let draggedElement = null;

divs.forEach(div => {
    // Make sure elements are draggable
    div.setAttribute('draggable', 'true');

    // 2. Drag Start: Store the element being dragged
    div.addEventListener('dragstart', (e) => {
        draggedElement = e.target;
        e.dataTransfer.effectAllowed = 'move';
        // Add a class for visual feedback
        e.target.classList.add('dragging');
    });

    // 3. Drag End: Cleanup classes
    div.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
        draggedElement = null;
    });

    // 4. Drag Over: Necessary to allow a drop
    div.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        e.dataTransfer.dropEffect = 'move';
    });

    // 5. Drop: The actual swapping logic
    div.addEventListener('drop', (e) => {
        e.preventDefault();
        
        if (draggedElement !== e.target) {
            // Swap the background images by swapping IDs
            // Since your CSS applies backgrounds based on ID
            let droppedElement = e.target;

            // Store temporary ID of the target
            let tempId = droppedElement.id;
            
            // Perform the swap
            droppedElement.id = draggedElement.id;
            draggedElement.id = tempId;
        }
    });
});