const level3Map=new Image()
level3Map.src="./img/LEVEL_3_MAP_1.png"

const level3Map2=new Image()
level3Map2.src="./img/LEVEL_3_MAP_2.png"



//clear global boundary and spawn arrays, fill arrays with level2 values
function initLevel3(){
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

    background.img=level3Map
    offset.x=-2300+windowX
    offset.y=-4800+windowY
    background.pos.x=offset.x
    background.pos.y=offset.y

    
    for(let i=0; i<collision3.length;i+=100){
        collisionMap.push(collision3.slice(i,i+100));
    }
    
    collisionMap.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===3909){
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

    for(let i=0; i<exit3.length;i+=100){
        exitLevel.push(exit3.slice(i,i+100));
    }
    
    exitLevel.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===3909){
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
 
    for(let i=0; i<enemySpawnL3.length;i+=100){
        spawnCollision.push(enemySpawnL3.slice(i,i+100));
    }

    spawnCollision.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===3909){
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

    for(let i=0; i<bossSpawnL3.length;i+=100){
        bossCollision.push(bossSpawnL3.slice(i,i+100));
    }

    bossCollision.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===3909){
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

    for(let i=0; i<bossArea3.length;i+=100){
        bossAttackArea.push(bossArea3.slice(i,i+100));
    }

    bossAttackArea.forEach((row, i)=>{
        row.forEach((symbol, j)=>{
            if (symbol===3909){
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
    enemySpawnL3Func()
    movables=[bossL3Boss, ...bossAreaArr, ...bossAttackArr,
        background, ...boundary, ...spawnAreaArr,
        ...startBoundary, ...exitLevelBound]
}

function enemySpawnL3Func(){
    spawnAreaArr.forEach(area=>{
        let rand0 = Math.floor(Math.random() * 3) - 1; // Random value between -1, 0, 1
        let rand1;
    
        if (rand0 === 0) {
            rand1=Math.floor(Math.random() * 0.5) <0.5? 1:-1
        }else{
            rand1=0
        }
    
        for (let i=0;i<1;i++){
            const brainMon=new Image();
            brainMon.src="./img/brainMonster.png"
            enemies.push(new Sprite({
                pos:{
                    x: area.pos.x,
                    y: area.pos.y
                },
                frames:{max:8},
                img:brainMon,
                stepCount:0,
                health:{max:10, cur:10},
                vec:{x:rand1, y:rand0},
                damage:10
            }))
            enemies[enemies.length-1].idle=true
        }
    })

    //BOSS L3 CREATION
    const bossL3Image=new Image();
    bossL3Image.src="./img/reaperBoss.png"
    bossL3Boss=new Sprite({
        pos:{
            x: bossAreaArr[0].pos.x,
            y: bossAreaArr[0].pos.y
        },
        img:bossL3Image,
        frames:{
            max:8
        },
        health:{max:100, cur:100},
        damage:5
        
    })
    bossL3Boss.idle=true
    

}
function enemiesL3Func(){
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

let blastCountL3=0
let bossCooldownL3=0
let bossL3FireBall=[]
let ranLocCounter=0
function bossL3Func(target){
    ranLocBossL3()
    xT=target.pos.x
    yT=target.pos.y
    // REWORK: dist=Math.hypot(warlock.pos.x-(player.pos.x+(player.width/2)), warlock.pos.y-(player.pos.y+(player.height/2)))
    vecx= xT-bossL3Boss.pos.x
    vecy= yT-bossL3Boss.pos.y
    //console.log("VECTORS", vecx, vecy)
    
    const [vecxR, vecyR] = reduceToRange(vecx, vecy);
    if(blastCountL3>=10){
        bossCooldownL3=130
        blastCountL3=0
    }else if (bossCooldownL3<=0){
        bossCooldownL3=20
        const black_fire=new Image()
        black_fire.src='./img/black_fire.png'
        bossL3FireBall.push(new Sprite({
            pos:{
                x: bossL3Boss.pos.x,
                y: bossL3Boss.pos.y
            },
            img:black_fire,
            frames:{
                max:4
            },
            damage:5
        }))
        bossL3FireBall[bossL3FireBall.length-1].moving=true
        bossL3FireBall[bossL3FireBall.length-1].vec.x=vecxR
        bossL3FireBall[bossL3FireBall.length-1].vec.y=vecyR
        blastCountL3+=1
    }
    bossCooldownL3-=1
}

function ranLocBossL3(){
    if (ranLocCounter<=0){
        ranLocCounter=310
        randLocTemp=Math.floor(Math.random()*bossAreaArr.length)
        bossL3Boss.pos.x=bossAreaArr[randLocTemp].pos.x
        bossL3Boss.pos.y=bossAreaArr[randLocTemp].pos.y
    }
    ranLocCounter-=1
}