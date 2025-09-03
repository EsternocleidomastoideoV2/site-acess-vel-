// script.js - acessibilidade + "Leia mais" das curiosidades
document.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('botao-acessibilidade');
  const opcoes = document.getElementById('opcoes-acessibilidade');
  const btnAltoContraste = document.getElementById('alto-contraste');
  const btnAumentar = document.getElementById('aumentar-fonte');
  const btnDiminuir = document.getElementById('diminuir-fonte');
  const btnLeiaMais = document.getElementById('btn-leiamais');
  const curiosidadesExtra = document.getElementById('curiosidades-extra');

  // inicia fechado (aria-expanded="false") - já no HTML
  botao.setAttribute('aria-expanded', 'false');
  opcoes.setAttribute('aria-hidden', 'true');

  botao.addEventListener('click', () => {
    const expanded = botao.getAttribute('aria-expanded') === 'true';
    botao.setAttribute('aria-expanded', String(!expanded));
    opcoes.setAttribute('aria-hidden', String(expanded)); // se abriu -> aria-hidden=false
  });

  // Alto contraste: aplica classe no body; CSS cuida das cores
  btnAltoContraste.addEventListener('click', () => {
    document.body.classList.toggle('alto-contraste');
    // opcional: foco visual para confirmar mudança
    document.body.animate([{opacity:.8},{opacity:1}], {duration:180});
  });

  // Fonte (usando root % para ser consistente)
  let fontPct = 100;
  const root = document.documentElement;
  btnAumentar.addEventListener('click', () => {
    fontPct = Math.min(140, fontPct + 10);
    root.style.fontSize = fontPct + '%';
  });
  btnDiminuir.addEventListener('click', () => {
    fontPct = Math.max(80, fontPct - 10);
    root.style.fontSize = fontPct + '%';
  });

  // Leia mais nas curiosidades
  if (btnLeiaMais) {
    btnLeiaMais.addEventListener('click', () => {
      const aberto = !curiosidadesExtra.hidden;
      curiosidadesExtra.hidden = aberto; // toggle
      btnLeiaMais.textContent = aberto ? 'Leia mais ↓' : 'Mostrar menos ↑';
      // smooth scroll para seção quando abrir
      if (!aberto) curiosidadesExtra.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }

  // (opcional) pequenas aparências: fade-in nas seções quando entram em viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.12});
  document.querySelectorAll('section, header, footer').forEach(s => observer.observe(s));
});
