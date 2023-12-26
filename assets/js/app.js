var allElements = document.querySelectorAll('.editable')
let frame = document.querySelector('iframe')


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


function size(width) {
   
   frame.width = width
   frame.style.position='unset'
    frame.style.top='unset'
    frame.style.left='unset'
    frame.style.right='unset'
    frame.style.bottom='unset'
}

function full() {
    let frame = document.querySelector('iframe')
    frame.style.position='absolute'
    frame.style.top=0
    frame.style.left=0
    frame.style.right=0
    frame.style.bottom=0
    frame.width="100%"
    frame.height="100vh"

 }


 // text editting functions
 var frameContent = frame.contentDocument || frame.contentWindow.document;
 console.log(frameContent);

 function command(aCommandName, aShowDefaultUI='', aValueArgument=''){
    frameContent.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
 }
