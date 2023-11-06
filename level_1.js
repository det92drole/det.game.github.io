//LEVEL 1 ENVIRONMENT AND ENEMIES
//DECLARE ENVIRONMENT
const level1Map=new Image()
level1Map.src="./img/map.png"
const level1Map2=new Image()
level1Map2.src="./img/LEVEL1_2map.png"

let div=document.getElementById('overlappingDiv')



let background=new Sprite({
    pos:{
        x:offset.x,
        y:offset.y
    },
    img:level1Map
})

let bossFireBalls=[]
let bossCooldown=0
let blastCount=0
//clear global boundary and spawn arrays, fill arrays with level2 values
function initLevel1(){
    boundary=[]
    startBoundary=[]
    spawnAreaArr=[]
    bossAreaArr=[]
    bossCollision=[]
    collisionMap=[]
    spawnCollision=[]
    enemies=[]
    exitLevel=[]
    exitLevelBound=[]
    bossAttackArr=[]
    bossAttackArea=[]


    for(let i=0; i<collision.length;i+=100){
        collisionMap.push(collision.slice(i,i+100));
    }

    for(let i=0; i<exitLevel1.length;i+=100){
        exitLevel.push(exitLevel1.slice(i,i+100))
    }

    exitLevel.forEach((row,i)=>{
        row.forEach((symbol, j)=>{
            if(symbol===1){
                exitLevelBound.push(
                    new Boundary({
                        pos:{
                            x:j*64+offset.x,
                            y:i*64+offset.y
                        },
                        color:'rgba(255,0,0,1)'
                    })
                )
            }
        })
    })

    collisionMap.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===13){
                boundary.push(
                    new Boundary({
                        pos:{
                            x:j*64+offset.x,
                            y:i*64+offset.y
                        },
                        color:'rgba(255,0,0,0)'
                    })
                )
            }
        })
    })

    const introCollision=[]
    for(let i=0; i<startCollision.length;i+=100){
        introCollision.push(startCollision.slice(i,i+100));
    }

    introCollision.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===92){
                startBoundary.push(
                    new Boundary({
                        pos:{
                            x:j*64+offset.x,
                            y:i*64+offset.y
                        },
                        color:'rgba(255,0,0,0)'
                    })
                )
            }
        })
    })

    for(let i=0; i<spawnArea.length;i+=100){
        spawnCollision.push(spawnArea.slice(i,i+100));
    }

    spawnCollision.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===1){
                spawnAreaArr.push(
                    new Boundary({
                        pos:{
                            x:j*64+offset.x,
                            y:i*64+offset.y
                        },
                        color:'rgba(255,0,0,0)'
                    })
                )
            }
        })
    })

    for(let i=0; i<bossArea.length;i+=100){
        bossCollision.push(bossArea.slice(i,i+100));
    }

    bossCollision.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===1){
                bossAreaArr.push(
                    new Boundary({
                        pos:{
                            x:j*64+offset.x,
                            y:i*64+offset.y
                        },
                        color:'rgba(255,0,0,0)'
                    })
                )
            }
        })
    })
    enemySpawnL1Func()
    movables=[warlock, ...bossAreaArr, 
        background, ...boundary, ...spawnAreaArr,
        ...startBoundary, ...exitLevelBound]
}
//ENEMIES ARE GENERATED


function enemySpawnL1Func(){
    spawnAreaArr.forEach(area=>{
        let rand0 = Math.floor(Math.random() * 3) - 1; // Random value between -1, 0, 1
        let rand1;
    
        if (rand0 === 0) {
            rand1=Math.floor(Math.random() * 0.5) <0.5? 1:-1
        }else{
            rand1=0
        }
    
        for (let i=0;i<1;i++){
            const ghost=new Image();
            ghost.src="./img/ghost.png"
            
            enemies.push(new Sprite({
                pos:{
                    x: area.pos.x,
                    y: area.pos.y
                },
                img:ghost,
                stepCount:0,
                health:{max:10, cur:10},
                vec:{x:rand1, y:rand0},
                damage:10
            }))
        }
    })

    //BOSS CREATION

    const warlockImage=new Image();
    warlockImage.src="./img/warlock.png"

    warlock=new Sprite({
        pos:{
            x: bossAreaArr[Math.floor(bossAreaArr.length*(3/5))].pos.x,
            y: bossAreaArr[Math.floor(bossAreaArr.length*(3/5))].pos.y
        },
        img:warlockImage,
        frames:{
            max:9
        },
        health:{max:100, cur:50}
        
    })
    warlock.moving=true
}

function bossAttack(target){
    xT=target.pos.x
    yT=target.pos.y
    // REWORK: dist=Math.hypot(warlock.pos.x-(player.pos.x+(player.width/2)), warlock.pos.y-(player.pos.y+(player.height/2)))
    vecx= xT-warlock.pos.x
    vecy= yT-warlock.pos.y
    //console.log("VECTORS", vecx, vecy)
    
    const [vecxR, vecyR] = reduceToRange(vecx, vecy);
    if(blastCount>=10){
        bossCooldown=130
        blastCount=0
    }else if (bossCooldown<=0){
        bossCooldown=20
        const blue_fire=new Image()
        blue_fire.src='./img/blue_fire.png'
        bossFireBalls.push(new Sprite({
            pos:{
                x: warlock.pos.x,
                y: warlock.pos.y
            },
            img:blue_fire,
            frames:{
                max:1
            },
            damage:5
        }))
        bossFireBalls[bossFireBalls.length-1].moving=true
        bossFireBalls[bossFireBalls.length-1].vec.x=vecxR
        bossFireBalls[bossFireBalls.length-1].vec.y=vecyR
        blastCount+=1
    }
    bossCooldown-=1
}

//START GAME DIALOGUE
let startGame=true
function startBoundDialogue(){
    for(let i=0;i<startBoundary.length;i++){
        const bound=startBoundary[i]
        if (rectangularCollision({
            rect1:player,
            rect2: {...bound, pos:{
                x:bound.pos.x,
                y:bound.pos.y
            }}
        })){
            //console.log('HIT')
            moving=false
            wizardDialogue()
            startGame=false
            break
        }
    }
}

function wizardDialogue(){
    let HP=document.getElementById("healthBar")
    HP.style.opacity="0"
    div.style.opacity="1"
    div.innerText="You are a wizard with no spells. \nI'll teach you one... \nPress <1> to select the spell.\nThen press <spacebar> to throw a fireball! \nFight! Win! \nThen tell me about it later...\n \n \n <click> to continue..."
    document.addEventListener('click', function(){
        div.style.opacity="0"
        HP.style.opacity="1"
    })
}
