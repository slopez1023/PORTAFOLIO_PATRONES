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

            const descTitle = document.createElement('h3');
            descTitle.textContent = 'Descripción';
            const description = document.createElement('p');
            description.textContent = pattern.description;

            const implTitle = document.createElement('h3');
            implTitle.textContent = 'Implementación';
            const implementation = document.createElement('pre');
            implementation.textContent = pattern.implementation;

            const umlTitle = document.createElement('h3');
            umlTitle.textContent = 'Diagrama UML';
            const uml = document.createElement('img');
            uml.src = pattern.uml;
            uml.alt = pattern.name + " UML Diagram";

            patternElement.appendChild(title);
            patternElement.appendChild(descTitle);
            patternElement.appendChild(description);
            patternElement.appendChild(implTitle);
            patternElement.appendChild(implementation);
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
        })
        .catch(error => console.error('Error fetching patterns:', error));
});
