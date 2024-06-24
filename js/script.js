'use strict';

window.addEventListener('DOMContentLoaded', () => {
	initRating();
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

