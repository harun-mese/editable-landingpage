let frame = document.querySelector('iframe')
var frameContent = frame.contentDocument || frame.contentWindow.document;

var allElements = frameContent.querySelectorAll('.editable')
const fontsContainer = document.querySelector('.fontsContainer')
const fontColorContainer = document.querySelector('.fontColorContainer')
const fontBackgroundColorContainer = document.querySelector('.fontBackgroundColorContainer')


let mobileBtn = document.getElementById("mobileBtn")
let mobileSelect = document.getElementById("mobileSelect")
let laptopBtn = document.getElementById("laptopBtn")
let laptopSelect = document.getElementById("laptopSelect")
let desktopBtn = document.getElementById("desktopBtn")
let desktopSelect = document.getElementById("desktopSelect")

let mobileSelectStatus = true
let laptopSelectStatus = true
let DesktopSelectStatus = true


const sizeBtns = [mobileBtn,laptopBtn,desktopBtn]
const sizeBtnsSelects = [mobileSelect,laptopSelect,desktopSelect]

sizeBtns.forEach((item,index)=>{
    item.addEventListener("click",()=>{
        if(mobileSelectStatus){
            sizeBtnsSelects.forEach(item=>{
                item.style.display="none"
            })
            sizeBtnsSelects[index].style.display="flex"

            mobileSelectStatus = false
        }else{
            mobileSelect.style.display="none"
            mobileSelectStatus = true
        }
    })
})



mobileBtn.addEventListener("click",()=>{
    if(mobileSelectStatus){
        mobileSelect.style.display="flex"
        mobileSelectStatus = false
    }else{
        mobileSelect.style.display="none"
        mobileSelectStatus = true
    }
})
laptopBtn.addEventListener("click",()=>{
    if(laptopSelectStatus){
        laptopSelect.style.display="flex"
        laptopSelectStatus = false
    }else{
        laptopSelect.style.display="none"
        laptopSelectStatus = true
    }
    
})
desktopBtn.addEventListener("click",()=>{
    if(DesktopSelectStatus){
        desktopSelect.style.display="flex"
        DesktopSelectStatus = false
    }else{
        desktopSelect.style.display="none"
        DesktopSelectStatus = true
    }
})








function command(aCommandName, aShowDefaultUI='', aValueArgument=''){
   frameContent.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
}


console.log(allElements);

allElements.forEach(el=>el.setAttribute('contenteditable','true'))

var images = frameContent.querySelectorAll('img')

images.forEach(img=>{
    img.addEventListener('click',(e)=>{
    e.target.getAttribute('src')
    var newUri = prompt("Yeni resim uri",e.target.getAttribute('src'))
    if (newUri != null && newUri != '' ) {
        e.target.setAttribute('src',newUri)
    }
})
})

const scaleSelect = document.getElementById('scaleSelect')
scaleSelect.addEventListener('change',()=>{
    console.log(frame.style.height);
    frame.style.transform = `scale(${scaleSelect.value})`
    console.log(scaleSelect.value);
    frame.style.transformOrigin = '50% 0';
    frame.style.height = `calc((100vh - 50px) * (1 / ${scaleSelect.value}))`
   
})

const pagesSelect = document.getElementById('pagesSelect')
pagesSelect.addEventListener('change',()=>{

    frame.src = pagesSelect.value
    
})


function size(width) { 
   frame.width = width
}


 var fontsContainerBool = false
 var fontColorContainerBool = false
 var fontBackgroundColorContainerBool = false

 function toggleFontsContainer(){
    if (!fontsContainerBool) {
        fontsContainer.style.display='block' 
        fontsContainerBool = true
    }else{
        fontsContainer.style.display='none'
        fontsContainerBool = false
    }
    
 }
 function toggleFontColorContainer(){
    if (!fontColorContainerBool) {
        fontColorContainer.style.display='block' 
        fontColorContainerBool = true
    }else{
        fontColorContainer.style.display='none'
        fontColorContainerBool = false
    }
    
 }

 function toggleFontBackgroundColorContainer(){
    if (!fontBackgroundColorContainerBool) {
        fontBackgroundColorContainer.style.display='block' 
        fontBackgroundColorContainerBool = true
    }else{
        fontBackgroundColorContainer.style.display='none'
        fontBackgroundColorContainerBool = false
    }
    
 }


 fontBackgroundColorContainer
 // block yer degisim denemeleri

 var blocks = frameContent.querySelectorAll('.block')
  
 var blocksIds = []

 blocks.forEach(block=>{
    blocksIds.push(block.getAttribute('id'))
 })
//console.log(blocksIds);

var blockList = document.getElementById('blocks')

function addBlocksIdsList(){
    blocksIds.forEach(blockId=>{
    //console.log(blockId);
    blockList.innerHTML+=`
    <li id="${blockId}" draggable="true" ondragstart="dragStart(event)" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box" viewBox="0 0 16 16">
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
    </svg>${blockId}</li>
    `
    })
//console.log(blockList);
}
addBlocksIdsList()


var container, targetElem, dragElem
container = document.getElementById('blocks')

//container.addEventListener('drop',drop(event))
//container.addEventListener('dragover',dragOver(event))
//container.addEventListener('dragend',dragEnd(event))
//container.addEventListener('dragleave',dragLeave(event))

var newBlockList =[]

function drop(e){
    //console.log('drop');
    e.preventDefault();
    var dragId = e.dataTransfer.getData('p');
    dragElem = document.getElementById(dragId);
    //console.log('droped:', e.target.id);
    
    targetElem = document.getElementById(e.target.id)
    container.style.color='black'
    //container.insertBefore(dragElem, targetElem)
    if (e.target.id == 'blocks') {
        targetElem = document.getElementById(e.target.id)
        container.appendChild(dragElem)
    }else{
        targetElem = document.getElementById(e.target.id)
        container.insertBefore(dragElem, targetElem)
    }
    newOrderBlocks()
    orderFrameContent()
}
function dragStart(e){
    e.dataTransfer.setData('p', e.target.id,);
   // console.log('drag started');
    //console.log(e.target.id);
    dragElem = document.getElementById(e.target.id)
    dragElem.style.backgroundColor='#e2e2e2'
    //console.log(dragElem);
   
}

function dragOver(e) {
    e.preventDefault();
    //e.target.style.borderTop="1px solid gray"
    //console.log('birakma alani : ' + e.target);
    if (e.target.id == 'blocks') {
        targetElem = document.getElementById(e.target.id)
        container.appendChild(dragElem)
    }else{
        targetElem = document.getElementById(e.target.id)
        container.insertBefore(dragElem, targetElem)
    }
    //newOrderBlocks()
}

function dragLeave(e) {
    e.preventDefault();
}

function dragEnd(e) {
e.preventDefault();
dragElem.style.backgroundColor=''
}

  

  function newOrderBlocks(){
   newBlockList = []
   var blockList = container.querySelectorAll('li')
   blockList.forEach(block=>{
     newBlockList.push(block.getAttribute('id'))
   })
   //console.log('son durum:', newBlockList);
  }


  function orderFrameContent(){
    const frameBlocks = frameContent.querySelectorAll('.block')
    newBlockList.forEach(item=>{
        frameBlocks.forEach(block=>{
            if (block.id == item) {
                frameContent.body.appendChild(block)
            }
        })
    })
  }


  
  
  var Menu = true
  var Attributes = true

  function toggleMenu(){
    if (Menu) {
        document.querySelector('#menu').style.width='250px'
        //document.querySelector('#menu').style.transform='translateX(0)'
        Menu = false
    }else{
        document.querySelector('#menu').style.width='0px'
        //document.querySelector('#menu').style.transform='translateX(-250px)'
        Menu = true
    }
  }
  function toggleAttr(){
   //clickFrameContentBtn.style.color = 'tomoto'
   document.querySelector('#clickFrameContentBtn').style.color = 'tomato'
    if (Attributes) {
        //document.querySelector('.attributes').style.display='flex'
        //document.querySelector('.attributes').style.width='300px'
        //document.querySelector('.attributes').style.padding='10px'
        // console.log(frameContent.body.children);
        document.querySelector('#clickFrameContentBtn').style.color = 'tomato'
        Attributes = false
    }else{
        //document.querySelector('.attributes').style.display='none'
        //document.querySelector('.attributes').style.width='0px'
        //document.querySelector('.attributes').style.padding='0px'
        document.querySelector('#clickFrameContentBtn').style.color = 'black'
        Attributes = true
    }
  }


  frameContent.body.addEventListener('click',(event)=>{
    console.log(event.target);
    //event.target
    //toggleAttr()

  })