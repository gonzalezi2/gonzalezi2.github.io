/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// document.querySelector('#current-' + activePlayer).textContent = dice;
// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em';

var scores, activePlayer, roundScore, gamePlaying, previousRoll, winScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
		// 1. Rand Num
		var dice = Math.floor(Math.random() * 6) + 1;
		
		// Resets current player's total score if he/she rolls consecutive 6's
		if (previousRoll + dice === 12) {
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = '0';
			nextPlayer();
		}

		// 2. Display the result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		
		// 3. Update the round score IF the rolled number was NOT a 1
		if (dice !== 1) {
			// add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			previousRoll = dice;
		} else {
			nextPlayer();
		}
	}
});


document.querySelector('.btn-hold').addEventListener('click', function() {
	
	if (gamePlaying) {
		// 1. Add round score to global score
		scores[activePlayer] += roundScore;

		// 2. Update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		// 3. Check if player won the game
		if (scores[activePlayer] >= winScore) {
			document.getElementById('name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// 3. Next Player
			nextPlayer();
		}		
	}
	
});

document.querySelector('.btn-score').addEventListener('click', function() {
	if (gamePlaying) {
		document.querySelector('.btn-score').classList.add('inactive');
		document.querySelector('.new-score').classList.remove('inactive');
	}
});

document.getElementById('submit-score').addEventListener('click', function() {
	var newScore = document.getElementById('new-score-value').value;
	winScore = newScore;
	console.log(winScore);
	document.querySelector('.winning-score').textContent = winScore;
	document.querySelector('.btn-score').classList.remove('inactive');
	document.querySelector('.new-score').classList.add('inactive');
	
});


function nextPlayer() {
	// next player
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

//		document.querySelector('.player-0-panel').classList.remove('active');
//		document.querySelector('.player-1-panel').classList.add('active');

	document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
	scores = [0, 0],
		roundScore = 0,
		activePlayer = 0,
		previousRoll = 0,
		winScore = 100,
		gamePlaying = true;
	
	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.winning-score').textContent = '100';
	
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	
	document.querySelector('.player-0-panel').classList.add('active');
}