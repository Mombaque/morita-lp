document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.createElement('div');
    footerContainer.innerHTML = `
      <h2 style="text-align: center; color: white; margin-top: 2rem;">Como chegar</h2>
      <div style="position: relative; width: 100%; height: 400px;">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.8018589048047!2d-47.448025699999995!3d-23.5036453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cf617d35af8a47%3A0x9305c5aada5d6b5e!2sMorita!5e0!3m2!1spt-BR!2sbr!4v1754033972086!5m2!1spt-BR!2sbr"
          width="100%"
          height="400"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    `;

      const footerElement = document.getElementById('footer-container');
      if (footerElement) {
          footerElement.appendChild(footerContainer);
      }

      // const socialButtons = document.querySelector('.social-buttons');
      // if (socialButtons) {
      //     const addressLink = document.createElement('a');
      //     addressLink.className = 'address';
      //     addressLink.href = 'https://maps.app.goo.gl/pNYYiMimWGa4actz7';
      //     addressLink.textContent = 'Rua Coronel Nogueira Padilha, 429 - Sorocaba, SP';
      //     socialButtons.parentNode.insertBefore(addressLink, socialButtons.nextSibling);
      // }
});