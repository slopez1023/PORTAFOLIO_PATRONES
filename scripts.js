document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('patterns-container');
    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('#filters button');

    let allPatterns = [];

    function displayPatterns(patterns) {
        container.innerHTML = '';
        patterns.forEach(pattern => {
            const patternElement = document.createElement('div');
            patternElement.classList.add('pattern');

            const title = document.createElement('h2');
            title.textContent = pattern.name;

            const description = document.createElement('p');
            description.textContent = pattern.description;

            const implementation = document.createElement('pre');
            implementation.textContent = pattern.implementation;

            const uml = document.createElement('img');
            uml.src = pattern.uml;
            uml.alt = pattern.name + " UML Diagram";

            patternElement.appendChild(title);
            patternElement.appendChild(description);
            patternElement.appendChild(implementation);
            patternElement.appendChild(uml);

            container.appendChild(patternElement);
        });
    }

    fetch('patterns.json')
        .then(response => response.json())
        .then(data => {
            allPatterns = data;
            displayPatterns(allPatterns);

            searchInput.addEventListener('input', function(event) {
                const searchTerm = event.target.value.toLowerCase();
                const filteredPatterns = allPatterns.filter(pattern =>
                    pattern.name.toLowerCase().includes(searchTerm) ||
                    pattern.description.toLowerCase().includes(searchTerm)
                );
                displayPatterns(filteredPatterns);
            });

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    const filter = this.getAttribute('data-filter');
                    const filteredPatterns = filter === 'All'
                        ? allPatterns
                        : allPatterns.filter(pattern => pattern.category === filter);
                    displayPatterns(filteredPatterns);
                });
            });
        });
});
