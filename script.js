const divs = document.querySelectorAll('.image-div'); // Assumes all divs have this class
let draggedElement = null;

divs.forEach(div => {
    div.addEventListener('dragstart', function(e) {
        draggedElement = this;
        e.dataTransfer.setData('text/plain', this.className);
        this.style.opacity = '0.4';
    });

    div.addEventListener('dragover', function(e) {
        e.preventDefault(); // Necessary to allow drop
    });

    div.addEventListener('dragenter', function(e) {
        this.classList.add('over'); // Highlight potential drop target
    });

    div.addEventListener('dragleave', function(e) {
        this.classList.remove('over');
    });

    div.addEventListener('dragend', function() {
        this.style.opacity = '1';
        divs.forEach(d => d.classList.remove('over'));
    });

    div.addEventListener('drop', function(e) {
        e.preventDefault();
        
        if (draggedElement !== this) {
            // Swap the background classes
            // Example: "image-div div1" swaps with "image-div div2"
            const draggedClasses = draggedElement.className;
            draggedElement.className = this.className;
            this.className = draggedClasses;
        }
    });
});