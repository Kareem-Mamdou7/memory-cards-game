const cardContents = document.querySelectorAll(".card-content");
const remainingPairsDisplay = document.getElementById("remaining-display");
const reshuffleButton = document.getElementById("reshuffle");
const cards = document.querySelectorAll(".card");
let wrongAnswerTimeout;
let remainingPairs = cards.length / 2;
let firstSelection;
let secondSelection;
let firstSelectionChild;
let secondSelectionChild;
let solvedCards = [];

let isPaused = false;

const pairs = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",

	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
];

shuffle();

reshuffleButton.addEventListener("click", reshuffle);

function shuffle() {
	let pairsCopy = structuredClone(pairs);

	cardContents.forEach((card) => {
		randomIndex = Math.floor(Math.random() * pairsCopy.length);
		randomPairSelection = pairsCopy[randomIndex];
		card.innerText = randomPairSelection;

		if (randomIndex > -1) pairsCopy.splice(randomIndex, 1);
		card.classList.add("hidden");
	});
}

function reshuffle() {
	remainingPairs = cards.length / 2;
	remainingPairsDisplay.innerText = ``;
	shuffle();
	resetSelections();
	unflipAllCards();

	solvedCards = [];
}

cards.forEach((card) => {
	card.addEventListener("click", () => {
		if (
			!solvedCards.includes(card.children[0]) &&
			!card.classList.contains("flipped") &&
			!isPaused
		) {
			if (!firstSelection) {
				card.classList.add("flipped");
				firstSelection = card;
				firstSelectionChild = card.children[0];
				firstSelectionChild.classList.remove("hidden");
			} else {
				isPaused = true;

				secondSelection = card;
				secondSelectionChild = secondSelection.children[0];

				if (secondSelectionChild.innerText === firstSelectionChild.innerText) {
					solvedCards.push(firstSelection);
					solvedCards.push(secondSelection);

					remainingPairs--;
					renderRemainingPairs();
					secondSelectionChild.classList.remove("hidden");
					secondSelection.classList.add("flipped");
					resetSelections();
					isPaused = false;

					if (solvedCards.length === cards.length) {
						reshuffle();
					}
				} else {
					secondSelectionChild.classList.remove("hidden");
					secondSelection.classList.add("flipped");

					wrongAnswerTimeout = setTimeout(() => {
						firstSelection.classList.remove("flipped");
						secondSelection.classList.remove("flipped");
						firstSelectionChild.classList.add("hidden");
						secondSelectionChild.classList.add("hidden");
						resetSelections();
						isPaused = false;
					}, 500);
				}
			}
		}
	});
});

function resetSelections() {
	firstSelection = null;
	secondSelection = null;
	clearTimeout(wrongAnswerTimeout);
}

function unflipAllCards() {
	cards.forEach((card) => {
		card.classList.remove("flipped");
	});
}

function renderRemainingPairs() {
	remainingPairsDisplay.innerText = `Remaining Pairs = ${remainingPairs}`;
}
