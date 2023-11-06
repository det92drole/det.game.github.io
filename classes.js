
// boundaries class

class Boundary{
    constructor({pos, color}){
        this.pos=pos;
        this.width=64;
        this.height=64;
        this.color=color
    }

    draw(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height)
    }
}

// sprite class: player and background map

class Sprite{
    constructor({
        pos,
        img,
        frames={max:1},
        sprites,
        vec={x:0, y:0},
        stepCount,
        health={max:0, cur:0},
        damage=0

    }){
        this.damage=damage
        this.health={...health}
        this.stepCount=stepCount
        this.pos=pos
        this.img=img
        this.vec={...vec}
        this.frames={...frames, val:0, elapsed:0}
        this.img.onload=()=>{
            this.width=this.img.width/this.frames.max
            this.height=this.img.height
        }
        this.moving=false
        this.sprites=sprites
        this.idle=false
        
        
    }

    draw(){
        ctx.drawImage(
            this.img, 
            this.frames.val*this.width,
            0,
            this.img.width/this.frames.max,
            this.img.height,
            this.pos.x,
            this.pos.y,
            this.img.width/this.frames.max,
            this.img.height
        )
        if(this.moving){
            this.pos.x=this.pos.x+this.vec.x
            this.pos.y=this.pos.y+this.vec.y
            if(this.frames.max>1){
                this.frames.elapsed++
            }
            if(this.frames.elapsed%10===0){
                if(this.frames.val<this.frames.max-1){
                    this.frames.val++
                }else{
                    this.frames.val=0
                }
            }
        }
        if(this.idle){
            if(this.frames.max>1){
                this.frames.elapsed++
            }
            if(this.frames.elapsed%10===0){
                if(this.frames.val<this.frames.max-1){
                    this.frames.val++
                }else{
                    this.frames.val=0
                }
            }
        }
    }
}