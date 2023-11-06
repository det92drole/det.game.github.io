const level4Map=new Image()
level4Map.src="./img/LEVEL_4_MAP_1.png"

const level4Map2=new Image()
level4Map2.src="./img/LEVEL_4_MAP_2.png"



//clear global boundary and spawn arrays, fill arrays with level2 values
function initLevel4(){
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

    background.img=level4Map
    offset.x=-1850+windowX
    offset.y=-4700+windowY
    background.pos.x=offset.x
    background.pos.y=offset.y

    
    for(let i=0; i<collision4.length;i+=100){
        collisionMap.push(collision4.slice(i,i+100));
    }
    
    collisionMap.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===2753){
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

    for(let i=0; i<exit4.length;i+=100){
        exitLevel.push(exit4.slice(i,i+100));
    }
    
    exitLevel.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===2753){
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
 
    for(let i=0; i<enemySpawnL4.length;i+=100){
        spawnCollision.push(enemySpawnL4.slice(i,i+100));
    }

    spawnCollision.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===2753){
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

    for(let i=0; i<bossSpawnL4.length;i+=100){
        bossCollision.push(bossSpawnL4.slice(i,i+100));
    }

    bossCollision.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===2753){
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

    for(let i=0; i<bossArea4.length;i+=100){
        bossAttackArea.push(bossArea4.slice(i,i+100));
    }

    bossAttackArea.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===2753){
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
    enemySpawnL4Func()
    movables=[bossL4Boss, ...bossAreaArr, ...bossAttackArr,
        background, ...boundary, ...spawnAreaArr,
        ...startBoundary, ...exitLevelBound]
}

function enemySpawnL4Func(){
    spawnAreaArr.forEach(area=>{
        let rand0 = Math.floor(Math.random() * 3) - 1; // Random value between -1, 0, 1
        let rand1;
    
        if (rand0 === 0) {
            rand1=Math.floor(Math.random() * 0.5) <0.5? 1:-1
        }else{
            rand1=0
        }
    
        for (let i=0;i<1;i++){
            const tuskMan=new Image();
            tuskMan.src="./img/tusk_man.png"
            enemies.push(new Sprite({
                pos:{
                    x: area.pos.x,
                    y: area.pos.y
                },
                frames:{max:8},
                img:tuskMan,
                stepCount:0,
                health:{max:10, cur:10},
                vec:{x:rand1, y:rand0},
                damage:10
            }))
            enemies[enemies.length-1].idle=true
        }
    })

    //BOSS L4 CREATION
    const bossL4Image=new Image();
    bossL4Image.src="./img/chimera.png"
    bossL4Boss=new Sprite({
        pos:{
            x: bossAreaArr[0].pos.x,
            y: bossAreaArr[0].pos.y
        },
        img:bossL4Image,
        frames:{
            max:8
        },
        health:{max:100, cur:100},
        damage:5
        
    })
    bossL4Boss.idle=true
    

}
function enemiesL4Func(){
    for(i=0;i<enemies.length;i++){
        let dist=Math.hypot(enemies[i].pos.x-(player.pos.x+(player.width/2)), 
            enemies[i].pos.y-(player.pos.y+(player.height/2)))
        if (dist<300){
            xT=player.pos.x+(player.width/2)
            yT=player.pos.y+(player.height/2)
            vecx= xT-enemies[i].pos.x
            vecy= yT-enemies[i].pos.y
            //console.log("VECTORS", vecx, vecy)
            const [vecxR, vecyR] = reduceToRange(vecx, vecy);
            enemies[i].moving=true
            enemies[i].vec.x=vecxR
            enemies[i].vec.y=vecyR  
        }
    }

    
}

let blastCountL4=0
let bossCooldownL4=0
let bossL4FireBall=[]

function bossL4Func(target){
    xT=target.pos.x
    yT=target.pos.y
    // REWORK: dist=Math.hypot(warlock.pos.x-(player.pos.x+(player.width/2)), warlock.pos.y-(player.pos.y+(player.height/2)))
    vecx= xT-bossL4Boss.pos.x
    vecy= yT-bossL4Boss.pos.y
    //console.log("VECTORS", vecx, vecy)
    
    const [vecxR, vecyR] = reduceToRange(vecx, vecy);
    bossL4Boss.moving=true
    bossL4Boss.vec.x=vecxR
    bossL4Boss.vec.y=vecyR

    if(blastCountL4>=4){
        bossCooldownL4=130
        blastCountL4=0
    }else if (bossCooldownL4<=0){
        bossCooldownL4=20
        const ice_fire=new Image()
        ice_fire.src='./img/iceL4.png'
        const flesh_fire=new Image()
        flesh_fire.src='./img/felshL4.png'
        const iron_fire=new Image()
        iron_fire.src='./img/ironL4.png'
        const water_fire=new Image()
        water_fire.src='./img/waterL4.png'
        randFireNum=Math.floor(Math.random()*4)

        if(randFireNum==0){
            bossL4FireBall.push(new Sprite({
                pos:{
                    x: bossL4Boss.pos.x,
                    y: bossL4Boss.pos.y
                },
                img:ice_fire,
                frames:{
                    max:4
                },
                damage:5
            }))
        }
        if(randFireNum==1){
            bossL4FireBall.push(new Sprite({
                pos:{
                    x: bossL4Boss.pos.x,
                    y: bossL4Boss.pos.y
                },
                img:flesh_fire,
                frames:{
                    max:4
                },
                damage:5
            }))
        }
        if(randFireNum==2){
            bossL4FireBall.push(new Sprite({
                pos:{
                    x: bossL4Boss.pos.x,
                    y: bossL4Boss.pos.y
                },
                img:water_fire,
                frames:{
                    max:4
                },
                damage:5
            }))
        }
        if(randFireNum==3){
            bossL4FireBall.push(new Sprite({
                pos:{
                    x: bossL4Boss.pos.x,
                    y: bossL4Boss.pos.y
                },
                img:iron_fire,
                frames:{
                    max:4
                },
                damage:5
            }))
        }

        
        bossL4FireBall[bossL4FireBall.length-1].moving=true
        bossL4FireBall[bossL4FireBall.length-1].vec.x=vecxR*1.5
        bossL4FireBall[bossL4FireBall.length-1].vec.y=vecyR*1.5
        blastCountL4+=1
    }
    bossCooldownL4-=1

    for (i=0;i<boundary.length;i++){
        for(j=0;j<bossL4FireBall.length;j++){
            if (rectangularCollision({
                rect1:boundary[i],
                rect2: bossL4FireBall[j]
            })){
                bossL4FireBall.splice(j,1)
            }
        }
    }
    
}

function bossL4Hit(player){
    let valP=100
    if(bossL4Boss.health.cur>0){
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL4Boss, pos:{
                x:bossL4Boss.pos.x,
                y:bossL4Boss.pos.y+3
            }}
        })){
            
            console.log('BOSS TOUCHING PLAYER from bottom')
            player.health.cur-=bossL4Boss.damage
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
                        bossL4FireBall.forEach(elem=>{elem.pos.y+=1})
                        j=valP;
                        break
                    }
                }
            }
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL4Boss, pos:{
                x:bossL4Boss.pos.x,
                y:bossL4Boss.pos.y-3
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from top')
            player.health.cur-=bossL4Boss.damage
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
                        bossL4FireBall.forEach(elem=>{elem.pos.y-=1})
                        j=valP;
                        break
                    }
                }
            }
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL4Boss, pos:{
                x:bossL4Boss.pos.x+3,
                y:bossL4Boss.pos.y
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from left')
            player.health.cur-=bossL4Boss.damage
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
                        bossL4FireBall.forEach(elem=>{elem.pos.x+=1})
                        j=valP;
                        break
                    }
                }
            }
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL4Boss, pos:{
                x:bossL4Boss.pos.x-3,
                y:bossL4Boss.pos.y
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from right')
            player.health.cur-=bossL4Boss.damage
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
                        bossL4FireBall.forEach(elem=>{elem.pos.x-=1})
                        j=valP;
                        break
                    }
                }
            }
        }    
    }
    
}

function testL4(){
    initLevel4()
    levelBool_3=false
    levelBool_2=false
    levelBool_1=false
    levelBool_4=true
    startGame=false
}