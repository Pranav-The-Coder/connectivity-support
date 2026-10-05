const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-menu');

menuButton?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const scoreSlider = document.querySelector('#score-slider');
const scoreValue = document.querySelector('#score-value');
const scoreOutput = document.querySelector('#score-output');
const scoreStatus = document.querySelector('#score-status');
const scoreMeterFill = document.querySelector('#score-meter-fill');
const legendRows = document.querySelectorAll('.legend-row');
const scoreCard = document.querySelector('.scoring-card');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const scoreColor = (score) => {
  const t = Math.max(0, Math.min(1, score / 100));
  const dead = [1, 0.42, 0.42];
  const poor = [1, 0.6, 0.3];
  const good = [0.09, 0.78, 0.48];
  const from = t < 0.5 ? dead : poor;
  const to = t < 0.5 ? poor : good;
  const localT = t < 0.5 ? t / 0.5 : (t - 0.5) / 0.5;
  const rgb = from.map((channel, index) => Math.round((channel + (to[index] - channel) * localT) * 255));
  return `rgb(${rgb.join(', ')})`;
};

const scoreLabel = (score) => {
  if (score >= 90) return 'Excellent';
  if (score >= 65) return 'Good';
  if (score >= 40) return 'Fair';
  if (score >= 15) return 'Weak';
  return 'Dead zone';
};

function updateScoreGuide() {
  if (!scoreSlider || !scoreValue || !scoreOutput || !scoreStatus || !scoreMeterFill) return;
  const score = Number(scoreSlider.value);
  const color = scoreColor(score);
  scoreValue.textContent = score;
  scoreOutput.value = score;
  scoreOutput.textContent = score;
  scoreStatus.textContent = scoreLabel(score);
  scoreStatus.style.color = color;
  scoreValue.style.color = color;
  scoreMeterFill.style.width = `${score}%`;
  scoreMeterFill.style.backgroundColor = color;
  scoreSlider.style.setProperty('--score-color', color);
  scoreSlider.setAttribute('aria-valuenow', score);
  legendRows.forEach((row) => row.classList.toggle('is-active', Number(row.dataset.score) === score));
}

window.updateScoreGuide = updateScoreGuide;

scoreSlider?.addEventListener('input', updateScoreGuide);
scoreSlider?.addEventListener('change', updateScoreGuide);
legendRows.forEach((row) => {
  row.addEventListener('click', () => {
    if (!scoreSlider) return;
    scoreSlider.value = row.dataset.score;
    updateScoreGuide();
  });
});
updateScoreGuide();

if (scoreCard && !reducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  scoreCard.addEventListener('pointermove', (event) => {
    const bounds = scoreCard.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    scoreCard.style.setProperty('--tilt-x', `${(y * -3).toFixed(2)}deg`);
    scoreCard.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`);
  });

  scoreCard.addEventListener('pointerleave', () => {
    scoreCard.style.setProperty('--tilt-x', '0deg');
    scoreCard.style.setProperty('--tilt-y', '0deg');
  });
}