function Clock() {
	let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	let d = () => new Date;

	let addZero = (arg) => {
		if (arg < 10) arg = '0' + arg;
		return arg; 
	};

	this.getDay = () => d().getDay();

	this.getFullDate = () => months[d().getMonth()] + ' ' + d().getDate() + ', ' + d().getFullYear();
	
	this.getFullTime = () => addZero(d().getHours()) + ' : ' + addZero(d().getMinutes()) + ' : ' + addZero(d().getSeconds());	
}

function ClockElems() {
	this.display = document.getElementById('display');	
	this.days = document.getElementsByClassName('day');	
	this.colorSection = document.getElementById('color-picker');
	this.dateTime = document.getElementById('date-time');
	this.startButton = document.getElementById('start');
	this.stopButton = document.getElementById('stop');
	this.dateButton = document.getElementById('date');
	this.colorSectionButtons = document.getElementsByClassName('color');
	this.styleButton = document.getElementById('style');
}

(function() {
	let clock = new Clock();
	let elems = new ClockElems();
	let timer;

	function disable(el) {
		el.disabled = true;
	}
	function enable(el) {
		el.disabled = false;
	}
	function start() {
		timer = setInterval(function() {
		elems.dateTime.innerHTML = clock.getFullTime();
		elems.days[clock.getDay()].style.opacity = '1';
		elems.days[clock.getDay()].style.fontWeight = 'bold';
		}, 50)
	}
	function stop() {
		clearInterval(timer);
	}
	function getMyDate() {
		elems.dateTime.innerHTML = clock.getFullDate(); 			
	}
	function showColorSection() {
		elems.colorSection.style.visibility = 'visible';
	}
	function hideColorSection() {
		elems.colorSection.style.visibility = 'hidden';
	}
	function changeDisplayColor(el) {
		elems.display.style.color = el.id;
	}

	for (let i = 0, len = elems.colorSectionButtons.length; i < len; i++) {
		elems.colorSectionButtons[i].addEventListener('click', function() {
			changeDisplayColor(this);
			hideColorSection();
			enable(elems.styleButton);
		})
	}

	elems.startButton.addEventListener('click', function() {
		disable(this);
		start();
		enable(elems.stopButton);
		enable(elems.dateButton);		
	});

	elems.stopButton.addEventListener('click', function() {
		disable(this);
		stop();
		enable(elems.startButton);		
	});

	elems.dateButton.addEventListener('click', function() {
		disable(this);
		stop();
		getMyDate();
		enable(elems.startButton);
		disable(elems.stopButton);		
	});

	elems.styleButton.addEventListener('click', function() {
		disable(this);
		showColorSection();		
	});

	start();
	disable(elems.startButton);
})();
