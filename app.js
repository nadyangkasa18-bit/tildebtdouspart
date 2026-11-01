'use strict';
const cards = window.GAME_CARDS;
const grid = document.querySelector('#card-grid');
const search = document.querySelector('#card-search');
const results = document.querySelector('#card-results');
const empty = document.querySelector('#empty-results');
const dialog = document.querySelector('#card-dialog');
let filter = 'all';
let lastTrigger = null;
function renderCards() {
  const query = search.value.trim().toLowerCase();
  const matches = cards.filter(card => (filter === 'all' || card.group === filter) && `${card.name} ${card.classic} ${card.category} ${card.summary} ${card.effect}`.toLowerCase().includes(query));
  grid.replaceChildren();
  for (const card of matches) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'card-tile'; button.style.setProperty('--tint', card.tint);
    button.setAttribute('aria-label', `${card.name}: ${card.summary} View details`);
    button.setAttribute('aria-haspopup','dialog');
    // Card content is trusted, local source data, never search input.
    button.innerHTML = `<div class="card-image-area"><img src="assets/${card.image}.webp" alt="" loading="lazy" width="221" height="302"></div><div class="card-tile-copy"><h3>${card.name}</h3><p>${card.summary}</p><div class="card-tile-foot"><span>${card.category}</span><span aria-hidden="true">↗</span></div></div>`;
    button.addEventListener('click', () => openCard(card, button));
    grid.append(button);
  }
  results.textContent = `${matches.length} ${matches.length === 1 ? 'card' : 'cards'}${query ? ' found' : ' to know'}`;
  empty.hidden = matches.length !== 0;
}
function openCard(card, trigger) {
  lastTrigger = trigger;
  document.querySelector('#dialog-content').innerHTML = `<div class="dialog-layout" style="--tint:${card.tint}"><div class="dialog-art"><img src="assets/${card.image}.webp" alt="${card.name} card from the custom deck" width="221" height="302"></div><div class="dialog-copy"><p class="eyebrow">${card.category}</p><h2 id="dialog-title">${card.name}</h2><p class="classic-name">Classic card: ${card.classic}</p><p>${card.effect}</p><div class="dialog-tip">${card.tip}</div><div class="dialog-value">Cash value: <strong>${card.cash}</strong></div></div></div>`;
  dialog.showModal(); dialog.scrollTop = 0; document.body.classList.add('modal-open');
  document.querySelector('#close-dialog').focus();
}
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if(event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close(); }});
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastTrigger?.focus(); });
search.addEventListener('input', renderCards);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  filter = button.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  renderCards();
}));
document.querySelector('#reset-search').addEventListener('click', () => {search.value='';filter='all';document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter==='all')));renderCards();search.focus();});
const turnCopy = [
 ['+2', 'Two fresh cards. A world of possibilities.'],
 ['≤3', 'Bank it. Build it. Or make your move.'],
 ['≤7', 'Keep your favorites. Discard the rest.']
];
document.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-step]').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); });
  const step = Number(button.dataset.step);
  const [badge, caption] = turnCopy[step];
  document.querySelectorAll('[data-turn-panel]').forEach(panel => {
    panel.hidden = Number(panel.dataset.turnPanel) !== step;
  });
  document.querySelector('#draw-badge').textContent = badge;
  document.querySelector('#turn-caption').textContent = caption;
  const visual = document.querySelector('#turn-visual'); visual.classList.remove('changed');
  requestAnimationFrame(() => visual.classList.add('changed'));
}));
const navLinks = [...document.querySelectorAll('.page-nav a')];
const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
function updateNavigation() {
  let active = sections[0];
  for (const section of sections) if (section.getBoundingClientRect().top < window.innerHeight * .35) active=section;
  navLinks.forEach(a => { const selected=a.hash === `#${active.id}`;a.classList.toggle('active',selected); if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current'); });
}
let scheduled=false;
window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{updateNavigation();scheduled=false;});}},{passive:true});
window.addEventListener('resize', updateNavigation);
renderCards(); updateNavigation();
// Native details remain usable without JavaScript. Expand only for printing, then restore.
let previouslyOpen=[];
window.addEventListener('beforeprint',()=>{previouslyOpen=[...document.querySelectorAll('details')].map(d=>d.open);document.querySelectorAll('details').forEach(d=>d.open=true);});
window.addEventListener('afterprint',()=>document.querySelectorAll('details').forEach((d,i)=>d.open=previouslyOpen[i]));
