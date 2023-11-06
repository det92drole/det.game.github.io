const level2Map=new Image()
level2Map.src="./img/LEVEL_2_MAP.png"

const level2Map2=new Image()
level2Map2.src="./img/LEVEL_2_MAP_2.png"



//clear global boundary and spawn arrays, fill arrays with level2 values
function initLevel2(){
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


    background.img=level2Map
    offset.x=-4875+windowX
    offset.y=-5100+windowY
    background.pos.x=offset.x
    background.pos.y=offset.y

    
    for(let i=0; i<collision2.length;i+=100){
        collisionMap.push(collision2.slice(i,i+100));
    }
    
    collisionMap.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===1409){
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

    for(let i=0; i<exit2.length;i+=100){
        exitLevel.push(exit2.slice(i,i+100));
    }
    
    exitLevel.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===1409){
                exitLevelBound.push(
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
 
    for(let i=0; i<enemySpawnL2.length;i+=100){
        spawnCollision.push(enemySpawnL2.slice(i,i+100));
    }

    spawnCollision.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===1409){
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

    for(let i=0; i<bossSpawnL2.length;i+=100){
        bossCollision.push(bossSpawnL2.slice(i,i+100));
    }

    bossCollision.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===1409){
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

    for(let i=0; i<bossArea2.length;i+=100){
        bossAttackArea.push(bossArea2.slice(i,i+100));
    }

    bossAttackArea.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===1409){
                bossAttackArr.push(
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
    enemySpawnL2Func()
    movables=[bossL2Boss, ...bossAreaArr, ...bossAttackArr,
        background, ...boundary, ...spawnAreaArr,
        ...startBoundary, ...exitLevelBound]
}

function enemySpawnL2Func(){
    spawnAreaArr.forEach(area=>{
        let rand0 = Math.floor(Math.random() * 3) - 1; // Random value between -1, 0, 1
        let rand1;
    
        if (rand0 === 0) {
            rand1=Math.floor(Math.random() * 0.5) <0.5? 1:-1
        }else{
            rand1=0
        }
    
        for (let i=0;i<1;i++){
            const redMon=new Image();
            redMon.src="./img/redmonster_8frames.png"
            
            enemies.push(new Sprite({
                pos:{
                    x: area.pos.x,
                    y: area.pos.y
                },
                frames:{max:8},
                img:redMon,
                stepCount:0,
                health:{max:10, cur:10},
                vec:{x:rand1, y:rand0},
                damage:10
            }))
            enemies[enemies.length-1].idle=true
        }
    })
    //BOSS L2 CREATION
    const bossL2Image=new Image();
    bossL2Image.src="./img/bossL2_10frames.png"

    bossL2Boss=new Sprite({
        pos:{
            x: bossAreaArr[0].pos.x,
            y: bossAreaArr[0].pos.y
        },
        img:bossL2Image,
        frames:{
            max:10
        },
        health:{max:100, cur:100},
        damage:5
        
    })
    bossL2Boss.idle=true
}

function bossL2Func(target){
    //find vec x&y relative to player
    xT=target.pos.x
    yT=target.pos.y
    // REWORK: dist=Math.hypot(warlock.pos.x-(player.pos.x+(player.width/2)), warlock.pos.y-(player.pos.y+(player.height/2)))
    vecx= xT-bossL2Boss.pos.x
    vecy= yT-bossL2Boss.pos.y
    //console.log("VECTORS", vecx, vecy)
    const [vecxR, vecyR] = reduceToRange(vecx, vecy);
    bossL2Boss.moving=true
    bossL2Boss.vec.x=vecxR
    bossL2Boss.vec.y=vecyR
}

function bossL2Hit(player){
    let valP=100
    if(bossL2Boss.health.cur>0){
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL2Boss, pos:{
                x:bossL2Boss.pos.x,
                y:bossL2Boss.pos.y+3
            }}
        })){
            
            console.log('BOSS TOUCHING PLAYER from bottom')
            player.health.cur-=bossL2Boss.damage
            for (j=0;j<valP;j++){
                movables.forEach(movable=>{movable.pos.y-=1})
                enemies.forEach(enemy=>{enemy.pos.y-=1})
                fireBallsArr.forEach(fireBall=>{fireBall.pos.y-=1})
                for(let i=0;i<boundary.length;i++){
                    const bound=boundary[i]
                    if (rectangularCollision({
                        rect1:player,
                        rect2: {...bound, pos:{
                            x:bound.pos.x,
                            y:bound.pos.y
                        }}
                    })){
                        //console.log('HIT')
                        movables.forEach(movable=>{movable.pos.y+=1})
                        enemies.forEach(enemy=>{enemy.pos.y+=1})
                        fireBallsArr.forEach(fireBall=>{fireBall.pos.y+=1})
                        j=valP;
                        break
                    }
                }
            }
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL2Boss, pos:{
                x:bossL2Boss.pos.x,
                y:bossL2Boss.pos.y-3
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from top')
            player.health.cur-=bossL2Boss.damage
            for (j=0;j<valP;j++){
                movables.forEach(movable=>{movable.pos.y+=1})
                enemies.forEach(enemy=>{enemy.pos.y+=1})
                fireBallsArr.forEach(fireBall=>{fireBall.pos.y+=1})
                for(let i=0;i<boundary.length;i++){
                    const bound=boundary[i]
                    if (rectangularCollision({
                        rect1:player,
                        rect2: {...bound, pos:{
                            x:bound.pos.x,
                            y:bound.pos.y
                        }}
                    })){
                        //console.log('HIT')
                        movables.forEach(movable=>{movable.pos.y-=1})
                        enemies.forEach(enemy=>{enemy.pos.y-=1})
                        fireBallsArr.forEach(fireBall=>{fireBall.pos.y-=1})
                        j=valP;
                        break
                    }
                }
            }
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL2Boss, pos:{
                x:bossL2Boss.pos.x+3,
                y:bossL2Boss.pos.y
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from left')
            player.health.cur-=bossL2Boss.damage
            for (j=0;j<valP;j++){
                movables.forEach(movable=>{movable.pos.x-=1})
                enemies.forEach(enemy=>{enemy.pos.x-=1})
                fireBallsArr.forEach(fireBall=>{fireBall.pos.x-=1})
                for(let i=0;i<boundary.length;i++){
                    const bound=boundary[i]
                    if (rectangularCollision({
                        rect1:player,
                        rect2: {...bound, pos:{
                            x:bound.pos.x,
                            y:bound.pos.y
                        }}
                    })){
                        //console.log('HIT')
                        movables.forEach(movable=>{movable.pos.x+=1})
                        enemies.forEach(enemy=>{enemy.pos.x+=1})
                        fireBallsArr.forEach(fireBall=>{fireBall.pos.x+=1})
                        j=valP;
                        break
                    }
                }
            }
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL2Boss, pos:{
                x:bossL2Boss.pos.x-3,
                y:bossL2Boss.pos.y
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from right')
            player.health.cur-=bossL2Boss.damage
            for (j=0;j<valP;j++){
                movables.forEach(movable=>{movable.pos.x+=1})
                enemies.forEach(enemy=>{enemy.pos.x+=1})
                fireBallsArr.forEach(fireBall=>{fireBall.pos.x+=1})
                for(let i=0;i<boundary.length;i++){
                    const bound=boundary[i]
                    if (rectangularCollision({
                        rect1:player,
                        rect2: {...bound, pos:{
                            x:bound.pos.x,
                            y:bound.pos.y
                        }}
                    })){
                        //console.log('HIT')
                        movables.forEach(movable=>{movable.pos.x-=1})
                        enemies.forEach(enemy=>{enemy.pos.x-=1})
                        fireBallsArr.forEach(fireBall=>{fireBall.pos.x-=1})
                        j=valP;
                        break
                    }
                }
            }
        }    
    }
    
}
