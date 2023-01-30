
const body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger--btn, .header__nav, body'),
	burger = document.querySelector('.header__burger--btn'),
	header = document.querySelector('.header'),
	headerNav = header.querySelector('.header__nav');


function isHidden(el) {
	return (el.offsetParent === null)
}

/* function scheme(refresh) {

	const scheme = document.querySelectorAll('.scheme');

	scheme.forEach(scheme => {

		if (!isHidden(scheme) && !scheme.classList.contains('_init') || !isHidden(scheme) && refresh == true) {

			const schemeBody = scheme.querySelector('.scheme-body'),
				schemeItem = scheme.querySelectorAll('.scheme-item'),
				schemeMainItem = scheme.querySelector('.scheme-main-item'),
				schemeLines = scheme.querySelector('.scheme-lines');

			let mainItemPos = schemeMainItem.getBoundingClientRect(),
				bodyPos = schemeBody.getBoundingClientRect();

			for (let index = 0; index < schemeItem.length; index++) {
				schemeItem[index].classList.remove('_rendered');
				schemeItem[index].style.left = 0; schemeItem[index].style.top = 0;
			}

			for (let index = 0; index < schemeItem.length; index++) {

				let adapt = (window.innerWidth >= 769) ? schemeItem[index].offsetWidth / 5 : 30;

				if (schemeItem[index].dataset.posX == 'left') {

					let renderedBottom = scheme.querySelectorAll('.scheme-item._rendered[data-pos-x="left"][data-pos-y="bottom"]'),
						renderedCenter = scheme.querySelectorAll('.scheme-item._rendered[data-pos-x="left"][data-pos-y="center"]'),
						renderedTop = scheme.querySelectorAll('.scheme-item._rendered[data-pos-x="left"][data-pos-y="top"]');

					if (renderedBottom[0] && schemeItem[index].dataset.posY == 'bottom') {
						let renderedPos = renderedBottom[renderedBottom.length - 1].getBoundingClientRect();
						schemeItem[index].style.left = renderedPos.x - bodyPos.x - schemeMainItem.offsetWidth - adapt + 'px';

					} else if (renderedCenter[0] && schemeItem[index].dataset.posY == 'center') {
						let renderedPos = renderedCenter[renderedCenter.length - 1].getBoundingClientRect();
						schemeItem[index].style.left = renderedPos.x - bodyPos.x - schemeMainItem.offsetWidth - adapt + 'px';

					} else if (renderedTop[0] && schemeItem[index].dataset.posY == 'top') {
						let renderedPos = renderedTop[renderedTop.length - 1].getBoundingClientRect();
						schemeItem[index].style.left = renderedPos.x - bodyPos.x - schemeMainItem.offsetWidth - adapt + 'px';

					} else {
						schemeItem[index].style.left = mainItemPos.x - bodyPos.x - schemeMainItem.offsetWidth - adapt + 'px';
					}

					schemeItem[index].classList.add('_rendered');

				} else if (schemeItem[index].dataset.posX == 'center') {
					schemeItem[index].style.left = mainItemPos.x - bodyPos.x + 'px';

				} else if (schemeItem[index].dataset.posX == 'right') {

					let renderedBottom = scheme.querySelectorAll('.scheme-item._rendered[data-pos-x="right"][data-pos-y="bottom"]'),
						renderedCenter = scheme.querySelectorAll('.scheme-item._rendered[data-pos-x="right"][data-pos-y="center"]'),
						renderedTop = scheme.querySelectorAll('.scheme-item._rendered[data-pos-x="right"][data-pos-y="top"]');

					if (renderedBottom[0] && schemeItem[index].dataset.posY == 'bottom') {
						let renderedPos = renderedBottom[renderedBottom.length - 1].getBoundingClientRect();
						schemeItem[index].style.left = renderedPos.x - bodyPos.x + schemeMainItem.offsetWidth + adapt + 'px';

					} else if (renderedCenter[0] && schemeItem[index].dataset.posY == 'center') {
						let renderedPos = renderedCenter[renderedCenter.length - 1].getBoundingClientRect();
						schemeItem[index].style.left = renderedPos.x - bodyPos.x + schemeMainItem.offsetWidth + adapt + 'px';

					} else if (renderedTop[0] && schemeItem[index].dataset.posY == 'top') {
						let renderedPos = renderedTop[renderedTop.length - 1].getBoundingClientRect();
						schemeItem[index].style.left = renderedPos.x - bodyPos.x + schemeMainItem.offsetWidth + adapt + 'px';

					} else {
						schemeItem[index].style.left = mainItemPos.x - bodyPos.x + schemeMainItem.offsetWidth + adapt + 'px';
					}

					schemeItem[index].classList.add('_rendered');

				}

				if (schemeItem[index].dataset.posY == 'top') {
					schemeItem[index].style.top = schemeBody.offsetHeight / 2 - schemeItem[index].offsetHeight * 2 - schemeMainItem.offsetHeight + 'px';

				} else if (schemeItem[index].dataset.posY == 'center') {
					schemeItem[index].style.top = 44 + '%';

				} else if (schemeItem[index].dataset.posY == 'bottom') {
					schemeItem[index].style.top = schemeMainItem.offsetHeight / 4 + schemeBody.offsetHeight / 2 + 'px';

				}

			}

			function dragLines() {
				mainItemPos = schemeMainItem.getBoundingClientRect();
				let icon = schemeMainItem.querySelector('.person__scheme--icon'),
					xEnd = mainItemPos.x - bodyPos.x + ((icon.offsetWidth / 2) + 5),
					yEnd = mainItemPos.y - bodyPos.y + (icon.offsetWidth / 2);

				schemeLines.innerHTML = ''

				for (let index = 0; index < schemeItem.length; index++) {
					let itemPos = schemeItem[index].getBoundingClientRect(),
						bodyPos = schemeBody.getBoundingClientRect(),
						icon = schemeItem[index].querySelector('.person__scheme--icon'),

						x = itemPos.x - bodyPos.x + ((icon.offsetWidth / 2) + 15),
						y = itemPos.y - bodyPos.y + ((icon.offsetWidth / 2) + 15);

					schemeLines.insertAdjacentHTML('beforeend', `<line x1="${x}" y1="${y}" x2="${xEnd}" y2="${yEnd}" stroke="#212121" stroke-dasharray="5,2.5" stroke-width="1"/>`)
				}
			}

			dragLines();

			let pos, lastPosX = 0, lastPosY = 0;

			const mouseDownHandler = function (e) {

				scrollLock.disablePageScroll();

				pos = {
					startPosX: (e.type == 'mousedown') ? e.clientX : e.changedTouches[0].clientX,
					startPosY: (e.type == 'mousedown') ? e.clientY : e.changedTouches[0].clientY,
				};

				if (e.type == 'touchstart') body.classList.add('_active');

				document.addEventListener('mousemove', mouseMoveHandler);
				document.addEventListener('mouseup', mouseUpHandler);
				document.addEventListener('touchmove', mouseMoveHandler);
				document.addEventListener('touchend', mouseUpHandler);
			};

			const mouseMoveHandler = function (e) {

				let x, y;

				if (e.type == 'mousemove') {
					x = e.clientX; y = e.clientY;
				}
				if (e.type == 'touchmove') {
					x = e.changedTouches[0].clientX; y = e.changedTouches[0].clientY;
				}

				if (window.innerWidth >= 769) {
					schemeBody.style.transform = `translate(calc(-52% + ${lastPosX + x - pos.startPosX}px), calc(-50% + ${lastPosY + y - pos.startPosY}px))`;
				} else {
					schemeBody.style.transform = `translate(calc(-47.5% + ${lastPosX + x - pos.startPosX}px), calc(-47.5% + ${lastPosY + y - pos.startPosY}px))`;
				}
			};

			scheme.addEventListener('dblclick', function () {
				if (window.innerWidth >= 769) {
					schemeBody.style.transform = `translate(calc(-50% + ${0}px), calc(-50% + ${0}px))`;
				} else {
					schemeBody.style.transform = `translate(calc(-47.5% + ${0}px), calc(-50% + ${0}px))`;
				}
				lastPosX = 0; lastPosY = 0;

			})

			const mouseUpHandler = function (e) {

				let x, y;

				if (e.type == 'mouseup') {
					x = e.clientX; y = e.clientY;
				}
				if (e.type == 'touchend') {
					x = e.changedTouches[0].clientX; y = e.changedTouches[0].clientY;
				}

				lastPosX = lastPosX + x - pos.startPosX;
				lastPosY = lastPosY + y - pos.startPosY;

				if (e.type == 'touchend') body.classList.remove('_active');

				document.removeEventListener('mousemove', mouseMoveHandler);
				document.removeEventListener('mouseup', mouseUpHandler);
				document.removeEventListener('touchmove', mouseMoveHandler);
				document.removeEventListener('touchend', mouseUpHandler);

				scrollLock.enablePageScroll();
			};

			// Attach the handler
			scheme.addEventListener('mousedown', mouseDownHandler);
			scheme.addEventListener('touchstart', mouseDownHandler);

			scheme.classList.add('_init');

		}

	})
}

scheme(); */

(function () {
	var FX = {
		easing: {
			linear: function (progress) {
				return progress;
			},
			quadratic: function (progress) {
				return Math.pow(progress, 2);
			},
			swing: function (progress) {
				return 0.5 - Math.cos(progress * Math.PI) / 2;
			},
			circ: function (progress) {
				return 1 - Math.sin(Math.acos(progress));
			},
			back: function (progress, x) {
				return Math.pow(progress, 2) * ((x + 1) * progress - x);
			},
			bounce: function (progress) {
				for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
					if (progress >= (7 - 4 * a) / 11) {
						return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
					}
				}
			},
			elastic: function (progress, x) {
				return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
			}
		},
		animate: function (options) {
			var start = new Date;
			var id = setInterval(function () {
				var timePassed = new Date - start;
				var progress = timePassed / options.duration;
				if (progress > 1) {
					progress = 1;
				}
				options.progress = progress;
				var delta = options.delta(progress);
				options.step(delta);
				if (progress == 1) {
					clearInterval(id);

					options.complete();
				}
			}, options.delay || 10);
		},
		fadeOut: function (element, options) {
			var to = 1;
			this.animate({
				duration: options.duration,
				delta: function (progress) {
					progress = this.progress;
					return FX.easing.swing(progress);
				},
				complete: options.complete,
				step: function (delta) {
					element.style.opacity = to - delta;
				}
			});
		},
		fadeIn: function (element, options) {
			var to = 0;
			element.style.display = 'block';
			this.animate({
				duration: options.duration,
				delta: function (progress) {
					progress = this.progress;
					return FX.easing.swing(progress);
				},
				complete: options.complete,
				step: function (delta) {
					element.style.opacity = to + delta;
				}
			});
		}
	};
	window.FX = FX;
})()

function Popup(arg) {

	let body = document.querySelector('body'),
		html = document.querySelector('html'),
		duration = (typeof arg == 'object') ? (arg['duration']) ? arg['duration'] : 200 : 200,
		saveHref = (typeof arg == 'object') ? (arg['saveHref']) ? true : false : false,
		popupCheck = true,
		popupCheckClose = true;

	const removeHash = function () {
		let uri = window.location.toString();
		if (uri.indexOf("#") > 0) {
			let clean_uri = uri.substring(0, uri.indexOf("#"));
			window.history.replaceState({}, document.title, clean_uri);
		}
	}

	const open = function (id) {
		if (popupCheck) {
			popupCheck = false;

			let popup = document.querySelector(id);

			if (popup) {

				body.classList.remove('_popup-active');
				html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
				body.classList.add('_popup-active');

				if (saveHref) history.pushState('', "", id);

				setTimeout(() => {
					popup.classList.add('_active');
				}, 0)

				FX.fadeIn(popup, {
					duration: duration,
					complete: function () {
						popupCheck = true;
						scheme();
						body.classList.add('_blur');
					}
				});

			} else {
				return new Error(`Not found "${id}"`)
			}
		}
	}

	const close = function (popupClose) {
		if (popupCheckClose) {
			popupCheckClose = false;

			let popup
			if (typeof popupClose === 'string') {
				popup = document.querySelector(popupClose)
			} else {
				popup = popupClose.closest('.popup');
			}

			setTimeout(() => {
				popup.classList.remove('_active');
			}, 0)

			FX.fadeOut(popup, {
				duration: duration,
				complete: function () {
					popup.style.display = 'none';

					const activePopups = document.querySelectorAll('.popup._active');
					body.classList.remove('_blur');

					if (activePopups.length < 1) {
						body.classList.remove('_popup-active');
						html.style.setProperty('--popup-padding', '0px');
					}

					if (saveHref) {
						removeHash();
						if (activePopups[activePopups.length - 1]) {
							history.pushState('', "", "#" + activePopups[activePopups.length - 1].getAttribute('id'));
						}
					}

					popupCheckClose = true;

				}
			});

		}
	}

	return {

		open: function (id) {
			open(id);
		},

		close: function (popupClose) {
			close(popupClose)
		},

		init: function () {

			let thisTarget
			body.addEventListener('click', function (event) {

				thisTarget = event.target;

				let popupOpen = thisTarget.closest('.open-popup');
				if (popupOpen) {
					event.preventDefault();
					open(popupOpen.getAttribute('href'))
				}

				let popupClose = thisTarget.closest('.popup-close');
				if (popupClose) {
					close(popupClose)
				}

			});

			if (saveHref) {
				let url = new URL(window.location);
				if (url.hash) {
					let timeoutDuration = duration;
					duration = 0;
					open(url.hash);
					setTimeout(() => {
						duration = timeoutDuration;
					}, timeoutDuration)
				}
			}
		},

	}
}

const popup = new Popup();

popup.init()


body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <Бургер в шапке> -=-=-=-=-=-=-=-=-=-=-
	const headerBurgerBtn = $('.header__burger--btn');
	if (headerBurgerBtn) {

		if (!headerBurgerBtn.classList.contains('_changing')) {
			headerBurgerBtn.classList.add('_changing')

			menu.forEach(element => {
				element.classList.toggle('_active')
			})

			setTimeout(() => {
				headerBurgerBtn.classList.remove('_changing')
			}, 1000)

			if (!headerNav.classList.contains('_active')) {
				headerNav.classList.add('_hiding');
				setTimeout(() => {
					headerNav.classList.remove('_hiding');
					headerBurgerBtn.classList.remove('_changing')
				}, 500)
			}
		}

	}

	// =-=-=-=-=-=-=-=-=-=- </Бургер в шапке> -=-=-=-=-=-=-=-=-=-=-


	// =-=-=-=-=-=-=-=-=-=- <Search result for input> -=-=-=-=-=-=-=-=-=-=-
	const searchResultLi = $('.search-list li');
	if (searchResultLi) {
		const input = searchResultLi.closest('.search-list-wrapper').querySelector('.search-list-input');
		input.value = searchResultLi.textContent.trim();
	}
	// =-=-=-=-=-=-=-=-=-=- </Search result for input> -=-=-=-=-=-=-=-=-=-=-


	const articleTagsCloseBtn = $('.article__tags--close-btn');
	if (articleTagsCloseBtn) {
		const element = articleTagsCloseBtn.closest('.article__tags--elem');
		element.remove()
	}

	const articleTagsEditBtn = $('.article__tags--edit-btn');
	if (articleTagsEditBtn) {
		const element = articleTagsEditBtn.closest('.article__tags--elem'),
			name = element.querySelector('.article__tags--name');

		name.setAttribute('contentEditable', true);
		name.focus();

		name.onblur = function () {
			name.setAttribute('contentEditable', false);
		}
	}

	const addTagBtn = $('.add-tag__btn');
	if (addTagBtn) {
		const
			tag = addTagBtn.closest('.add-tag');
		list = document.querySelector('#' + tag.dataset.id);

		list.insertAdjacentHTML('beforeend', `
		<li class="article__tags--elem">
			<span class="article__tags--name">
				${tag.textContent}
			</span>
			<button class="article__tags--close-btn" type="button"></button>
			<button class="article__tags--edit-btn" type="button"></button>
		</li>`)
		tag.classList.add('_added');
	}

})

// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
	if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
		resizeCheck[String(size)] = false;
		maxWidth(); // < size
	}

	if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
		resizeCheck[String(size)] = true;
		minWidth(); // > size
	}
}

function resize() {

	windowSize = window.innerWidth

	html.style.setProperty('--height-screen', window.innerHeight + 'px');
	html.style.setProperty('--width-scrollbar', window.innerWidth - body.offsetWidth + 'px');

	/* resizeCheckFunc(768,
		function () {  // screen > 992px

			scheme(true);

		},
		function () {  // screen < 992px

			scheme(true);

		}); */

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let articlesSlider = new Swiper('.articles__slider--body', {

	spaceBetween: 15,
	slidesPerView: 'auto',
	centeredSlides: false,

	navigation: {
		nextEl: '.articles__slider .swiper-button-next',
		prevEl: '.articles__slider .swiper-button-prev',
	},
	/* breakpoints: {
		992: {
			slidesPerView: 3,
			centeredSlides: true,

		},
		600: {
			slidesPerView: 2,
			centeredSlides: false,
		},
	} */
});

function randomInteger(min, max) {
	// получить случайное число от (min-0.5) до (max+0.5)
	let rand = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(rand);
}

let tagCloudBlock = new Swiper('.tag-cloud__block', {
	slidesPerView: 'auto',
	autoplay: {
		delay: 0,
		reverseDirection: true,
		disableOnInteraction: false,
		pauseOnMouseEnter: true,
	},
	speed: 3000,
	/* allowSlideNext: false,
	allowSlidePrev: false, */
	loop: true,
	loopAdditionalSlides: 1,

	/* on: {
		init: function () {
			const items = document.querySelectorAll('.tag-cloud__item');
			let count = 0;
			items.forEach(item => {
				count++
				const delay = (randomInteger(1,20) * 0.1),
					  dataArray = item.dataset.text.split(',');

				item.style.setProperty('--delay', delay + 's');
				if(count >= 3) count = 0;
				setTimeout(() => {
					setInterval(() => {
						item.dataset.index = Number(item.dataset.index)+1 < dataArray.length-1 ? Number(item.dataset.index)+1 : 0;
						item.querySelector('.tag-cloud__item--body').textContent = dataArray[Number(item.dataset.index)];
					},4000)
				},delay*1000)
			})
		}
	} */
})

let asideItem = new Swiper('.graph-popup__item', {
	slidesPerView: 1,
	effect: 'fade',
	fadeEffect: {
		crossFade: true
	},
	grid: {
		rows: 4,
		fill: "row",
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
})




function delayAnimation(dataDelay, item) {
	dataDelay = dataDelay.replace('s', '') * 1000;

	setTimeout(() => {
		item.classList.add('decor-span_active')
	}, dataDelay)
}

document.querySelectorAll('.decor-span').forEach(item => {
	let dataDelay = item.getAttribute('data-decor-delay')

	if (dataDelay) delayAnimation(dataDelay, item)
})

if (document.querySelector('.decor-letters')) document.querySelector('.decor-letters').classList.add('decor-letters_active')

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <Animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: 'mobile',
	duration: 1000,
	once: true,
});

// =-=-=-=-=-=-=-=-=-=-=-=- </Animation> -=-=-=-=-=-=-=-=-=-=-=-=

document.querySelectorAll('.custom-date__input').forEach(customDate => {
	const picker = datepicker(customDate, {
		formatter: (input, date, instance) => {
			const value = date.toLocaleDateString();
			input.value = value;
		},
		onShow: function (event) {
			const item = event.calendarContainer.closest('.search__form--item');
			if(item) item.style.zIndex = 2;
		},
		onHide: function (event) {
			const item = event.calendarContainer.closest('.search__form--item');
			if(item) item.style.removeProperty('z-index')
		}
	})
})



// =-=-=-=-=-=-=-=-=-=-=-=- <Search suggestions> -=-=-=-=-=-=-=-=-=-=-=-=

const searchListInput = document.querySelectorAll('.search-list-input');
searchListInput.forEach(searchListInput => {

	let hasElement = false;

	searchListInput.addEventListener('input', function () {

		setTimeout(() => {
			const wrapper = searchListInput.closest('.search-list-wrapper'),
				list = wrapper.querySelector('.search-list'),
				listElements = list.querySelectorAll('li');

			let listArray = [[], []];

			listElements.forEach(listElement => {
				listArray[0].push(listElement.textContent.trim());
			})

			listElements.forEach(listElement => {
				listArray[1].push(listElement);
			})

			hasElement = false;

			Array.from(listArray[0]).forEach((listArrayElement, index) => {

				if (listArrayElement.toLowerCase().includes(searchListInput.value.toLowerCase().trim()) && searchListInput.value != '') {
					listArray[1][index].style.display = 'block';
					hasElement = true;
				} else {
					listArray[1][index].style.removeProperty('display');
				}
			})

			if (hasElement && searchListInput.value != '') wrapper.classList.add('_active'); else wrapper.classList.remove('_active')
		}, 0)

	})

	searchListInput.addEventListener('blur', function () {
		const wrapper = searchListInput.closest('.search-list-wrapper');

		wrapper.classList.remove('_active')
	})

})

// =-=-=-=-=-=-=-=-=-=-=-=- </Search suggestions> -=-=-=-=-=-=-=-=-=-=-=-=
