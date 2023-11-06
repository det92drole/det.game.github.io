//KEYDOWN LISTENERS
const keys={
    w:{
        press:false
    },
    a:{
        press:false
    },
    s:{
        press:false
    },
    d:{
        press:false
    },
    space:{
        press:false
    },
    one:{
        press:false
    },
    two:{
        press:false
    },
    three:{
        press:false
    },
    four:{
        press:false
    },
    five:{
        press:false
    }
}

let lastKey=''
window.addEventListener('keydown', function(e){
    switch (e.key){
        case 'w':
            keys.w.press=true
            lastKey='w'
            break;
        case 'a':
            keys.a.press=true
            lastKey='a'
            break;
        case 's':
            keys.s.press=true
            lastKey='s'
            break;
        case 'd':
            keys.d.press=true
            lastKey='d'
            break;  
        case ' ':
            keys.space.press=true
            break;  
    }
})

window.addEventListener('keyup', function(e){
    switch (e.key){
        case 'w':
            keys.w.press=false
            break;
        case 'a':
            keys.a.press=false
            break;
        case 's':
            keys.s.press=false
            break;
        case 'd':
            keys.d.press=false
            break; 
        case ' ':
            keys.space.press=false
            break;     
    }
})

//EQUIPED SPELL LISTENERS
const divSpells=document.getElementById('items')
const subDiv=divSpells.getElementsByTagName('div')

window.addEventListener('keyup', function(e){
    switch (e.key){
        case '1':
            keys.one.press=true
            keys.two.press=false
            keys.three.press=false
            keys.four.press=false
            keys.five.press=false
            for (i=0;i<subDiv.length;i++){
                subDiv[i].style.borderColor='black'
            }
            divSpell=document.getElementById('one')
            divSpell.style.borderColor='red'
            break;
        case '2':
            keys.one.press=false
            keys.two.press=true
            keys.three.press=false
            keys.four.press=false
            keys.five.press=false
            for (i=0;i<subDiv.length;i++){
                subDiv[i].style.borderColor='black'
            }
            divSpell=document.getElementById('two')
            divSpell.style.borderColor='red'
            break;
        case '3':
            keys.one.press=false
            keys.two.press=false
            keys.three.press=true
            keys.four.press=false
            keys.five.press=false
            for (i=0;i<subDiv.length;i++){
                subDiv[i].style.borderColor='black'
            }
            divSpell=document.getElementById('three')
            divSpell.style.borderColor='red'
            break;
        case '4':
            keys.one.press=false
            keys.two.press=false
            keys.three.press=false
            keys.four.press=true
            keys.five.press=false
            for (i=0;i<subDiv.length;i++){
                subDiv[i].style.borderColor='black'
            }
            divSpell=document.getElementById('four')
            divSpell.style.borderColor='red'
            break; 
        case '5':
            keys.one.press=false
            keys.two.press=false
            keys.three.press=false
            keys.four.press=false
            keys.five.press=true
            for (i=0;i<subDiv.length;i++){
                subDiv[i].style.borderColor='black'
            }
            divSpell=document.getElementById('five')
            divSpell.style.borderColor='red'
            break;     
    }
})