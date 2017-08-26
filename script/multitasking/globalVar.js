//Multitasking main
var canvas;
var vehicleElement;
var countdown, pauseMenu;
var obstacleType = ["block", "bonus", "breakable"];
var fields = new Array(2);
var generateInterval, moveInterval, scoreInterval, speedInterval,timerInterval,roadMovingInterval;
var bgm = new Audio('src/mt_bgm.mp3');

//Multitasking UI
var gamePause;

//Game
var scoreSE = new Audio('src/score.mp3');

//Score Manager
var score = 0;
var block = 0, bonus = 0, breakable = 0;
var blockSuccess = 0, bonusSuccess = 0, breakableSuccess = 0;
var scoreText;
var speedText;
var collision = false;
var overallSpeed = 3;