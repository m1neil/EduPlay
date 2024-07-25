"use strict"

window.addEventListener("load", windowLoaded)

function windowLoaded() {
	// inits modules
	initRating()
	initSpollers()
	initTabs()
	document.addEventListener("click", documentActions)

	new Swiper('.bottom-library__slider--games', {
		pagination: {
			el: '.pagination-library__item--games',
			renderBullet: function (index, className) {
				return `<button type="button" class="${className}"><span>${index + 1}</span></button>`;
			},
			clickable: true
		},
		slidesPerView: 'auto',
		slidesPerGroup: 3,
		speed: 800,
		spaceBetween: 30,
		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
		},
	});
	new Swiper('.bottom-library__slider--sheets', {
		pagination: {
			el: '.pagination-library__item--sheets',
			renderBullet: function (index, className) {
				return `<button type="button" class="${className}"><span>${index + 1}</span></button>`;
			},
			clickable: true
		},
		slidesPerView: 'auto',
		slidesPerGroup: 3,
		speed: 800,
		spaceBetween: 30,
		autoplay: {
			delay: 5000,
			pauseOnMouseEnter: true,
		},
	});
}

function documentActions(e) {
	const target = e.target

	// go to section
	if (target.closest("[data-goto]")) {
		const selector = target.closest("[data-goto]").dataset.goto
		if (selector && document.querySelector(selector)) {
			const searchBlock = document.querySelector(selector)
			const headerHeight = document.querySelector("header")?.offsetHeight || 0
			const topSearchBlock = searchBlock.getBoundingClientRect().top - headerHeight

			if (document.documentElement.classList.contains("menu-open")) {
				document.documentElement.classList.remove("menu-open", "lock")
			}

			window.scrollBy({
				top: topSearchBlock,
				behavior: "smooth",
			})
		}
		e.preventDefault()
	}

	// menu burger
	if (target.closest(".icon-menu")) {
		document.documentElement.classList.toggle("menu-open")
		document.documentElement.classList.toggle("lock")
	}
}

// rating ================================================
function initRating() {
	const ratings = document.querySelectorAll(".rating")
	if (ratings.length > 0) {
		ratings.forEach((rating) => {
			const value = rating.dataset.rating ? parseFloat(rating.dataset.rating) : 0
			const activeRating = rating.querySelector(".rating__active")
			activeRating.style.width = `${value / 0.05}%`
		})
	}
}

// spollers
function initSpollers() {
	const spollers = document.querySelectorAll("[data-spollers]")
	if (!spollers.length) return

	spollers.forEach((spollerBlock) => {
		initSpollerBlock(spollerBlock)
		spollerBlock.addEventListener("click", setSpollerAction)
	})
}

function initSpollerBlock(spollerBlock) {
	const buttons = spollerBlock.querySelectorAll("[data-spoller]")
	if (!buttons.length) return

	buttons.forEach((item) => {
		if (!item.classList.contains("--active")) {
			item.nextElementSibling.hidden = true
		}
	})
}

function setSpollerAction(e) {
	const currentElement = e.target
	if (!currentElement.closest("[data-spoller]")) return

	const title = currentElement.closest("[data-spoller]")
	const spollerWrapper = title.closest("[data-spollers]")
	const isAccordion = spollerWrapper.hasAttribute("data-accordion")

	if (!spollerWrapper.querySelectorAll("._slide").length) {
		if (isAccordion && !title.classList.contains("--active")) {
			hideSpollers(spollerWrapper)
		}
		title.classList.toggle("--active")
		slideToggleSpoller(title.nextElementSibling, 500)
	}
}

function hideSpollers(spollerWrapper) {
	const spoller = spollerWrapper.querySelector(["[data-spoller].--active"])
	if (spoller) {
		spoller.classList.remove("--active")
		slideUp(spoller.nextElementSibling, 500)
	}
}

function slideUp(spoller, duration = 500) {
	if (spoller.classList.contains("_slide")) return
	spoller.classList.add("_slide")
	spoller.style.transitionProperty = "height, padding, margin"
	spoller.style.transitionDuration = `${duration}ms`
	spoller.style.height = `${spoller.offsetHeight / 16}rem`
	spoller.offsetHeight
	spoller.style.overflow = "hidden"
	spoller.style.height = 0
	spoller.style.paddingBlock = 0
	spoller.style.marginBlock = 0
	setTimeout(() => {
		spoller.hidden = true
		spoller.style.removeProperty("height")
		spoller.style.removeProperty("padding-block")
		spoller.style.removeProperty("margin-block")
		spoller.style.removeProperty("overflow")
		spoller.style.removeProperty("transition-duration")
		spoller.style.removeProperty("transition-property")
		spoller.classList.remove("_slide")
	}, duration)
}

function slideDown(spoller, duration = 500) {
	if (spoller.classList.contains("_slide")) return
	spoller.classList.add("_slide")
	if (spoller.hidden) {
		spoller.hidden = false
	}

	const height = spoller.offsetHeight

	spoller.style.height = `${spoller.offsetHeight / 16}rem`
	spoller.style.overflow = "hidden"
	spoller.style.height = 0
	spoller.style.paddingBlock = 0
	spoller.style.marginBlock = 0
	spoller.offsetHeight
	spoller.style.transitionProperty = "height, padding, margin"
	spoller.style.transitionDuration = `${duration}ms`
	spoller.style.height = `${height / 16}rem`
	spoller.style.removeProperty("padding-block")
	spoller.style.removeProperty("margin-block")
	setTimeout(() => {
		spoller.style.removeProperty("height")
		spoller.style.removeProperty("overflow")
		spoller.style.removeProperty("transition-duration")
		spoller.style.removeProperty("transition-property")
		spoller.classList.remove("_slide")
	}, duration)
}

function slideToggleSpoller(spoller, duration) {
	if (spoller.hidden) {
		slideDown(spoller, duration)
	} else {
		slideUp(spoller, duration)
	}
}

// tabs
function initTabs() {
	const buttons = document.querySelectorAll('[data-tab-index]')
	const tabBlocks = document.querySelectorAll('[data-tab]')
	const pagination = document.querySelectorAll('.pagination-library__item');
	const container = document.querySelector('.library');
	container.addEventListener('click', e => {
		const target = e.target;
		if (target.closest('[data-tab-index]')) {
			const currentButton = target.closest('[data-tab-index]');
			toggleTabs(parseInt(currentButton.dataset.tabIndex))
		}

	})
	toggleTabs()

	function toggleTabs(currentIndex = 0) {
		buttons.forEach((button, i) => {
			if (i !== currentIndex) {
				button.classList.remove('--active')
				tabBlocks[i].classList.remove('--active')
				pagination[i].classList.remove('--active')
			}
		});

		tabBlocks[currentIndex].classList.add('--active')
		pagination[currentIndex].classList.add('--active')
		buttons[currentIndex].classList.add('--active')
	}

}

