//PLAYER AND PLAYER MOVEMENT RELATIVE TO GAME

const playerDownImage=new Image();
playerDownImage.src="./img/playerDown.png"
const playerUpImage=new Image();
playerUpImage.src="./img/playerUp.png"
const playerRightImage=new Image();
playerRightImage.src="./img/playerRight.png"
const playerLeftImage=new Image();
playerLeftImage.src="./img/playerLeft.png"

const player=new Sprite({
    pos:{
        x: canvas.width/2 - (192/4)/2,
        y: canvas.height/2- 68/2
    },
    img:playerDownImage,
    frames:{
        max:4
    },
    health:{max:10, cur:10},
    sprites: {
        up: playerUpImage,
        down: playerDownImage, 
        right: playerRightImage,
        left: playerLeftImage,
    }
    
})

//PLAYER FIREBALL
const fireBallsArr=[]
let fireCooldown=0;

function fireBallOne(){
    if(fireCooldown<=0){
        // let clone = deepClone(player);
        const fireBallImage=new Image();
        fireBallImage.src="./img/fireball.png"
        fireBallsArr.push(new Sprite({
            pos:{
                x: canvas.width/2 - (192/4)/2,
                y: canvas.height/2- 68/2
            },
            img:fireBallImage,
            frames:{
                max:4
            },
            damage:10
        }))
        //console.log(fireBallsArr)
        fireBallsArr[fireBallsArr.length-1].moving=true
        if (lastKey==='w'){
            fireBallsArr[fireBallsArr.length-1].vec.y-=5;
        }
        if(lastKey==='a'){
            fireBallsArr[fireBallsArr.length-1].vec.x-=5
        }
        if (lastKey==='s'){
            fireBallsArr[fireBallsArr.length-1].vec.y+=5
        }
        if(lastKey==='d'){
            fireBallsArr[fireBallsArr.length-1].vec.x+=5
        }
        fireCooldown=35
    }
}
function fireBallFunc(){
    if(!startGame){
        if(keys.space.press){
            if(keys.one.press){
                fireBallOne()
            }
        }
        if(fireCooldown>0){
            fireCooldown--
        }
    }
}

function fireCollisionCheck(){
    fireBallsArr.forEach((fireBall, index)=>{
        enemies.forEach((enemy,indexE)=>{
            if(rectangularCollision({
                rect1:{...fireBall},
                rect2: {...enemy, pos:{
                    x:enemy.pos.x,
                    y:enemy.pos.y
                }}
            })){
                fireBallsArr.splice(index,1)
                enemies.splice(indexE,1)
            }
        })

        boundary.forEach((bound,indexB)=>{
            if(rectangularCollision({
                rect1:{...fireBall},
                rect2: {...bound, pos:{
                    x:bound.pos.x,
                    y:bound.pos.y
                }}
            })){
                fireBallsArr.splice(index,1)
            }
        })
    })
    if (levelBool_1){
        for (let i=0;i<fireBallsArr.length;i++){
            //BOSS HITS
            fireBall=fireBallsArr[i]
            if(rectangularCollision({
                rect1:warlock,
                rect2: {...fireBall, pos:{
                    x:fireBall.pos.x,
                    y:fireBall.pos.y
                }}
            })){
                //console.log("HIT BOSS")
                warlock.health.cur-=fireBall.damage
                fireBallsArr.splice(i,1)
            }
        }
    }
    if (levelBool_2){
        for (let i=0;i<fireBallsArr.length;i++){
            //BOSS HITS
            fireBall=fireBallsArr[i]
            if(rectangularCollision({
                rect1:bossL2Boss,
                rect2: {...fireBall, pos:{
                    x:fireBall.pos.x,
                    y:fireBall.pos.y
                }}
            })){
                //console.log("HIT BOSS")
                bossL2Boss.health.cur-=fireBall.damage
                fireBallsArr.splice(i,1)
            }
        }
    }
    if (levelBool_3){
        for (let i=0;i<fireBallsArr.length;i++){
            //BOSS HITS
            fireBall=fireBallsArr[i]
            if(rectangularCollision({
                rect1:bossL3Boss,
                rect2: {...fireBall, pos:{
                    x:fireBall.pos.x,
                    y:fireBall.pos.y
                }}
            })){
                //console.log("HIT BOSS")
                bossL3Boss.health.cur-=fireBall.damage
                fireBallsArr.splice(i,1)
            }
        }
    }
    if (levelBool_4){
        fireBallsArr.forEach((fireBall, index)=>{
            bossL4FireBall.forEach((minion,indexE)=>{
                if(rectangularCollision({
                    rect1:{...fireBall},
                    rect2: {...minion, pos:{
                        x:minion.pos.x,
                        y:minion.pos.y
                    }}
                })){
                    fireBallsArr.splice(index,1)
                    bossL4FireBall.splice(indexE,1)
                }
            })
        })
            
        for (let i=0;i<fireBallsArr.length;i++){
            //BOSS HITS
            fireBall=fireBallsArr[i]
            if(rectangularCollision({
                rect1:bossL4Boss,
                rect2: {...fireBall, pos:{
                    x:fireBall.pos.x,
                    y:fireBall.pos.y
                }}
            })){
                //console.log("HIT BOSS")
                bossL4Boss.health.cur-=fireBall.damage
                fireBallsArr.splice(i,1)
            }
        }
    }
    if (levelBool_5){
        fireBallsArr.forEach((fireBall, index)=>{
            bossL5FireBallL4.forEach((minion,indexE)=>{
                if(rectangularCollision({
                    rect1:{...fireBall},
                    rect2: {...minion, pos:{
                        x:minion.pos.x,
                        y:minion.pos.y
                    }}
                })){
                    fireBallsArr.splice(index,1)
                    bossL5FireBallL4.splice(indexE,1)
                }
            })
        })
        
        function playerDamageBossL5(boss){
            for (let i=0;i<fireBallsArr.length;i++){
                //BOSS HITS
                fireBall=fireBallsArr[i]
                if(rectangularCollision({
                    rect1:boss,
                    rect2: {...fireBall, pos:{
                        x:fireBall.pos.x,
                        y:fireBall.pos.y
                    }}
                })){
                    //console.log("HIT BOSS")
                    boss.health.cur-=fireBall.damage
                    fireBallsArr.splice(i,1)
                }
            }
        }
        playerDamageBossL5(bossL5BossL1)
        playerDamageBossL5(bossL5BossL2)
        playerDamageBossL5(bossL5BossL3)
        playerDamageBossL5(bossL5BossL4)
        
    }
}

//CLONE PLAYER
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj; // Return non-objects as is
    }
  
    if (Array.isArray(obj)) {
      const newArray = [];
      for (let i = 0; i < obj.length; i++) {
        newArray[i] = deepClone(obj[i]);
      }
      return newArray;
    }
  
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key]);
      }
    }
    return newObj;
}
//CHECK COLLISION with PLAYER
function playerCollision(){
    let moving=true
    player.moving=false
    if(startGame){
        startBoundDialogue()
    }
    if (keys.w.press&&lastKey==='w'){
        player.moving=true
        player.img=player.sprites.up
        for(let i=0;i<exitLevelBound.length;i++){
            const bound=exitLevelBound[i]
            if (levelBool_1){
                if (rectangularCollision({
                    rect1:player,
                    rect2: {...bound, pos:{
                        x:bound.pos.x,
                        y:bound.pos.y+3
                    }}
                })){
                    //console.log('LEVEL2 DOOR HIT')
                    moving=false
                    initLevel2()
                    levelBool_1=false
                    levelBool_2=true
                    
                    break
                }
            }
            if (levelBool_2){
                if (rectangularCollision({
                    rect1:player,
                    rect2: {...bound, pos:{
                        x:bound.pos.x,
                        y:bound.pos.y+3
                    }}
                })){
                    //console.log('LEVEL2 DOOR HIT')
                    moving=false
                    initLevel3()
                    levelBool_2=false
                    levelBool_3=true
                    
                    break
                }
            }
            if (levelBool_3){
                if (rectangularCollision({
                    rect1:player,
                    rect2: {...bound, pos:{
                        x:bound.pos.x,
                        y:bound.pos.y+3
                    }}
                })){
                    //console.log('LEVEL3 DOOR HIT')
                    moving=false
                    initLevel4()
                    levelBool_3=false
                    levelBool_4=true
                    
                    break
                }
            }
            if (levelBool_4){
                if (rectangularCollision({
                    rect1:player,
                    rect2: {...bound, pos:{
                        x:bound.pos.x,
                        y:bound.pos.y+3
                    }}
                })){
                    //console.log('LEVEL4 DOOR HIT')
                    moving=false
                    initLevel5()
                    levelBool_4=false
                    levelBool_5=true
                    
                    break
                }
            }
            if(levelBool_5){
                if (rectangularCollision({
                    rect1:player,
                    rect2: {...bound, pos:{
                        x:bound.pos.x,
                        y:bound.pos.y+3
                    }}
                })){
                    //console.log('LEVEL5 DOOR HIT')
                    let HP=document.getElementById("healthBar")
                    HP.style.opacity="0"
                    div.style.opacity="1"
                    div.innerText="YOU WON! \n \n \n Now go outside and touch some grass! \n \n \n Or... <click> to play again..."
                    document.addEventListener('click', function(){
                        location.reload()
                    })
                    break
                }
                
            }
            
        }
        for(let i=0;i<boundary.length;i++){
            const bound=boundary[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bound, pos:{
                    x:bound.pos.x,
                    y:bound.pos.y+3
                }}
            })){
                //console.log('HIT')
                moving=false
                break
            }
        }
        if(moving){
            movables.forEach(movable=>{movable.pos.y+=3})
            enemies.forEach(enemy=>{enemy.pos.y+=3})
            bossFireBalls.forEach(fireBall=>{fireBall.pos.y+=3})
            fireBallsArr.forEach(fireBall=>{fireBall.pos.y+=3})
            bossL3FireBall.forEach(fireBall=>{fireBall.pos.y+=3})
            bossL4FireBall.forEach(fireBall=>{fireBall.pos.y+=3})
            bossL5FireBallL1.forEach(fireBall=>{fireBall.pos.y+=3})
            bossL5FireBallL3.forEach(fireBall=>{fireBall.pos.y+=3})
            bossL5FireBallL4.forEach(fireBall=>{fireBall.pos.y+=3})
        }   
    }else if (keys.a.press&&lastKey==='a'){
        player.moving=true
        player.img=player.sprites.left
        for(let i=0;i<boundary.length;i++){
            const bound=boundary[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bound, pos:{
                    x:bound.pos.x+3,
                    y:bound.pos.y
                }}
            })){
                //console.log('HIT')
                moving=false
                break
            }
        }
        if(moving){
            movables.forEach(movable=>{movable.pos.x+=3})
            enemies.forEach(enemy=>{enemy.pos.x+=3})
            bossFireBalls.forEach(fireBall=>{fireBall.pos.x+=3})
            fireBallsArr.forEach(fireBall=>{fireBall.pos.x+=3})
            bossL3FireBall.forEach(fireBall=>{fireBall.pos.x+=3})
            bossL4FireBall.forEach(fireBall=>{fireBall.pos.x+=3})
            bossL5FireBallL1.forEach(fireBall=>{fireBall.pos.x+=3})
            bossL5FireBallL3.forEach(fireBall=>{fireBall.pos.x+=3})
            bossL5FireBallL4.forEach(fireBall=>{fireBall.pos.x+=3})
        }  
    }else if (keys.s.press&&lastKey==='s'){
        player.moving=true
        player.img=player.sprites.down
        for(let i=0;i<boundary.length;i++){
            const bound=boundary[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bound, pos:{
                    x:bound.pos.x,
                    y:bound.pos.y-3
                }}
            })){
                //console.log('HIT')
                moving=false
                break
            }
        }
        if(moving){
            movables.forEach(movable=>{movable.pos.y-=3})
            enemies.forEach(enemy=>{enemy.pos.y-=3})
            bossFireBalls.forEach(fireBall=>{fireBall.pos.y-=3})
            fireBallsArr.forEach(fireBall=>{fireBall.pos.y-=3})
            bossL3FireBall.forEach(fireBall=>{fireBall.pos.y-=3})
            bossL4FireBall.forEach(fireBall=>{fireBall.pos.y-=3})
            bossL5FireBallL1.forEach(fireBall=>{fireBall.pos.y-=3})
            bossL5FireBallL3.forEach(fireBall=>{fireBall.pos.y-=3})
            bossL5FireBallL4.forEach(fireBall=>{fireBall.pos.y-=3})
        }  
    }else if (keys.d.press&&lastKey==='d'){
        player.moving=true
        player.img=player.sprites.right
        for(let i=0;i<boundary.length;i++){
            const bound=boundary[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bound, pos:{
                    x:bound.pos.x-3,
                    y:bound.pos.y
                }}
            })){
                //console.log('HIT')
                moving=false
                break
            }
        }
        if(moving){
            movables.forEach(movable=>{movable.pos.x-=3})
            enemies.forEach(enemy=>{enemy.pos.x-=3})
            bossFireBalls.forEach(fireBall=>{fireBall.pos.x-=3})
            fireBallsArr.forEach(fireBall=>{fireBall.pos.x-=3})
            bossL3FireBall.forEach(fireBall=>{fireBall.pos.x-=3})
            bossL4FireBall.forEach(fireBall=>{fireBall.pos.x-=3})
            bossL5FireBallL1.forEach(fireBall=>{fireBall.pos.x-=3})
            bossL5FireBallL3.forEach(fireBall=>{fireBall.pos.x-=3})
            bossL5FireBallL4.forEach(fireBall=>{fireBall.pos.x-=3})
        }  
    }
    if(levelBool_1){
        for(let i=0;i<bossAreaArr.length;i++){
            const bossLZ=bossAreaArr[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossLZ, pos:{
                    x:bossLZ.pos.x,
                    y:bossLZ.pos.y
                }}
            })){
                //console.log('BOSS ZONE', bossLZ)
                if(warlock.health.cur>0){
                    bossAttack(bossLZ)
                }
                
                break
            }
        }
    }
    if(levelBool_2){
        for(let i=0;i<bossAttackArr.length;i++){
            const bossLZ=bossAttackArr[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossLZ, pos:{
                    x:bossLZ.pos.x,
                    y:bossLZ.pos.y
                }}
            })){
                //console.log('BOSS ZONE', bossLZ)
                if(bossL2Boss.health.cur>0){
                    bossL2Func(bossLZ)
                }
                break
            }
            else{
                xT=bossAreaArr[0].pos.x
                yT=bossAreaArr[0].pos.y
                vecx= xT-bossL2Boss.pos.x
                vecy= yT-bossL2Boss.pos.y
                const [vecxR, vecyR] = reduceToRange(vecx, vecy);
                bossL2Boss.moving=true
                bossL2Boss.vec.x=vecxR
                bossL2Boss.vec.y=vecyR
                if(bossL2Boss.pos.x==bossAreaArr[0].pos.x&&bossL2Boss.pos.y==bossAreaArr[0].pos.y){
                    bossL2Boss.moving=false
                }
            }
        }
        //console.log("CHECK BOSS HIT")
        bossL2Hit(player)
    }
    if (levelBool_3){
        for(let i=0;i<bossAttackArr.length;i++){
            const bossLZ=bossAttackArr[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossLZ, pos:{
                    x:bossLZ.pos.x,
                    y:bossLZ.pos.y
                }}
            })){
                //console.log('BOSS ZONE', bossLZ)
                if(bossL3Boss.health.cur>0){
                    bossL3Func(bossLZ)
                }
                break
            }
        }
    }
    if (levelBool_4){
        bossL4Hit(player)
        for(let i=0;i<bossAttackArr.length;i++){
            const bossLZ=bossAttackArr[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossLZ, pos:{
                    x:bossLZ.pos.x,
                    y:bossLZ.pos.y
                }}
            })){
                //console.log('BOSS ZONE', bossLZ)
                if(bossL4Boss.health.cur>0){
                    bossL4Func(bossLZ)
                }
                break
            }else{
                xT=bossAreaArr[0].pos.x
                yT=bossAreaArr[0].pos.y
                vecx= xT-bossL4Boss.pos.x
                vecy= yT-bossL4Boss.pos.y
                const [vecxR, vecyR] = reduceToRange(vecx, vecy);
                bossL4Boss.moving=true
                bossL4Boss.vec.x=vecxR
                bossL4Boss.vec.y=vecyR
                if(bossL4Boss.pos.x==bossAreaArr[0].pos.x&&bossL4Boss.pos.y==bossAreaArr[0].pos.y){
                    bossL4Boss.moving=false
                }
            }
        }
    }
    if(levelBool_5){
        //add all boss functions here
        //L1
        for(let i=0;i<bossAttackArr.length;i++){
            const bossLZ=bossAttackArr[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossLZ, pos:{
                    x:bossLZ.pos.x,
                    y:bossLZ.pos.y
                }}
            })){
                //console.log('BOSS ZONE', bossLZ)
                if(bossL5BossL1.health.cur>0){
                    bossL5L1Func(bossLZ)
                }
                
                break
            }
        }
        //L2
        for(let i=0;i<bossAttackArr.length;i++){
            const bossLZ=bossAttackArr[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossLZ, pos:{
                    x:bossLZ.pos.x,
                    y:bossLZ.pos.y
                }}
            })){
                //console.log('BOSS ZONE', bossLZ)
                if(bossL5BossL2.health.cur>0){
                    bossL5L2Func(bossLZ)
                }
                break
            }
            else{
                xT=bossAreaArr[0].pos.x
                yT=bossAreaArr[0].pos.y
                vecx= xT-bossL5BossL2.pos.x
                vecy= yT-bossL5BossL2.pos.y
                const [vecxR, vecyR] = reduceToRange(vecx, vecy);
                bossL5BossL2.moving=true
                bossL5BossL2.vec.x=vecxR
                bossL5BossL2.vec.y=vecyR
                if(bossL5BossL2.pos.x==bossAreaArr[0].pos.x&&bossL5BossL2.pos.y==bossAreaArr[0].pos.y){
                    bossL5BossL2.moving=false
                }
            }
        }
        //console.log("CHECK BOSS HIT")
        bossL5L2Hit(player)

        // L3
        for(let i=0;i<bossAttackArr.length;i++){
            const bossLZ=bossAttackArr[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossLZ, pos:{
                    x:bossLZ.pos.x,
                    y:bossLZ.pos.y
                }}
            })){
                //console.log('BOSS ZONE', bossLZ)
                if(bossL5BossL3.health.cur>0){
                    bossL5L3Func(bossLZ)
                }
                break
            }
        }
        // L4
        bossL5L4Hit(player)
        for(let i=0;i<bossAttackArr.length;i++){
            const bossLZ=bossAttackArr[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossLZ, pos:{
                    x:bossLZ.pos.x,
                    y:bossLZ.pos.y
                }}
            })){
                //console.log('BOSS ZONE', bossLZ)
                if(bossL5BossL4.health.cur>0){
                    bossL5L4Func(bossLZ)
                }
                break
            }else{
                xT=bossAreaArr[1].pos.x
                yT=bossAreaArr[1].pos.y
                vecx= xT-bossL5BossL4.pos.x
                vecy= yT-bossL5BossL4.pos.y
                const [vecxR, vecyR] = reduceToRange(vecx, vecy);
                bossL5BossL4.moving=true
                bossL5BossL4.vec.x=vecxR
                bossL5BossL4.vec.y=vecyR
                if(bossL5BossL4.pos.x==bossAreaArr[1].pos.x&&bossL5BossL4.pos.y==bossAreaArr[1].pos.y){
                    bossL5BossL4.moving=false
                }
            }
        }


    }
    
}

//CHECK ENEMY COLLISION

function enemyCollision(){
    // for (let j=0;j<enemies.length;j++){
    //     if (enemies[j].stepCount <= 0) {
    //         enemies[j].stepCount = 50;
    //         // Change direction randomly
    //         let rand0 = Math.floor(Math.random() * 3) - 1; // Random value between -1, 0, 1
    //         let rand1;

    //         if (rand0 === 0) {
    //             rand1=Math.floor(Math.random() * 0.5) <0.5? 1:-1
    //         }else{
    //             rand1=0
    //         }
    //         enemies[j].vec.x = rand1
    //         enemies[j].vec.y = rand0
    //     }
    // }

    for (let j=0;j<enemies.length;j++){
        let dist=1

        for(let i=0;i<boundary.length;i++){
            const bound=boundary[i]
            
            if (rectangularCollision({
                rect1:enemies[j],
                rect2: {...bound, pos:{
                            x:bound.pos.x,
                            y:bound.pos.y+(3*dist)
                        }}
            })){
                //top of ghost hit
                // console.log("XandY",enemies[j].vec.x, enemies[j].vec.y)
                // console.log("POS", enemies[j].pos.x, enemies[j].pos.y)
                // console.log("WALL", bound.pos.x, bound.pos.y)
                enemies[j].vec.y=-enemies[j].vec.y
                enemies[j].pos.y+=1
                enemies[j].stepCount=50
                // console.log("GHOST HIT",enemies[j].vec.x, enemies[j].vec.y)
                
            }
            if (rectangularCollision({
                rect1:enemies[j],
                rect2: {...bound, pos:{
                            x:bound.pos.x,
                            y:bound.pos.y-(3*dist)
                        }}
            })){
                //bottom of ghost hit
                // console.log("XandY",enemies[j].vec.x, enemies[j].vec.y)
                // console.log("POS", enemies[j].pos.x, enemies[j].pos.y)
                // console.log("WALL", bound.pos.x, bound.pos.y)
                enemies[j].vec.y=-enemies[j].vec.y
                enemies[j].pos.y-=1
                enemies[j].stepCount=50
                // console.log("GHOST HIT",enemies[j].vec.x, enemies[j].vec.y)
            }
            if (rectangularCollision({
                rect1:enemies[j],
                rect2: {...bound, pos:{
                            x:bound.pos.x-(3*dist),
                            y:bound.pos.y
                        }}
            })){
                //right of ghost hit
                // console.log("XandY",enemies[j].vec.x, enemies[j].vec.y)
                // console.log("POS", enemies[j].pos.x, enemies[j].pos.y)
                // console.log("WALL", bound.pos.x, bound.pos.y)
                enemies[j].vec.x=-enemies[j].vec.x
                enemies[j].pos.x-=1
                enemies[j].stepCount=50
                // console.log("GHOST HIT",enemies[j].vec.x, enemies[j].vec.y)
            }
            if (rectangularCollision({
                rect1:enemies[j],
                rect2: {...bound, pos:{
                            x:bound.pos.x+(3*dist),
                            y:bound.pos.y
                        }}
            })){
                //left of ghost hit
                // console.log("XandY",enemies[j].vec.x, enemies[j].vec.y)
                // console.log("POS", enemies[j].pos.x, enemies[j].pos.y)
                // console.log("WALL", bound.pos.x, bound.pos.y)
                enemies[j].vec.x=-enemies[j].vec.x
                enemies[j].pos.x+=1
                enemies[j].stepCount=50
                // console.log("GHOST HIT",enemies[j].vec.x, enemies[j].vec.y)
            }
        }

        
        const xd=enemies[j].vec.x
        const yd=enemies[j].vec.y
        
        
        enemies[j].pos.x+=dist*xd
        enemies[j].pos.y+=dist*yd
        enemies[j].stepCount-=1
        
    }

    for (let i=0; i<bossFireBalls.length;i++){
        fireBall=bossFireBalls[i]
        boundary.forEach((bound)=>{
            if(rectangularCollision({
                rect1:{...fireBall},
                rect2: {...bound, pos:{
                    x:bound.pos.x,
                    y:bound.pos.y
                }}
            })){
                bossFireBalls.splice(i,1)
            }
        })
    }
}

//PLAYER DAMAGE WITH ENVIRONMENT
function checkPlayerDamage(){
        
    for(let i=0;i<enemies.length;i++){
        const enemy=enemies[i]
        
        if (rectangularCollision({
            rect1:player,
            rect2: {...enemy, pos:{
                        x:enemy.pos.x,
                        y:enemy.pos.y+1
                    }}
        })){
            //TOUCHING GHOST
            enemies[i].pos.y-=25
            player.health.cur-=enemies[i].damage
            
            
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...enemy, pos:{
                        x:enemy.pos.x,
                        y:enemy.pos.y-1
                    }}
        })){
            //TOUCHING GHOST
            enemies[i].pos.y+=25
            player.health.cur-=enemies[i].damage
            
            
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...enemy, pos:{
                        x:enemy.pos.x+1,
                        y:enemy.pos.y
                    }}
        })){
            //TOUCHING GHOST
            enemies[i].pos.x-=25
            player.health.cur-=enemies[i].damage
            
            
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...enemy, pos:{
                        x:enemy.pos.x-1,
                        y:enemy.pos.y
                    }}
        })){
            //TOUCHING GHOST
            enemies[i].pos.x+=25
            player.health.cur-=enemies[i].damage
            
            
        }
    }
    if(player.health.cur<=0){
        //GAMEOVER
        cancelAnimationFrame(animationID)
        let HP=document.getElementById("healthBar")
        HP.style.opacity="0"
        div.style.opacity="1"
        div.innerText="YOU DIED \n \n \n <click> to try again"
        document.addEventListener('click', function(){
            location.reload()
        })
    }

    if (levelBool_1){
        for(let i=0; i<bossFireBalls.length; i++){
            bossHit=bossFireBalls[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossHit, pos:{
                            x:bossHit.pos.x,
                            y:bossHit.pos.y
                        }}
            })){
                
                bossFireBalls.splice(i,1)
                player.health.cur-=bossHit.damage
                
                
            }
        }
        if(warlock.health.cur<=0){
            bossFireBalls=[]
            background.img=level1Map2
        }
    }
    if (levelBool_3){
        for(let i=0; i<bossL3FireBall.length; i++){
            bossHit=bossL3FireBall[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossHit, pos:{
                            x:bossHit.pos.x,
                            y:bossHit.pos.y
                        }}
            })){
                
                bossL3FireBall.splice(i,1)
                player.health.cur-=bossHit.damage
                
                
            }
        } 
    }
    if (levelBool_4){
        for(let i=0; i<bossL4FireBall.length; i++){
            bossHit=bossL4FireBall[i]
            if (rectangularCollision({
                rect1:player,
                rect2: {...bossHit, pos:{
                            x:bossHit.pos.x,
                            y:bossHit.pos.y
                        }}
            })){
                
                bossL4FireBall.splice(i,1)
                player.health.cur-=bossHit.damage
                
                
            }
        } 
    }
    if (levelBool_5){
        function level5DamageFunc(bossArrayFire){
            for(let i=0; i<bossArrayFire.length; i++){
                bossHit=bossArrayFire[i]
                if (rectangularCollision({
                    rect1:player,
                    rect2: {...bossHit, pos:{
                                x:bossHit.pos.x,
                                y:bossHit.pos.y
                            }}
                })){
                    
                    bossArrayFire.splice(i,1)
                    player.health.cur-=bossHit.damage
                    
                    
                }
            } 
            for(let i=0; i<bossArrayFire.length; i++){
                for(let j=0; j<boundary.length; j++){
                    bossHit=bossArrayFire[i]
                    bound=boundary[j]
                    if (rectangularCollision({
                        rect1:{...bound},
                        rect2: {...bossHit, pos:{
                                    x:bossHit.pos.x,
                                    y:bossHit.pos.y
                                }}
                    })){
                        
                        bossArrayFire.splice(i,1)
                    }
                }
                
            } 
        }
        level5DamageFunc(bossL5FireBallL1)
        level5DamageFunc(bossL5FireBallL3)
        level5DamageFunc(bossL5FireBallL4)
        
    }
    //HEALTH BAR
    let tempHP=(player.health.cur/player.health.max)*100
    playerHP.style.width=tempHP+"%"
}
//DRAW GAME ELEMENTS

function drawGame(){
    background.draw()
    boundary.forEach(bound=>{
        bound.draw()
        
    })
    spawnAreaArr.forEach(bound=>{
        bound.draw()
        
    })
    startBoundary.forEach(bound=>{
        bound.draw()
        
    })
    enemies.forEach(enemy=>{               
        enemy.draw();
    })
    
    fireBallsArr.forEach(fireBall=>{
        fireBall.draw()
    })
    if (levelBool_1){
        if (warlock.health.cur>0){
            warlock.draw()
            bossFireBalls.forEach(fireBall=>{
                fireBall.draw()
            })
        }
    }
    if(levelBool_2){
        bossAreaArr.forEach(bound=>{
            bound.draw()
        })
        bossAttackArr.forEach(bound=>{
            bound.draw()
        })
        if (bossL2Boss.health.cur>0){
            bossL2Boss.draw() 
        }else{
            //OPEN GATE
            background.img=level2Map2
        }
    }
    if(levelBool_3){
        enemiesL3Func()
        if (bossL3Boss.health.cur>0){
            bossL3Boss.draw() 
            bossL3FireBall.forEach(fireBall=>{
                fireBall.draw()
            })
        }else{
            //OPEN GATE
            bossL3FireBall=[]
            background.img=level3Map2
        }
    }
    if(levelBool_4){
        enemiesL4Func()
        if (bossL4Boss.health.cur>0){
            bossL4Boss.draw() 
            bossL4FireBall.forEach(fireBall=>{
                fireBall.draw()
            })
        }else{
            //OPEN GATE
            bossL4FireBall=[]
            background.img=level4Map2
        }
    }
    if(levelBool_5){
        enemiesL5Func()
        if (bossL5BossL4.health.cur>0){
            bossL5BossL4.draw() 
            bossL5FireBallL4.forEach(fireBall=>{
                fireBall.draw()
            })
        }else{
            bossL5FireBallL4=[]
        }
        if (bossL5BossL3.health.cur>0){
            bossL5BossL3.draw() 
            bossL5FireBallL3.forEach(fireBall=>{
                fireBall.draw()
            })
        }else{
            bossL5FireBallL3=[]
        }
        if (bossL5BossL2.health.cur>0){
            bossL5BossL2.draw() 
        }
        if (bossL5BossL1.health.cur>0){
            bossL5BossL1.draw() 
            bossL5FireBallL1.forEach(fireBall=>{
                fireBall.draw()
            })
        }else{
            bossL5FireBallL1=[]
        }
        if(bossL5BossL1.health.cur<=0&&bossL5BossL2.health.cur<=0&&bossL5BossL3.health.cur<=0&&bossL5BossL4.health.cur<=0){
            background.img=level5Map2

        }
    }
    
    player.draw()
}

function initGame(){
    [windowX, windowY]=windowOffset()
    offset={
        x:-2565+windowX,
        y:-3500+windowY
    }
    background.pos.x=offset.x
    background.pos.y=offset.y
    initLevel1()
    
    
    animate1()
    
}


