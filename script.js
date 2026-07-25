// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {

  // ========== 1. NAVIGATION FLUIDE (smooth scroll) ==========
  const liensNav = document.querySelectorAll('.navbar a');
  const navUl = document.querySelector('.navbar ul');

  liensNav.forEach(lien => {
    lien.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // On n'active le smooth scroll que pour les ancres internes (#quelquechose)
      if (href.startsWith('#')) {
        e.preventDefault();
        const cible = document.querySelector(href);
        if (cible) {
          cible.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        // Fermer le menu mobile après un clic
        if (navUl && navUl.classList.contains('active')) {
          navUl.classList.remove('active');
        }
      }
    });
  });

  // ========== 2. MENU HAMBURGER (mobile) ==========
  const toggleBtn = document.querySelector('.menu-toggle');
  if (toggleBtn && navUl) {
    toggleBtn.addEventListener('click', function () {
      navUl.classList.toggle('active');
    });
  }

  // ========== 3. EFFET MACHINE À ÉCRIRE (si l'élément existe) ==========
  const typedElement = document.getElementById('typed-text');
  if (typedElement) {
    const texte = "développeur web junior, j'apprends à créer des sites modernes et des systèmes intelligents.";
    let i = 0;
    const vitesse = 50;

    function tapeTexte() {
      if (i < texte.length) {
        typedElement.textContent += texte.charAt(i);
        i++;
        setTimeout(tapeTexte, vitesse);
      }
    }
    tapeTexte();
  }

  // ========== 4. ANIMATION DES COMPÉTENCES AU SURVOL ==========
  const skills = document.querySelectorAll('.skill');
  skills.forEach(skill => {
    skill.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.2)';
      this.style.transition = 'transform 0.2s';
      this.style.color = '#ff6b6b';
    });
    skill.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1)';
      this.style.color = '';
    });
  });

  // ========== 5. FORMULAIRE DE CONTACT (envoi via Formspree sans rechargement) ==========
  const form = document.querySelector('.form');
  const confirmationMsg = document.getElementById('confirmation');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault(); // On bloque l'envoi classique pour tout gérer ici

      // Récupération des valeurs
      const nom = form.nom.value.trim();
      const prenom = form.prenom.value.trim();
      const email = form.email.value.trim();
      const message = form.texte.value.trim();

      // Validation
      if (!nom || !prenom || !email || !message) {
        alert('Veuillez remplir tous les champs.');
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        alert("L'adresse email n'est pas valide.");
        return;
      }

      // Envoi à Formspree (⚠️ REMPLACE TON_ID par ton identifiant)
      fetch('https://formspree.io/f/F2.sg55DsAGLj$i', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: new FormData(form)
      })
      .then(response => {
        if (response.ok) {
          // Succès : on affiche la bannière
          if (confirmationMsg) {
            confirmationMsg.style.display = 'block';
            setTimeout(() => {
              confirmationMsg.style.display = 'none';
            }, 4000);
          } else {
            alert('Message envoyé avec succès !');
          }
          form.reset(); // Vide le formulaire
        } else {
          alert('Erreur lors de l\'envoi. Veuillez réessayer.');
        }
      })
      .catch(() => {
        alert('Erreur réseau. Vérifiez votre connexion.');
      });
    });
  }

});