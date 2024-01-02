

let frame = document.querySelector('iframe')
// text editting functions
var frameContent = frame.contentDocument || frame.contentWindow.document;
//console.log(frameContent);
var allElements = frameContent.querySelectorAll('.editable')


function command(aCommandName, aShowDefaultUI='', aValueArgument=''){
   frameContent.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
}




console.log(allElements);

allElements.forEach(el=>el.setAttribute('contenteditable','true'))

var images = document.querySelectorAll('img')

images.forEach(img=>{
    img.addEventListener('click',(e)=>{
    e.target.getAttribute('src')
    var newUri = prompt("Yeni resim uri",e.target.getAttribute('src'))
    if (newUri != null && newUri != '' ) {
        e.target.setAttribute('src',newUri)
    }
})
})


//assets/images/resim2.jpeg
//assets/images/IMG_2184.jpeg


const sizeSelect = document.getElementById('sizeSelect')
sizeSelect.addEventListener('change',()=>{size()})

function size() { 
   frame.width = sizeSelect.value
    frame.style.position='unset'
    frame.style.top='unset'
    frame.style.left='unset'
    frame.style.right='unset'
    frame.style.bottom='unset'
}

function full() {
    let frame = document.querySelector('iframe')
    frame.style.position='relative'
    frame.style.top=69
    frame.style.left=0
    frame.style.right=0
    frame.style.bottom=0
    frame.width="100%"

 }

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
                frameContent.querySelector('main').appendChild(block)
            }
        })
    })
  }


  
  
  var Menu = true
  var Attributes = true

  function toggleMenu(){
    if (Menu) {
        document.querySelector('#menu').style.display='flex'
        Menu = false
    }else{
        document.querySelector('#menu').style.display='none'
        Menu = true
    }
  }
  function toggleAttr(){
   
    if (Attributes) {
        document.querySelector('.attributes').style.display='flex'
        Attributes = false
    }else{
        document.querySelector('.attributes').style.display='none'
        Attributes = true
    }
  }
