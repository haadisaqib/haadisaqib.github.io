document.querySelectorAll('.nav-right a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  fetch('projects.json')
    .then(response => response.json())
    .then(data => {
      // Locate the projects section by its ID.
      const projectsSection = document.getElementById('projects');
      
      // Create a container for the project cards.
      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'cards-container';
      
      // Iterate through each project in the JSON file.
      data.projects.forEach(project => {
        // Create an anchor element for the clickable card.
        const card = document.createElement('a');
        card.className = 'project-card';
        card.href = project.link;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
        
        // Create and configure the banner image.
        const banner = document.createElement('img');
        banner.className = 'card-banner';
        banner.src = project.banner;
        banner.alt = `${project.title} Banner`;
        
        // Create the title element.
        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = project.title;
        
        // Create the description element.
        const description = document.createElement('p');
        description.className = 'card-description';
        description.textContent = project.description;
        
        // Append the banner, title, and description to the card.
        card.appendChild(banner);
        card.appendChild(title);
        card.appendChild(description);
        
        // Append the card to the container.
        cardsContainer.appendChild(card);
      });
      
      // Append the cards container to the Projects section.
      projectsSection.appendChild(cardsContainer);
    })
    .catch(err => console.error("Error loading projects:", err));
});
