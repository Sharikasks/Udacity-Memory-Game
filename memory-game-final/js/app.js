let cards = ['fa-diamond',
			 'fa-diamond',
			 'fa-paper-plane-o',
			 'fa-paper-plane-o',
			 'fa-anchor',
			 'fa-anchor',
			 'fa-bolt',
			 'fa-bolt',
			 'fa-cube',
			 'fa-cube',
			 'fa-leaf',
			 'fa-leaf',
			 'fa-bicycle',
			 'fa-bicycle',
			 'fa-bomb',
			 'fa-bomb'
			 ];

function generateCard(card) {
	return `<li class="card" data-card = "${card}"><i class="fa ${card}"></i></li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initGame() {
 	let deck = document.querySelector('.deck');
 	let cardHTML = shuffle(cards).map(function(card) {
 			return generateCard(card);
 	});

 	deck.innerHTML = cardHTML.join('');
 }

initGame();

let allCards = document.querySelectorAll('.card');
let openCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let deck = document.querySelector('.deck');
let timer = document.querySelector('.timer');
let clockId;
let resetIcon = document.querySelector('.restart');
let matched = 0;
const totalPairs = 8;

function resetGame() {
	location.reload();
}

resetIcon.addEventListener('click', () => {
	resetGame();
});


function startClock () {
 		clockId = setInterval(() => {
 		time++;
 		displayTime();
 	}, 1000);
 }

 function displayTime() {
 	const minutes = Math.floor(time/60);
 	const seconds = time % 60;
 	if (seconds < 10) {
 	 	timer.innerHTML = `${minutes}:0${seconds}`;
 	 } else {
 	 	timer.innerHTML = `${minutes}:${seconds}`;
 	 }
 }

function stopClock() {
	clearInterval(clockId);
}

function toggleModal() {
	const modal = document.querySelector('.modal-background');
	modal.classList.toggle('hide');
}
function getStars () {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	return starCount;
}

function writeModal () {
	const timeScore = document.querySelector('.modal-time');
	const finalTimer = document.querySelector('.timer').innerHTML;
	const movesScore = document.querySelector('.modal-moves');
	const finalMoves = document.querySelector('.moves');
	const finalStars = document.querySelector('.modal-stars');
	const stars = getStars();

	timeScore.innerHTML = `Time = ${finalTimer}`;
	movesScore.innerHTML = `Moves = ${moves}`;
	finalStars.innerHTML = `Stars = ${stars}`;

}

document.querySelector('.cancel').addEventListener('click', () => {
	toggleModal();
});

document.querySelector('.modal-close').addEventListener('click', () => {
	toggleModal();
});

document.querySelector('.replay').addEventListener('click', () => {
	resetGame();
});

function endGame() {
	toggleModal();
	writeModal();
}
if (matched === totalPairs) {
		endGame();
	}


allCards.forEach(function(card) {
	card.addEventListener('click', function(e) {
		if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
			openCards.push(card);
			card.classList.add('open', 'show');

	    if (clockOff) {
	          startClock();
	          clockOff = false;
	        }

		if (openCards.length == 2) {
			if(openCards[0].dataset.card == openCards[1].dataset.card){
				openCards[0].classList.add('match');
				openCards[0].classList.remove('open');
				openCards[0].classList.remove('show');

				openCards[1].classList.add('match');
				openCards[1].classList.remove('open');
				openCards[1].classList.remove('show');
				openCards = [];
				matched++;
			} else {

			setTimeout(function() {
				openCards.forEach(function(card) {
					card.classList.remove('open', 'show');
					});
				openCards = [];
				}, 400);

			}

		if (matched === totalPairs) {
			endGame();
		}
	}
}

function addMove () {
	moves++;
	const movesText = document.querySelector('.moves');
		movesText.innerHTML = moves;
	}

function checkScore() {
	if (moves === 20 || moves === 38) {
		hideStar();
	}
}

function hideStar() {
	let stars = document.querySelectorAll('.stars li');
	for (star of stars) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
		}
	}
}

	 	addMove();
	 	checkScore();
	});

});