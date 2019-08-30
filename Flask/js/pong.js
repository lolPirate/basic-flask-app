const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const fps = 1000/60;
let paused = true;

const player1 = {
	x : 0,
	y : canvas.height/2 - 100/2,
	width : 10,
	height : 100,
	color : "white",
	score : 0
	
};

const player2 = {
	x : canvas.width - 10,
	y : canvas.height/2 - 100/2,
	width : 10,
	height : 100,
	color : "white",
	score : 0
};

const com = {
	x : canvas.width -10,
	y : canvas.height/2 - 100/2,
	width : 10,
	height : 100,
	color : "white",
	score : 0
};

const net = {
	x : canvas.width/2 - 1,
	y : 0,
	width : 2,
	height : 10,
	color : "white"
};

const ball = {
	x : canvas.width/2,
	y : canvas.height/2,
	radius : 10,
	speed : 8,
	velocityX : 5,
	velocityY : 5,
	color : "white"
};

function drawRect(x,y,w,h,color){
	context.fillStyle = color;
	context.fillRect(x,y,w,h);
}

function drawCircle(x,y,r,color){
	context.fillStyle = color;
	context.beginPath();
	context.arc(x,y,r,0,Math.PI*2,false);
	context.closePath();
	context.fill();
}

function drawText(text,x,y,color){
	context.fillStyle = color;
	context.font = "75px fantasy";
	context.fillText(text,x,y);
}


function collision(b,p){
	p.top = p.y;
	p.bottom = p.y + p.height;
	p.left = p.x;
	p.right = p.x + p.width;
	
	b.top = b.y - b.radius;
	b.bottom = b.y + b.radius;
	b.left = b.x - b.radius;
	b.right = b.x + b.radius;
	
	//collision logic
	
	if( b.top < p.bottom && b.bottom > p.top && b.left < p.right && b.right > p.left){
		return true;
	}
}


/**********************************************Updating Game Objects*******************/

function resetBall(){
	ball.x = canvas.width/2;
	ball.y = canvas.height/2;
	ball.speed = 8;
	ball.velocityX = -ball.velocityX;
	//paused = true;
	
}


function updateBall(){
	ball.x += ball.velocityX;
	ball.y += ball.velocityY;
	
	if( ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0 ){
		ball.velocityY = -ball.velocityY;
	}
	let entity = (ball.x < canvas.width/2) ? player1 : player2;
	
	if( collision(ball,entity)){
		let collidepoint = (ball.y - (entity.y + entity.height/2))/(entity.height/2);
		let angle = (Math.PI/4) * collidepoint;
		let direction = (ball.x < canvas.width/2) ? 1 : -1;
		ball.velocityX = direction * ball.speed * Math.cos(angle);
		ball.velocityY = ball.speed * Math.sin(angle);
		ball.speed += 0.1;
	}
}

function updateScore(p1,p2){
	if(ball.x - ball.radius < 0){
		p2.score++;
		resetBall();
	}
	else if(ball.x + ball.radius > canvas.width){
		p1.score++;
		resetBall();
	}
}

/**********************************************Updating Game Objects*******************/

/**********************************************Moving Paddles**************************/
canvas.addEventListener("mousemove",movePaddle);
function movePaddle(evt){
	if(!paused){
		let cv = canvas.getBoundingClientRect();
		//if(ball.velocityX < 0)
			player1.y = evt.clientY - cv.top - player1.height/2;
		//else
			//player2.y = evt.clientY - cv.top - player2.height/2;
	}
}

/*document.addEventListener("wheel",movePaddle2);
function movePaddle2(evt){
	if(!paused){
		player2.y += evt.deltaY;
		if (player2.y < 0)
			player2.y = 0;
		if (player2.y >= canvas.height)
			player2.y = canvas.height - player2.height;	
	}
}*/

document.addEventListener("keydown",movep2);
function movep2(evt){
	if(!paused){
	if(evt.code == "ArrowDown"){
		player2.y += 100;
	}
	else if(evt.code == "ArrowUp"){
		player2.y -= 100;
	}
	if (player2.y < 0)
			player2.y = 0;
	if (player2.y >= canvas.height)
		player2.y = canvas.height - player2.height;	
	}
}

document.addEventListener("keypress",togglePause);
function togglePause(evt){
	if(evt.code == "Space"){
		paused = !paused;
	}
}

/**********************************************Moving Paddles*********************************/


/**********************************************Drawing Game**********************************/
function drawTable(){
	drawRect(0,0,canvas.width,canvas.height,"black");
}

function drawNet(){
	for(let i = 0; i <= canvas.height ; i+=18)
	{
		drawRect(net.x,net.y+i,net.width,net.height,net.color);
	}
}

function drawPlayer1(){
	drawRect(player1.x,player1.y,player1.width,player1.height,player1.color);
}

function drawPlayer2(){
	drawRect(player2.x,player2.y,player2.width,player2.height,player2.color);
}

function drawBall(){
	drawCircle(ball.x,ball.y,ball.radius,ball.color);
}

function drawScore(){
	drawText(player1.score,canvas.width/4,canvas.height/5,player1.color);
	drawText(player2.score,3*canvas.width/4,canvas.height/5,player2.color);
}

/**********************************************Drawing Game**********************************/

function update(){
	updateBall();
	updateScore(player1,player2);
}

function render(){
	drawTable();
	drawNet();
	drawPlayer1();
	drawPlayer2();
	drawBall();
	drawScore();
}

function game(){
	render();//game movements
	if(!paused){
		update();//game logic
		
	}
}

setInterval(game,fps);