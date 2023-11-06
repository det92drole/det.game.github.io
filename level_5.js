const level5Map=new Image()
level5Map.src="./img/LEVEL_5_MAP_1.png"

const level5Map2=new Image()
level5Map2.src="./img/LEVEL_5_MAP_2.png"

let reaperSpawnArr=[]
let tempReaper=[]
let warlockSpawnArr=[]
let tempWarlock=[]

//clear global boundary and spawn arrays, fill arrays with level2 values
function initLevel5(){
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

    background.img=level5Map
    offset.x=-2525+windowX
    offset.y=-4700+windowY
    background.pos.x=offset.x
    background.pos.y=offset.y

    player.health.max=20
    player.health.cur=20

    
    for(let i=0; i<reaperSpawn.length;i+=100){
        tempReaper.push(reaperSpawn.slice(i,i+100));
    }
    
    tempReaper.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===2753){
                reaperSpawnArr.push(
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

    for(let i=0; i<warlockSpawn.length;i+=100){
        tempWarlock.push(warlockSpawn.slice(i,i+100));
    }
    
    tempWarlock.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===2753){
                warlockSpawnArr.push(
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
    
    for(let i=0; i<collision5.length;i+=100){
        collisionMap.push(collision5.slice(i,i+100));
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

    for(let i=0; i<exit5.length;i+=100){
        exitLevel.push(exit5.slice(i,i+100));
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
 
    for(let i=0; i<enemySpawnL5.length;i+=100){
        spawnCollision.push(enemySpawnL5.slice(i,i+100));
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

    for(let i=0; i<bossSpawnL5.length;i+=100){
        bossCollision.push(bossSpawnL5.slice(i,i+100));
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

    for(let i=0; i<bossArea5.length;i+=100){
        bossAttackArea.push(bossArea5.slice(i,i+100));
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
    enemySpawnL5Func()
    movables=[bossL5BossL4, bossL5BossL3, bossL5BossL2, bossL5BossL1, ...bossAreaArr, ...bossAttackArr,
        background, ...boundary, ...spawnAreaArr,
        ...startBoundary, ...exitLevelBound]
}

function enemySpawnL5Func(){
    spawnAreaArr.forEach(area=>{
        let rand0 = Math.floor(Math.random() * 3) - 1; // Random value between -1, 0, 1
        let rand1;
    
        if (rand0 === 0) {
            rand1=Math.floor(Math.random() * 0.5) <0.5? 1:-1
        }else{
            rand1=0
        }
        
        randL5=Math.floor(Math.random()*3)
        if (randL5==0){
            for (let i=0;i<1;i++){
                const brainMonL5=new Image();
                brainMonL5.src="./img/brainMonster.png"
                enemies.push(new Sprite({
                    pos:{
                        x: area.pos.x,
                        y: area.pos.y
                    },
                    frames:{max:8},
                    img:brainMonL5,
                    stepCount:0,
                    health:{max:10, cur:10},
                    vec:{x:rand1, y:rand0},
                    damage:10
                }))
                enemies[enemies.length-1].idle=true
            }
        }
        if(randL5==1){
            for (let i=0;i<1;i++){
                const tuskManL5=new Image();
                tuskManL5.src="./img/tusk_man.png"
                enemies.push(new Sprite({
                    pos:{
                        x: area.pos.x,
                        y: area.pos.y
                    },
                    frames:{max:8},
                    img:tuskManL5,
                    stepCount:0,
                    health:{max:10, cur:10},
                    vec:{x:rand1, y:rand0},
                    damage:10
                }))
                enemies[enemies.length-1].idle=true
            }
        }
        if(randL5==2){
            for (let i=0;i<1;i++){
                const redMonL5=new Image();
                redMonL5.src="./img/redmonster_8frames.png"
                enemies.push(new Sprite({
                    pos:{
                        x: area.pos.x,
                        y: area.pos.y
                    },
                    frames:{max:8},
                    img:redMonL5,
                    stepCount:0,
                    health:{max:10, cur:10},
                    vec:{x:rand1, y:rand0},
                    damage:10
                }))
                enemies[enemies.length-1].idle=true
            }
        }
        
    })

    //BOSS L5 CREATION
    const bossL5L1=new Image();
    bossL5L1.src="./img/warlock.png"

    const bossL5L2=new Image();
    bossL5L2.src="./img/bossL2_10frames.png"

    const bossL5L3=new Image();
    bossL5L3.src="./img/reaperboss.png"

    const bossL5L4=new Image();
    bossL5L4.src="./img/chimera.png"


    bossL5BossL1=new Sprite({
        pos:{
            x: warlockSpawnArr[0].pos.x,
            y: warlockSpawnArr[0].pos.y
        },
        img:bossL5L1,
        frames:{
            max:9
        },
        health:{max:100, cur:100},
        damage:5
        
    })
    bossL5BossL1.idle=true

    bossL5BossL2=new Sprite({
        pos:{
            x: bossAreaArr[0].pos.x,
            y: bossAreaArr[0].pos.y
        },
        img:bossL5L2,
        frames:{
            max:10
        },
        health:{max:100, cur:100},
        damage:5
        
    })
    bossL5BossL2.idle=true

    bossL5BossL3=new Sprite({
        pos:{
            x: reaperSpawnArr[0].pos.x,
            y: reaperSpawnArr[0].pos.y
        },
        img:bossL5L3,
        frames:{
            max:8
        },
        health:{max:100, cur:100},
        damage:5
        
    })
    bossL5BossL3.idle=true

    bossL5BossL4=new Sprite({
        pos:{
            x: bossAreaArr[1].pos.x,
            y: bossAreaArr[1].pos.y
        },
        img:bossL5L4,
        frames:{
            max:8
        },
        health:{max:100, cur:100},
        damage:5
        
    })
    bossL5BossL4.idle=true
    

}
function enemiesL5Func(){
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

//BOSSL1 ATTACK FUNCTION

let bossL5FireBallL1=[]
let bossCooldownL5L1=0
let blastCountL5L1=0

function bossL5L1Func(target){
    console.log("TEST")
    xT=target.pos.x
    yT=target.pos.y
    // REWORK: dist=Math.hypot(warlock.pos.x-(player.pos.x+(player.width/2)), warlock.pos.y-(player.pos.y+(player.height/2)))
    vecx= xT-bossL5BossL1.pos.x
    vecy= yT-bossL5BossL1.pos.y
    //console.log("VECTORS", vecx, vecy)
    
    const [vecxR, vecyR] = reduceToRange(vecx, vecy);
    if(blastCountL5L1>=8){
        bossCooldownL5L1=130
        blastCountL5L1=0
    }else if (bossCooldownL5L1<=0){
        bossCooldownL5L1=20
        const blue_fire=new Image()
        blue_fire.src='./img/blue_fire.png'
        bossL5FireBallL1.push(new Sprite({
            pos:{
                x: bossL5BossL1.pos.x,
                y: bossL5BossL1.pos.y
            },
            img:blue_fire,
            frames:{
                max:1
            },
            damage:5
        }))
        bossL5FireBallL1[bossL5FireBallL1.length-1].moving=true
        bossL5FireBallL1[bossL5FireBallL1.length-1].vec.x=vecxR
        bossL5FireBallL1[bossL5FireBallL1.length-1].vec.y=vecyR
        blastCountL5L1+=1
    }
    bossCooldownL5L1-=1
}

//BOSS L2 FUNC
function bossL5L2Func(target){
    //find vec x&y relative to player
    xT=target.pos.x
    yT=target.pos.y
    // REWORK: dist=Math.hypot(warlock.pos.x-(player.pos.x+(player.width/2)), warlock.pos.y-(player.pos.y+(player.height/2)))
    vecx= xT-bossL5BossL2.pos.x
    vecy= yT-bossL5BossL2.pos.y
    //console.log("VECTORS", vecx, vecy)
    const [vecxR, vecyR] = reduceToRange(vecx, vecy);
    bossL5BossL2.moving=true
    bossL5BossL2.vec.x=vecxR
    bossL5BossL2.vec.y=vecyR
}

function bossL5L2Hit(player){
    let valP=100
    if(bossL5BossL2.health.cur>0){
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL5BossL2, pos:{
                x:bossL5BossL2.pos.x,
                y:bossL5BossL2.pos.y+3
            }}
        })){
            
            console.log('BOSS TOUCHING PLAYER from bottom')
            player.health.cur-=bossL5BossL2.damage
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
            rect2: {...bossL5BossL2, pos:{
                x:bossL5BossL2.pos.x,
                y:bossL5BossL2.pos.y-3
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from top')
            player.health.cur-=bossL5BossL2.damage
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
            rect2: {...bossL5BossL2, pos:{
                x:bossL5BossL2.pos.x+3,
                y:bossL5BossL2.pos.y
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from left')
            player.health.cur-=bossL5BossL2.damage
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
            rect2: {...bossL5BossL2, pos:{
                x:bossL5BossL2.pos.x-3,
                y:bossL5BossL2.pos.y
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from right')
            player.health.cur-=bossL5BossL2.damage
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
//BOSS L3 FUNC

let bossL5FireBallL3=[]
let blastCountL5L3=0
let bossCooldownL5L3=0
let ranLocCounterL5L3=0
function bossL5L3Func(target){
    ranLocBossL5L3()
    xT=target.pos.x
    yT=target.pos.y
    // REWORK: dist=Math.hypot(warlock.pos.x-(player.pos.x+(player.width/2)), warlock.pos.y-(player.pos.y+(player.height/2)))
    vecx= xT-bossL5BossL3.pos.x
    vecy= yT-bossL5BossL3.pos.y
    //console.log("VECTORS", vecx, vecy)
    
    const [vecxR, vecyR] = reduceToRange(vecx, vecy);
    if(blastCountL5L3>=10){
        bossCooldownL5L3=200
        blastCountL5L3=0
    }else if (bossCooldownL5L3<=0){
        bossCooldownL5L3=20
        const black_fire=new Image()
        black_fire.src='./img/black_fire.png'
        bossL5FireBallL3.push(new Sprite({
            pos:{
                x: bossL5BossL3.pos.x,
                y: bossL5BossL3.pos.y
            },
            img:black_fire,
            frames:{
                max:4
            },
            damage:5
        }))
        bossL5FireBallL3[bossL5FireBallL3.length-1].moving=true
        bossL5FireBallL3[bossL5FireBallL3.length-1].vec.x=vecxR
        bossL5FireBallL3[bossL5FireBallL3.length-1].vec.y=vecyR
        blastCountL5L3+=1
    }
    bossCooldownL5L3-=1
}

function ranLocBossL5L3(){
    if (ranLocCounterL5L3<=0){
        ranLocCounterL5L3=310
        randLocTemp=Math.floor(Math.random()*bossAreaArr.length)
        bossL5BossL3.pos.x=bossAreaArr[randLocTemp].pos.x
        bossL5BossL3.pos.y=bossAreaArr[randLocTemp].pos.y
    }
    ranLocCounterL5L3-=1
}

//BOSS L4 FUNC

let blastCountL5L4=0
let bossCooldownL5L4=0
let bossL5FireBallL4=[]

function bossL5L4Func(target){
    xT=target.pos.x
    yT=target.pos.y
    // REWORK: dist=Math.hypot(warlock.pos.x-(player.pos.x+(player.width/2)), warlock.pos.y-(player.pos.y+(player.height/2)))
    vecx= xT-bossL5BossL4.pos.x
    vecy= yT-bossL5BossL4.pos.y
    //console.log("VECTORS", vecx, vecy)
    
    const [vecxR, vecyR] = reduceToRange(vecx, vecy);
    bossL5BossL4.moving=true
    bossL5BossL4.vec.x=vecxR
    bossL5BossL4.vec.y=vecyR

    if(blastCountL5L4>=4){
        bossCooldownL5L4=130
        blastCountL5L4=0
    }else if (bossCooldownL5L4<=0){
        bossCooldownL5L4=20
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
            bossL5FireBallL4.push(new Sprite({
                pos:{
                    x: bossL5BossL4.pos.x,
                    y: bossL5BossL4.pos.y
                },
                img:ice_fire,
                frames:{
                    max:4
                },
                damage:5
            }))
        }
        if(randFireNum==1){
            bossL5FireBallL4.push(new Sprite({
                pos:{
                    x: bossL5BossL4.pos.x,
                    y: bossL5BossL4.pos.y
                },
                img:flesh_fire,
                frames:{
                    max:4
                },
                damage:5
            }))
        }
        if(randFireNum==2){
            bossL5FireBallL4.push(new Sprite({
                pos:{
                    x: bossL5BossL4.pos.x,
                    y: bossL5BossL4.pos.y
                },
                img:water_fire,
                frames:{
                    max:4
                },
                damage:5
            }))
        }
        if(randFireNum==3){
            bossL5FireBallL4.push(new Sprite({
                pos:{
                    x: bossL5BossL4.pos.x,
                    y: bossL5BossL4.pos.y
                },
                img:iron_fire,
                frames:{
                    max:4
                },
                damage:5
            }))
        }

        
        bossL5FireBallL4[bossL5FireBallL4.length-1].moving=true
        bossL5FireBallL4[bossL5FireBallL4.length-1].vec.x=vecxR*1.5
        bossL5FireBallL4[bossL5FireBallL4.length-1].vec.y=vecyR*1.5
        blastCountL5L4+=1
    }
    bossCooldownL5L4-=1

    for (i=0;i<boundary.length;i++){
        for(j=0;j<bossL5FireBallL4.length;j++){
            if (rectangularCollision({
                rect1:boundary[i],
                rect2: bossL5FireBallL4[j]
            })){
                bossL5FireBallL4.splice(j,1)
            }
        }
    }
    
}

function bossL5L4Hit(player){
    let valP=100
    if(bossL5BossL4.health.cur>0){
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL5BossL4, pos:{
                x:bossL5BossL4.pos.x,
                y:bossL5BossL4.pos.y+3
            }}
        })){
            
            console.log('BOSS TOUCHING PLAYER from bottom')
            player.health.cur-=bossL5BossL4.damage
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
                        bossL5FireBallL4.forEach(elem=>{elem.pos.y+=1})
                        j=valP;
                        break
                    }
                }
            }
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL5BossL4, pos:{
                x:bossL5BossL4.pos.x,
                y:bossL5BossL4.pos.y-3
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from top')
            player.health.cur-=bossL5BossL4.damage
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
                        bossL5FireBallL4.forEach(elem=>{elem.pos.y-=1})
                        j=valP;
                        break
                    }
                }
            }
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL5BossL4, pos:{
                x:bossL5BossL4.pos.x+3,
                y:bossL5BossL4.pos.y
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from left')
            player.health.cur-=bossL5BossL4.damage
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
                        bossL5FireBallL4.forEach(elem=>{elem.pos.x+=1})
                        j=valP;
                        break
                    }
                }
            }
        }
        if (rectangularCollision({
            rect1:player,
            rect2: {...bossL5BossL4, pos:{
                x:bossL5BossL4.pos.x-3,
                y:bossL5BossL4.pos.y
            }}
        })){
            console.log('BOSS TOUCHING PLAYER from right')
            player.health.cur-=bossL5BossL4.damage
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
                        bossL5FireBallL4.forEach(elem=>{elem.pos.x-=1})
                        j=valP;
                        break
                    }
                }
            }
        }    
    }
    
}



//********************************************************
function testL5(){
    initLevel5()
    levelBool_1=false
    levelBool_5=true
    startGame=false
    // enemies=[]
    
    // bossL5BossL1.health.cur=0
    // bossL5BossL2.health.cur=0
    // bossL5BossL3.health.cur=0
    // bossL5BossL4.health.cur=0
}