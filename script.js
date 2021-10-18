const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let time = 0
let score = 0
let interval = null

startBtn.addEventListener('click',(e) => {
	e.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click',(e) => {
	if (e.target.classList.contains('time-btn')) {
		console.log(e.target)
		time = parseInt(e.target.getAttribute('data-time'))
		screens[1].classList.add('up')
		startGame()
	}
})

board.addEventListener('click',(e) => {
	if (e.target.classList.contains('circle')) {
		score++
		e.target.remove()
		createRandomCircles()
	}
})

function startGame() {
	interval = setInterval(decreaseTime,1000)
	createRandomCircles()
	setTime(time)
}

function decreaseTime() {
	console.log('works')
	if (time <= 0) {
		finishGame()
		clearInterval(interval)
	} else {
		let current = --time
		current = ('0' + current).slice(-2)
		setTime(current)
	}
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`
}

function finishGame() {
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircles() {
	const circle = document.createElement('div')
	const size = getRandomNumber(10,60)
	const {width,height} = board.getBoundingClientRect()
	const x = getRandomNumber(0,width - size)
	const y = getRandomNumber(0,height - size)

	circle.classList.add('circle')
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.top = `${y}px`
	circle.style.left = `${x}px`
	board.appendChild(circle)
}

function getRandomNumber(min,max) {
	return Math.floor(Math.random() * (max - min + 1)) + min
}