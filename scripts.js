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
            title.classList.add('pattern-title');

            const description = document.createElement('p');
            description.textContent = 'Descripción';
            description.classList.add('pattern-subtitle');

            const descriptionText = document.createElement('p');
            descriptionText.textContent = pattern.description;
            descriptionText.classList.add('pattern-description');

            const implementation = document.createElement('pre');
            implementation.textContent = pattern.implementation;
            implementation.classList.add('pattern-implementation');

            const uml = document.createElement('img');
            uml.src = pattern.uml;
            uml.alt = pattern.name + " UML Diagram";

            patternElement.appendChild(title);
            patternElement.appendChild(description);
            patternElement.appendChild(descriptionText);

            const implementationTitle = document.createElement('p');
            implementationTitle.textContent = 'Implementación';
            implementationTitle.classList.add('pattern-subtitle');
            patternElement.appendChild(implementationTitle);
            patternElement.appendChild(implementation);

            const umlTitle = document.createElement('p');
            umlTitle.textContent = 'Diagrama UML';
            umlTitle.classList.add('pattern-subtitle');
            patternElement.appendChild(umlTitle);
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
