// Custom Scripts
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_touch');
} else {
	document.body.classList.add('_pc');
}


//Header
// Menu Burger

const iconMenu = document.querySelector('.menu__icon')
const menuBody = document.querySelector('.menu__body')
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		document.body.classList.toggle('_lock');
		iconMenu.classList.toggle('_active');
		menuBody.classList.toggle('_active');
	})
}

// Прокрутка при клике

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');// JS будет искать только те объекты с классом menu__link, у которых есть атрибут data-goto. 

if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { //(проверка заполненности атрибута && проверка на наличие такого дата-атрибута)
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset; /*- document.querySelector('header').offsetHeight;*/

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}
//Projects

let projectList = document.querySelector('.projects__list')
let projectLink = projectList.querySelectorAll('.projects__link')
let projectItems = document.querySelectorAll('.projects__item')
const projectButton = document.querySelector('.projects__button')

projectList.addEventListener('click', (e) => {
	target = e.target
	if (target.closest('.projects__link')) {
		projectLink.forEach((item) => {
			item.classList.remove('_active')
		})
		target.classList.add('_active')
		projectButton.classList.remove('_active')
		projectList.classList.remove('_active')
		//=============================
		const href = target.getAttribute('href').substring(1)
		const viewTarget = document.getElementById(href)
		projectItems.forEach((projectItem) => {
			if (projectItem === viewTarget) {
				projectItem.classList.add('_active')
				return true
			}
			projectItem.classList.remove('_active')
		})
	}
	e.preventDefault()
})
//=======================================================================================================================
const items = document.querySelectorAll('.card__title')
items.forEach(item => {
	item.addEventListener('click', () => {
		const parent = item.parentNode
		if (parent.classList.contains('_active')) {
			parent.classList.remove('_active')
		} else {
			document
				.querySelectorAll('.item__card')
				.forEach(child => child.classList.remove('_active'))
			parent.classList.add('_active')
		}
	})
})
//=======================================================================================================================
projectButton.addEventListener('click', (e) => {
	projectButton.classList.toggle('_active')
	projectList.classList.toggle('_active')
	e.preventDefault()
})
//=======================================================================================================================
//Contact
//Popup
const buttons = document.querySelectorAll('.contact__button');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true // Нужно для того, чтобы не было двойных нажатий

const timeout = 800;

if (buttons.length > 0) {
	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i];
		button.addEventListener("click", function (e) {
			const popupName = button.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');

if (popupCloseIcon.length > 0) {
	for (i = 0; i < popupCloseIcon.length; i++) {
		const elem = popupCloseIcon[i];
		elem.addEventListener("click", function (e) {
			popupClose(elem.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open')
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open')
		curentPopup.addEventListener('click', function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
	}
	if (doUnlock) {
		bodyUnLock();
	}
}




function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.container').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let i = 0; i < lockPadding.length; i++) {
			const elem = lockPadding[i];
			elem.style.paddingRight = lockPaddingValue;//Данный цикл предназначен для фиксированных элементов(Например при header c position:fixed)
		}
	}
	body.style.paddingRight = '17px';
	body.classList.add('_lock');


	//Данный код нужен для того, чтобы когда popup закрывался мы не могли открыть его повторно в момент закрытия.
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}


function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let i = 0; i < lockPadding.length; i++) {
				const elem = lockPadding[i];
				elem.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('_lock')
	}, timeout)

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout)
}

//Закрытие окна по esc
document.addEventListener('keydown', function (e) {
	if (e.key === "Escape") {
		const popupActive = document.querySelector('.popup.open')
		popupClose(popupActive)
	}
})
// Slider


//Slider
const swiper = new Swiper('.swiper', {
	loop: true,
	// Navigation arrows
	navigation: {
		nextEl: '.btn-next',
		prevEl: '.btn-prev',
	},

	// Responsive breakpoints
	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerView: 1,
		},
		// when window width is >= 480px
		768: {
			slidesPerView: 2,
			spaceBetween: 23
		},
	}
});

// const swiperBody = document.querySelector('.swiper');
// const heightSwiper = getComputedStyle(swiperBody).height

// for (let i = 0; i < cards.length; i++) {
// 	cards[i].style.height = `${heightSwiper}px`
// }

function ibg() {

	$.each($('.ibg'), function (index, val) {
		if ($(this).find('img').length > 0) {
			$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
		}
	});
}

ibg();

//Cursor

function changeCursor() {
	const cursor = document.querySelector('.cursor');
	const follower = document.querySelector('.follower');
	const links = document.querySelectorAll('.link');

	let posX = 0
	let posY = 0

	let mouseX = 0
	let mouseY = 0

	TweenMax.to({}, 0.01, {
		repeat: -1,
		onRepeat: () => {
			posX += (mouseX - posX) / 5 // Скорость с которой движется follower. Если поставить очень много, то он будет очень долго догонять курсор
			posY += (mouseY - posY) / 5
			TweenMax.set(follower, {
				css: {
					left: posX - 12,
					top: posY - 12
				}
			})
			TweenMax.set(cursor, {
				css: {
					left: mouseX,
					top: mouseY
				}
			})
		}
	})



	document.addEventListener('mousemove', (e) => {
		mouseX = e.clientX
		mouseY = e.clientY
	})


	links.forEach(link => {
		link.addEventListener('mouseenter', () => {
			cursor.classList.add('_active')
			follower.classList.add('_active')
		})
		link.addEventListener('mouseleave', () => {
			cursor.classList.remove('_active')
			follower.classList.remove('_active')
		})
	})
}
document.addEventListener('load', changeCursor())

window.addEventListener("load", windowLoadHandler, false);

//for debug messages
var Debugger = function () { };
Debugger.log = function (message) {
	try {
		console.log(message);
	}
	catch (exception) {
		return;
	}
}

function windowLoadHandler() {
	canvasApp();
}

// function canvasSupport() {
// 	return Modernizr.canvas;
// }

function canvasApp() {
	// if (!canvasSupport()) {
	// 	return;
	// }

	var theCanvas = document.getElementById("canvasOne");
	var context = theCanvas.getContext("2d");

	var displayWidth;
	var displayHeight;
	var timer;
	var wait;
	var count;
	var numToAddEachFrame;
	var particleList;
	var recycleBin;
	var particleAlpha;
	var r, g, b;
	var fLen;
	var m;
	var projCenterX;
	var projCenterY;
	var zMax;
	var turnAngle;
	var turnSpeed;
	var sphereRad, sphereCenterX, sphereCenterY, sphereCenterZ;
	var particleRad;
	var zeroAlphaDepth;
	var randAccelX, randAccelY, randAccelZ;
	var gravity;
	var rgbString;
	//we are defining a lot of variables used in the screen update functions globally so that they don't have to be redefined every frame.
	var p;
	var outsideTest;
	var nextParticle;
	var sinAngle;
	var cosAngle;
	var rotX, rotZ;
	var depthAlphaFactor;
	var i;
	var theta, phi;
	var x0, y0, z0;

	init();

	function init() {
		wait = 1;
		count = wait - 1;
		numToAddEachFrame = 8;

		//particle color
		r = 255;
		g = 255;
		b = 255;

		rgbString = "rgba(" + r + "," + g + "," + b + ","; //partial string for color which will be completed by appending alpha value.
		particleAlpha = 1; //maximum alpha

		displayWidth = theCanvas.width;
		displayHeight = theCanvas.height;

		fLen = 320; //represents the distance from the viewer to z=0 depth.

		//projection center coordinates sets location of origin
		projCenterX = displayWidth / 2;
		projCenterY = displayHeight / 2;

		//we will not draw coordinates if they have too large of a z-coordinate (which means they are very close to the observer).
		zMax = fLen - 2;

		particleList = {};
		recycleBin = {};

		//random acceleration factors - causes some random motion
		randAccelX = 0.1;
		randAccelY = 0.1;
		randAccelZ = 0.1;

		gravity = 0; //try changing to a positive number (not too large, for example 0.3), or negative for floating upwards.

		particleRad = 2.5;
		sphereRad = 280;
		sphereCenterX = 0;
		sphereCenterY = 0;
		sphereCenterZ = -3 - sphereRad;

		//alpha values will lessen as particles move further back, causing depth-based darkening:
		zeroAlphaDepth = -750;

		turnSpeed = 2 * Math.PI / 1600; //the sphere will rotate at this speed (one complete rotation every 1600 frames).
		turnAngle = 0; //initial angle

		timer = setInterval(onTimer, 1000 / 24);
	}

	function onTimer() {
		//if enough time has elapsed, we will add new particles.		
		count++;
		if (count >= wait) {

			count = 0;
			for (i = 0; i < numToAddEachFrame; i++) {
				theta = Math.random() * 2 * Math.PI;
				phi = Math.acos(Math.random() * 2 - 1);
				x0 = sphereRad * Math.sin(phi) * Math.cos(theta);
				y0 = sphereRad * Math.sin(phi) * Math.sin(theta);
				z0 = sphereRad * Math.cos(phi);

				//We use the addParticle function to add a new particle. The parameters set the position and velocity components.
				//Note that the velocity parameters will cause the particle to initially fly outwards away from the sphere center (after
				//it becomes unstuck).
				var p = addParticle(x0, sphereCenterY + y0, sphereCenterZ + z0, 0.002 * x0, 0.002 * y0, 0.002 * z0);

				//we set some "envelope" parameters which will control the evolving alpha of the particles.
				p.attack = 50;
				p.hold = 50;
				p.decay = 160;
				p.initValue = 0;
				p.holdValue = particleAlpha;
				p.lastValue = 0;

				//the particle will be stuck in one place until this time has elapsed:
				p.stuckTime = 80 + Math.random() * 20;

				p.accelX = 0;
				p.accelY = gravity;
				p.accelZ = 0;
			}
		}

		//update viewing angle
		turnAngle = (turnAngle + turnSpeed) % (2 * Math.PI);
		sinAngle = Math.sin(turnAngle);
		cosAngle = Math.cos(turnAngle);

		//background fill
		context.fillStyle = "#1F1F1F";
		context.fillRect(0, 0, displayWidth, displayHeight);

		//update and draw particles
		p = particleList.first;
		while (p != null) {
			//before list is altered record next particle
			nextParticle = p.next;

			//update age
			p.age++;

			//if the particle is past its "stuck" time, it will begin to move.
			if (p.age > p.stuckTime) {
				p.velX += p.accelX + randAccelX * (Math.random() * 2 - 1);
				p.velY += p.accelY + randAccelY * (Math.random() * 2 - 1);
				p.velZ += p.accelZ + randAccelZ * (Math.random() * 2 - 1);

				p.x += p.velX;
				p.y += p.velY;
				p.z += p.velZ;
			}

			/*
			We are doing two things here to calculate display coordinates.
			The whole display is being rotated around a vertical axis, so we first calculate rotated coordinates for
			x and z (but the y coordinate will not change).
			Then, we take the new coordinates (rotX, y, rotZ), and project these onto the 2D view plane.
			*/
			rotX = cosAngle * p.x + sinAngle * (p.z - sphereCenterZ);
			rotZ = -sinAngle * p.x + cosAngle * (p.z - sphereCenterZ) + sphereCenterZ;
			m = fLen / (fLen - rotZ);
			p.projX = rotX * m + projCenterX;
			p.projY = p.y * m + projCenterY;

			//update alpha according to envelope parameters.
			if (p.age < p.attack + p.hold + p.decay) {
				if (p.age < p.attack) {
					p.alpha = (p.holdValue - p.initValue) / p.attack * p.age + p.initValue;
				}
				else if (p.age < p.attack + p.hold) {
					p.alpha = p.holdValue;
				}
				else if (p.age < p.attack + p.hold + p.decay) {
					p.alpha = (p.lastValue - p.holdValue) / p.decay * (p.age - p.attack - p.hold) + p.holdValue;
				}
			}
			else {
				p.dead = true;
			}

			//see if the particle is still within the viewable range.
			if ((p.projX > displayWidth) || (p.projX < 0) || (p.projY < 0) || (p.projY > displayHeight) || (rotZ > zMax)) {
				outsideTest = true;
			}
			else {
				outsideTest = false;
			}

			if (outsideTest || p.dead) {
				recycle(p);
			}

			else {
				//depth-dependent darkening
				depthAlphaFactor = (1 - rotZ / zeroAlphaDepth);
				depthAlphaFactor = (depthAlphaFactor > 1) ? 1 : ((depthAlphaFactor < 0) ? 0 : depthAlphaFactor);
				context.fillStyle = rgbString + depthAlphaFactor * p.alpha + ")";

				//draw
				context.beginPath();
				context.arc(p.projX, p.projY, m * particleRad, 0, 2 * Math.PI, false);
				context.closePath();
				context.fill();
			}

			p = nextParticle;
		}
	}

	function addParticle(x0, y0, z0, vx0, vy0, vz0) {
		var newParticle;
		var color;

		//check recycle bin for available drop:
		if (recycleBin.first != null) {
			newParticle = recycleBin.first;
			//remove from bin
			if (newParticle.next != null) {
				recycleBin.first = newParticle.next;
				newParticle.next.prev = null;
			}
			else {
				recycleBin.first = null;
			}
		}
		//if the recycle bin is empty, create a new particle (a new ampty object):
		else {
			newParticle = {};
		}

		//add to beginning of particle list
		if (particleList.first == null) {
			particleList.first = newParticle;
			newParticle.prev = null;
			newParticle.next = null;
		}
		else {
			newParticle.next = particleList.first;
			particleList.first.prev = newParticle;
			particleList.first = newParticle;
			newParticle.prev = null;
		}

		//initialize
		newParticle.x = x0;
		newParticle.y = y0;
		newParticle.z = z0;
		newParticle.velX = vx0;
		newParticle.velY = vy0;
		newParticle.velZ = vz0;
		newParticle.age = 0;
		newParticle.dead = false;
		if (Math.random() < 0.5) {
			newParticle.right = true;
		}
		else {
			newParticle.right = false;
		}
		return newParticle;
	}

	function recycle(p) {
		//remove from particleList
		if (particleList.first == p) {
			if (p.next != null) {
				p.next.prev = null;
				particleList.first = p.next;
			}
			else {
				particleList.first = null;
			}
		}
		else {
			if (p.next == null) {
				p.prev.next = null;
			}
			else {
				p.prev.next = p.next;
				p.next.prev = p.prev;
			}
		}
		//add to recycle bin
		if (recycleBin.first == null) {
			recycleBin.first = p;
			p.prev = null;
			p.next = null;
		}
		else {
			p.next = recycleBin.first;
			recycleBin.first.prev = p;
			recycleBin.first = p;
			p.prev = null;
		}
	}
}
