'use strict';

window.addEventListener('DOMContentLoaded', () => {
	initRating();
	initIconMenu();
});

function initRating() {
	const ratings = document.querySelectorAll('.rating');
	if (ratings.length > 0) {
		ratings.forEach(rating => {
			const value = +rating.dataset.rating || 0;
			const activeRating = rating.querySelector('.rating__active');
			activeRating.style.width = `${value / 0.05}%`;
		});
	}
}

function initIconMenu() {
	const iconMenu = document.querySelector('.icon-menu');
	if (!iconMenu) return;
	iconMenu.addEventListener('click', () => {
		document.documentElement.classList.toggle('menu-open');
		document.documentElement.classList.toggle('lock');
	});
}
