/**
 * Coytech - JavaScript Principal (Vanilla JS)
 * Sem dependências externas, código limpo e modular.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initBottomDock();
  initTechAccordion();
  initMobileMenu();
  initDiagnosticForm();
  initFaqAccordion();
  initSmoothScroll();
  initScrollExpandStory();
});

/**
 * Menu Mobile
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('mobileMenuClose');
  const overlay = document.getElementById('mobileMenuOverlay');

  if (!toggleBtn || !drawer) return;

  function openMenu() {
    drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);

  // Fechar ao clicar em qualquer link interno
  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * Formulário de Diagnóstico de Operação (WhatsApp Direct)
 */
function initDiagnosticForm() {
  const form = document.getElementById('diagnosticForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('diagName')?.value.trim() || '';
    const email = document.getElementById('diagEmail')?.value.trim() || '';
    const phone = document.getElementById('diagPhone')?.value.trim() || '';
    const size = document.getElementById('diagSize')?.value || 'Não informado';

    const msg = `Olá! Gostaria de agendar um diagnóstico de observabilidade para minha empresa.%0A%0A*Nome:* ${encodeURIComponent(name)}%0A*E-mail:* ${encodeURIComponent(email)}%0A*WhatsApp:* ${encodeURIComponent(phone)}%0A*Tamanho da Infra:* ${encodeURIComponent(size)}`;

    const waUrl = `https://wa.me/5511999999999?text=${msg}`;
    window.open(waUrl, '_blank');
  });
}

/**
 * FAQ Accordion (opcional para animar abertura suave)
 */
function initFaqAccordion() {
  const faqs = document.querySelectorAll('.faq-item details');
  faqs.forEach(faq => {
    faq.addEventListener('toggle', () => {
      if (faq.open) {
        faqs.forEach(other => {
          if (other !== faq && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
}

/**
 * Scroll Suave para âncoras internas
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/**
 * Seção de Scroll Interativa: Expansão de Marca (Coy ∩ tech) e Revelação de Pílulas + CTA
 */
function initScrollExpandStory() {
  const section = document.querySelector('.plus-story');
  if (!section) return;

  const heading = section.querySelector('.plus-story-heading');
  const stage = section.querySelector('.plus-story-stage');
  const wordmark = section.querySelector('.plus-wordmark');
  const wordmarkLeft = section.querySelector('.plus-wordmark-left');
  const wordmarkRight = section.querySelector('.plus-wordmark-right');
  const wordmarkStar = section.querySelector('.plus-wordmark-star');
  const benefits = section.querySelector('.plus-story-benefits');
  const slotCoy = section.querySelector('.plus-slot-coy') || section.querySelector('.plus-slot-academy');
  const slotTech = section.querySelector('.plus-slot-tech') || section.querySelector('.plus-slot-plus');
  const slotStar = section.querySelector('.plus-slot-star');
  const revealedPills = section.querySelectorAll('.plus-story-benefits [data-plus-reveal]');
  const caption = section.querySelector('.plus-story-caption');
  const footer = section.querySelector('.plus-story-footer');
  const scrollBar = section.querySelector('.plus-scroll-guide span');

  section.setAttribute('data-motion-ready', '');

  function updateSlotDimensions() {
    if (slotCoy && wordmarkLeft) {
      slotCoy.style.width = `${Math.ceil(wordmarkLeft.offsetWidth) + 4}px`;
    }
    if (slotTech && wordmarkRight) {
      slotTech.style.width = `${Math.ceil(wordmarkRight.offsetWidth) + 4}px`;
    }
    if (slotStar && wordmarkStar) {
      slotStar.style.width = `${Math.ceil(wordmarkStar.offsetWidth) + 8}px`;
    }
  }

  updateSlotDimensions();
  window.addEventListener('resize', updateSlotDimensions, { passive: true });

  function getTranslateX(el) {
    if (!el) return 0;
    const style = window.getComputedStyle(el);
    const transform = style.transform || style.webkitTransform;
    if (!transform || transform === 'none') return 0;
    try {
      const matrix = new DOMMatrixReadOnly(transform);
      return matrix.m41 || 0;
    } catch (e) {
      return 0;
    }
  }

  function onScroll() {
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;
    const totalScroll = section.offsetHeight - windowH;

    if (totalScroll <= 0) return;

    // Progresso relativo normalizado de 0 a 1 enquanto a seção está sticky
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

    if (scrollBar) {
      scrollBar.style.transform = `scaleX(${progress})`;
    }

    if (window.innerWidth >= 900 && window.innerHeight >= 600) {
      // Fase 1: Translação matemática para os slots na fita
      if (wordmark && slotCoy && slotTech && slotStar && wordmarkLeft && wordmarkRight && wordmarkStar) {
        const curXLeft = getTranslateX(wordmarkLeft);
        const curXRight = getTranslateX(wordmarkRight);
        const curXStar = getTranslateX(wordmarkStar);

        const baseLeftX = wordmarkLeft.getBoundingClientRect().left - curXLeft;
        const baseRightX = wordmarkRight.getBoundingClientRect().left - curXRight;
        const baseStarX = wordmarkStar.getBoundingClientRect().left - curXStar;

        const targetSlotLeft = slotCoy.getBoundingClientRect().left;
        const targetSlotRight = slotTech.getBoundingClientRect().left;
        const targetSlotStar = slotStar.getBoundingClientRect().left + (slotStar.offsetWidth / 2) - (wordmarkStar.offsetWidth / 2);

        const deltaLeft = targetSlotLeft - baseLeftX;
        const deltaRight = targetSlotRight - baseRightX;
        const deltaStar = targetSlotStar - baseStarX;

        const splitProgress = Math.min(1, progress / 0.52);
        const easeSplit = Math.pow(splitProgress, 1.25);

        wordmarkLeft.style.transform = `translateX(${deltaLeft * easeSplit}px)`;
        wordmarkRight.style.transform = `translateX(${deltaRight * easeSplit}px)`;

        const starScale = Math.max(0.9, 1 - (easeSplit * 0.1));
        wordmarkStar.style.transform = `translateX(${deltaStar * easeSplit}px) scale(${starScale})`;
      }

      // Fase 2 (18% a 65%): Revelação escalonada das pílulas e ícones
      revealedPills.forEach((pill, idx) => {
        const startP = 0.18 + (idx * 0.05);
        const endP = startP + 0.18;
        const pillProg = Math.max(0, Math.min(1, (progress - startP) / (endP - startP)));
        const pillEase = Math.pow(pillProg, 1.2);

        pill.style.opacity = pillEase.toFixed(3);
        pill.style.transform = `translateY(${(1 - pillEase) * 10}px) scale(${0.96 + (pillEase * 0.04)})`;
      });

      // Fase 3 (36% a 78%): Revelação em conjunto do Cabeçalho (Tag + Título), Legenda e Botão CTA
      const textBlockProg = Math.max(0, Math.min(1, (progress - 0.36) / 0.38));
      const textBlockEase = Math.pow(textBlockProg, 1.2);

      if (heading) {
        heading.style.opacity = textBlockEase.toFixed(3);
        heading.style.transform = `translate(-50%, ${(1 - textBlockEase) * -16}px)`;
        heading.style.pointerEvents = textBlockEase > 0.5 ? 'auto' : 'none';
      }

      if (caption) {
        caption.style.opacity = textBlockEase.toFixed(3);
        caption.style.transform = `translate(-50%, ${(1 - textBlockEase) * 14}px)`;
      }

      if (footer) {
        footer.style.opacity = textBlockEase.toFixed(3);
        footer.style.transform = `translate(-50%, ${(1 - textBlockEase) * 16}px) scale(${0.96 + (textBlockEase * 0.04)})`;
        footer.style.pointerEvents = textBlockEase > 0.5 ? 'auto' : 'none';
      }
    } else {
      // Mobile / Compact screens
      if (wordmarkLeft) wordmarkLeft.style.transform = 'none';
      if (wordmarkRight) wordmarkRight.style.transform = 'none';
      if (wordmarkStar) wordmarkStar.style.transform = 'none';

      revealedPills.forEach((pill) => {
        pill.style.opacity = '1';
        pill.style.transform = 'none';
      });

      if (heading) {
        heading.style.opacity = '1';
        heading.style.transform = 'none';
        heading.style.pointerEvents = 'auto';
      }

      if (caption) {
        caption.style.opacity = '1';
        caption.style.transform = 'none';
      }
      if (footer) {
        footer.style.opacity = '1';
        footer.style.transform = 'none';
        footer.style.pointerEvents = 'auto';
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

/**
 * Navbar Flutuante: ativa classe .is-scrolled ao rolar a página
 */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 30) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Barra Flutuante Inferior (Bottom Dock Pill): controle de fechamento
 */
function initBottomDock() {
  const dock = document.getElementById('bottomDockPill');
  const closeBtn = document.getElementById('bottomDockClose');
  if (!dock || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    dock.style.transition = 'all 0.35s ease';
    dock.style.opacity = '0';
    dock.style.transform = 'translate(-50%, 20px) scale(0.95)';
    setTimeout(() => {
      dock.remove();
    }, 350);
  });
}

/**
 * Sanfona de Cards de Tecnologias (Suporte adicional para toque / foco / clique)
 */
function initTechAccordion() {
  const grid = document.querySelector('.tech-cards-grid');
  const cards = document.querySelectorAll('.tech-card-item');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Se clicou no link interno do card, deixa navegar
      if (e.target.closest('a')) return;

      const isExpanded = card.classList.contains('is-expanded');
      cards.forEach(c => c.classList.remove('is-expanded'));
      if (!isExpanded) {
        card.classList.add('is-expanded');
      }
    });
  });

  if (grid) {
    grid.addEventListener('mouseleave', () => {
      cards.forEach(c => c.classList.remove('is-expanded'));
    });
  }
}
