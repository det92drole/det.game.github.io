//UNIVERSAL VARIABLES
let offset={
    x:0,
    y:0
}

let levelBool_1=true
let levelBool_2=false
let levelBool_3=false
let levelBool_4=false
let levelBool_5=false

let boundary=[]
let startBoundary=[]
let spawnAreaArr=[]
let bossAreaArr=[]
let bossCollision=[]
let collisionMap=[]
let spawnCollision=[]
let exitLevel=[]
let exitLevelBound=[]
let bossAttackArea=[]
let bossAttackArr=[]
let enemies=[]
let movables=[]

let warlock;
let bossL2Boss;
let bossL3Boss;
let bossL4Boss;

let bossL5BossL4;
let bossL5BossL3;
let bossL5BossL2;
let bossL5BossL1;

//CANVAS ELEMENT DECLARATION
let canvas=document.getElementById('game')
let ctx = canvas.getContext('2d')
canvas.height=window.innerHeight
canvas.width=window.innerWidth

let playerHP=document.getElementById('HP')

//ANIMATIONID VARIABLE
let animationID;

//COLLISION
function rectangularCollision({rect1, rect2}){
    return(rect1.pos.x+rect1.width>=rect2.pos.x&&
        rect1.pos.x<=rect2.pos.x+rect2.width&&
        rect1.pos.y+rect1.height*(1/4)<=rect2.pos.y+rect2.height&&
        rect1.pos.y+rect1.height>=rect2.pos.y)
}

//REDUCE VEC x&y
function reduceToRange(a, b) {
    // Find the maximum absolute value of a and b
    const maxAbs = Math.max(Math.abs(a), Math.abs(b));

    // Divide both a and b by the maximum absolute value, but ensure they have the same sign
    const reducedA = a / maxAbs;
    const reducedB = b / maxAbs;

    return [reducedA, reducedB];
}

//offset for diff window sizes
let windowX, windowY
function windowOffset(){
    windowX=(canvas.width/2 - (192/4)/2)-616
    windowY=(canvas.height/2- 68/2)-263.5

    return [windowX, windowY]
}

function animate1(){

    //CHECK COLLISION with PLAYER
    
    playerCollision()
    checkPlayerDamage()
    //CREATE FIREBALL
    fireBallFunc()

    //CHECK COLLISION with FIREBALL and ENEMY/WALL
    fireCollisionCheck()

    //CHECK GHOST COLLISION with WALL
    enemyCollision()

    //ANIMATION CALLS
    animationID=requestAnimationFrame(animate1);

    drawGame()
}

