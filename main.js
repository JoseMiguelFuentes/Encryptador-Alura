
let inputText = document.getElementById('input-text')
let outputText = document.getElementById('output-text')
let outputConsole = document.querySelector('.console')

let signs = document.querySelector('.not-found')//Avisos de no encontrado
let imgSecTwo = document.querySelector('.perito')//Imagen sección 2

/*  Botones  */
let encryptBtn = document.querySelector('.encrypt')//Conección con el botón encriptar.
let decryptBtn = document.querySelector('.decrypt')
let copyBtn = document.querySelector('.copy')
/*   Alertas  */
let alerta = document.querySelector('.alerta')
let jobDone = document.querySelector('.allOk')
let shown = document.querySelector('.shown')
/*  Fecha  */
let date = document.querySelector('.date')
date.textContent = `®${new Date().getFullYear()}`

/* Captura de eventos  */
encryptBtn.onclick = ()=> sendText(encrypt(inputText.value))//Encriptar
decryptBtn.onclick = ()=> sendText(decrypt(inputText.value))//Desencriptar
inputText.addEventListener("keypress", (e)=>{//Capturo la tecla enter al ser presionado para encriptar
  if (e.code === "Enter") {
    sendText(encrypt(inputText.value))
  }
})

inputText.onfocus = () => {
  alerta.style.visibility = 'hidden'
  jobDone.style.visibility = 'hidden'
  shown.style.visibility = 'hidden'
  showSigns()
}

copyBtn.addEventListener('click' , async()=>{
  await navigator.clipboard.writeText(outputText.textContent)//Para enviar el texto al portapapeles
  // await navigator.clipboard.readText().then( clipText => inputText.value = clipText )
  alertCopied()
  showSigns()
  alerta.style.animation = 'move-x  forwards 2s 1'
  jobDone.style.visibility = 'hidden'
  shown.style.visibility = 'hidden'
  }
)







function alertCopied(){
  alerta.style.visibility = 'visible'
  // setInterval(() => {
  //   alerta.style.visibility = 'hidden'
  // }, 3000);
}

function hideSigns() {
  outputConsole.style.display = 'block'
  signs.style.display = 'none'
}
function showSigns() {
  outputConsole.style.display = 'none'
  signs.style.display = 'block'
}

function sendText(code) {
  outputText.textContent = code
}

function encrypt( text ) {
  // La letra "e" es convertida para "enter"
  // La letra "i" es convertida para "imes"
  // La letra "a" es convertida para "ai"
  // La letra "o" es convertida para "ober"
  // La letra "u" es convertida para "ufat"
  let codeArray = [
    ['e', 'enter'],['i', 'imes'],['a', 'ai'],['o', 'ober'],['u','ufat']
  ]
  outputText.style.display = 'block'
  jobDone.style.visibility = 'visible'
  text = text.toLowerCase()
  inputText.value = ''
  hideSigns()
  for (let i = 0; i < codeArray.length; i++) {
    if (text.includes(codeArray[i][0])) {
      text = text.replaceAll(codeArray[i][0],codeArray[i][1])
    }
  }
  return text
}

console.log(inputText)

function decrypt(text) {
  let codeArray = [
    ['e', 'enter'],['i', 'imes'],['a', 'ai'],['o', 'ober'],['u','ufat']
  ]
  text = text.toLowerCase()
  inputText.value = ''
  shown.style.visibility = 'visible'
  hideSigns()
  for (let i = 0; i < codeArray.length; i++) {
    if (text.includes(codeArray[i][1])) {
      text = text.replaceAll(codeArray[i][1],codeArray[i][0])
    }
  }
  return text
}


// function finddingSheeps(sheeps) {
  
// }
// let mySheeps = ['Noah','blue','Euge','red','Ki Na Ma', 'red']
// console.log()



