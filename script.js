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
      // Locate the slider container for the projects.
      const sliderContainer = document.querySelector('.cards-slider');

      // Create a container for the project cards.
      const cardsContainer = document.createElement('div');
      cardsContainer.className = 'cards-container';

      // Build a card for each project from the JSON.
      data.projects.forEach(project => {
        const card = document.createElement('a');
        card.className = 'project-card';
        card.href = project.link;
        card.target = '_blank';
        card.rel = 'noopener noreferrer';

        const banner = document.createElement('img');
        banner.className = 'card-banner';
        banner.src = project.banner;
        banner.alt = `${project.title} Banner`;

        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = project.title;

        const description = document.createElement('p');
        description.className = 'card-description';
        description.textContent = project.description;

        card.appendChild(banner);
        card.appendChild(title);
        card.appendChild(description);

        cardsContainer.appendChild(card);
      });

      // Append the cards container into the slider container.
      sliderContainer.appendChild(cardsContainer);

      // Define constants for animation
      const cardWidth = 300; // width of each card in px
      const gap = 20;        // gap between cards in px
      const offset = cardWidth + gap; // total movement offset (320px)

      // Attach event listeners to the slider arrows.
      const rightArrow = document.querySelector('.right-arrow');
      const leftArrow = document.querySelector('.left-arrow');

      // Right arrow: slide left, then move first card to end.
      rightArrow.addEventListener('click', () => {
        // Animate container moving left.
        cardsContainer.style.transition = 'transform 0.5s ease';
        cardsContainer.style.transform = `translateX(-${offset}px)`;

        // After the transition, move the first card to the end and reset transform.
        cardsContainer.addEventListener('transitionend', function handler() {
          cardsContainer.removeEventListener('transitionend', handler);
          const firstCard = cardsContainer.firstElementChild;
          cardsContainer.appendChild(firstCard);
          // Remove transition and reset transform.
          cardsContainer.style.transition = 'none';
          cardsContainer.style.transform = 'translateX(0)';
          // Force reflow (optional) to apply changes.
          void cardsContainer.offsetWidth;
        });
      });

      // Left arrow: pre-append last card then animate to reveal it.
      leftArrow.addEventListener('click', () => {
        const lastCard = cardsContainer.lastElementChild;
        cardsContainer.insertBefore(lastCard, cardsContainer.firstElementChild);
        // Immediately shift container to left offset (without animation).
        cardsContainer.style.transition = 'none';
        cardsContainer.style.transform = `translateX(-${offset}px)`;
        // Force reflow.
        void cardsContainer.offsetWidth;
        // Animate back to original position.
        cardsContainer.style.transition = 'transform 0.5s ease';
        cardsContainer.style.transform = 'translateX(0)';
      });
    })
    .catch(err => console.error("Error loading projects:", err));
});
