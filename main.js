


let cleanKey = generateKey()//Genero número entre 100 y 1000

let body = document.querySelector('body')
let inputText = document.getElementById('input-text')
let outputText = document.getElementById('output-text')
let keyWarnning = document.querySelector('.advertisement')//Para mostrar el cuadro de la clave necesaria para desencriptar
let noTextWarnning = document.querySelector('.advertisement-notext')//Desencriptar- no hay texto
let outputConsole = document.querySelector('.console')
let keyPopUp = document.querySelector('.key_popup')//El contenedor del input para poder ingresar la clave para desencriptar

let signs = document.querySelector('.not-found')//Avisos de no encontrado
let imgSecTwo = document.querySelector('.perito')//Imagen sección 2

/*  Botones  */
let encryptBtn = document.querySelector('.encrypt')//Conección con el botón encriptar.
let decryptBtn = document.querySelector('.decrypt')
let copyBtn = document.querySelector('.copy')

/*   Alertas  */
let alertCopyPc = document.querySelector('.alert')
let alertCopyMobile = document.querySelector('.globe-mobile')
let jobDone = document.querySelector('.allOk')
let shown = document.querySelector('.shown')
let keyResult = document.getElementById('key-result')

/*  Fecha  */
let date = document.querySelector('.date')
date.textContent = `® ${new Date().getFullYear()}`

/*  Captura de eventos  */
encryptBtn.onclick = ()=> sendText(encrypt(inputText.value, cleanKey))//Encriptar
decryptBtn.onclick = ()=> decrypt(inputText.value)//Desencriptar
inputText.addEventListener("keypress", (e)=>{//Capturo la tecla enter al ser presionado para encriptar
  if (e.code === "Enter") {
    sendText(encrypt(inputText.value, cleanKey))
    
  }
})

inputText.onfocus = () => {
  alertCopyPc.style.visibility = 'hidden'
  jobDone.style.visibility = 'hidden'
  shown.style.visibility = 'hidden'
  showSigns()
}
let keyGlobeCopied = document.querySelector('.globe')
keyResult.addEventListener('click', async(e)=>{
  
  keyGlobeCopied.classList.toggle('visible')
  stopsAudios(e)
  copiedSound.play()
  navigator.clipboard.writeText(keyResult.innerText)
  setTimeout( ()=>{
    keyGlobeCopied.classList.toggle('visible')
    keyWarnning.style.visibility = 'hidden'
  }, 2500)
})

copyBtn.addEventListener('click', async(e)=>{
  await navigator.clipboard.writeText(outputText.textContent)//Para enviar el texto al portapapeles
  alertCopied()
  showSigns()
  stopsAudios()
  copiedSound2.play()
  alertCopyPc.style.animation = 'move-x  forwards 2s 1'
  jobDone.style.visibility = 'hidden'
  shown.style.visibility = 'hidden'
  inputText.value = ''
  }
)
/*  Captura de eventos fin */

/*  Sonidos */
let xFilesSound = new Audio( 'Sonidos/x-files.mp3' )
let decryptedSound = new Audio( 'Sonidos/desencriptado.mp3' )
let copiedSound = new Audio( 'Sonidos/copiado.mp3' )
let copiedSound2 = new Audio( 'Sonidos/mario-bros.mp3' )
let errorSound = new Audio( 'Sonidos/error.mp3' )
let encryptFaiSound = new Audio( 'Sonidos/falló-encriptado.mp3' )
let decryptFaiSound = new Audio('Sonidos/falló_desencriptado.mp3')
let enterKeySound = new Audio( 'Sonidos/enter_key.mp3' )
let noKeySound = new Audio( 'Sonidos/error_noKey.mp3' )

let sounds = [ xFilesSound, decryptedSound, copiedSound, errorSound]

function stopsAudios() {
  for ( let i = 0; i < sounds.length; i++) {
    sounds[i].pause()
  }
}

/*  Sonidos fin  */

/* Relativo a la clave  */
let symbols = ['!', '$', '&', '♥', '®', '?', 'ß', '©','♂','↓']
let inputKey = document.querySelector('.input-key')

function generateKey () {
  let keyToReturn = Math.floor(Math.random()*(1000 - 100)) + 100
  return keyToReturn 
}

function keyTransformation(key){
  let fillings = ['😎', '👍','#', 'は', '♠', '🌻', 'Ω', '¥', '🍒', 'π', '%', '✈', '☀', '♂', '⚡', '❄', '☔', '♲', 'き', '😍', '♀', '€','«', 'ネ','❤']

  let keytoText = key.toString()
  let keySymbols = symbols[Number(keytoText[0])] + symbols[Number(keytoText[1])] + symbols[Number(keytoText[2])]
  let filled = []

  for(let i = 1; filled.length < 6; i++) {
    filled.push(fillings[Math.floor(Math.random()* fillings.length) ]) 
  }
  let joined = filled.join('')
  let finalKey = `${joined.substring(0,3)}${keySymbols}${joined.substring(3)}`
  
  return finalKey
}

function keyRecovery(key){
  
  let keyExtracted = key.substring(3,6)
  
  let numberExtracted = `${symbols.indexOf(keyExtracted[0])}${symbols.indexOf(keyExtracted[1])}${symbols.indexOf(keyExtracted[2])}`
  if ( numberExtracted.includes('-1') ) return ""
  return numberExtracted
}




/* Relativo a la clave, ends */




function alertCopied(){
  if (window.screen.width > 1280) {
    alertCopyPc.style.visibility = 'visible'
  }
  if (window.screen.width < 1280) {
    alertCopyMobile.style.visibility = 'visible'
    setTimeout(()=>{
      alertCopyMobile.style.visibility = 'hidden'
    },2500)
  }
}

function hideSigns() {
  outputConsole.style.display = 'flex'
  signs.style.display = 'none'
  copyBtn.style.visibility = 'visible'
}
function showSigns() {
  outputConsole.style.display = 'none'
  signs.style.display = 'block'
}

function sendText(code) {
  outputText.textContent = code
}

let coords = keyResult.getBoundingClientRect()//? Obtengo coordenadas del cuadro de dialogo.


function encrypt( text, key ) {
  let keyTurned = keyTransformation( cleanKey )

  if (inputText.value == "") {
    stopsAudios()
    encryptFaiSound.play()
    encryptFaiSound.volume = 1
    noText('No hay nada para encriptar', noTextWarnning)
  }

  else if (inputText.value != ""){
    stopsAudios()
    xFilesSound.play()
    xFilesSound.volume = 1
    outputText.style.display = 'block'
    jobDone.style.visibility = 'visible'
    inputText.value = ""
    keyResult.textContent = keyTurned
    keyWarnning.style.visibility = 'visible'
    hideSigns()
    let result = ""
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) + key)
    }
    return result;
  }
  
}


function decrypt(text,key) {
  switchButtonsStates( encryptBtn, decryptBtn )
  //{ Habilita o deshabilita botones.
  if (inputText.value == "") {
    stopsAudios()
    decryptFaiSound.play()
    noText('Sin texto para desencriptar', noTextWarnning)
  }else{
    toggleBlur()
    stopsAudios()
    keyPopUp.style.display = 'flex'
    inputText.readOnly = true
    enterKeySound.play()
  }
}





//% Key pop up /
let continueBtn = document.querySelector('.go-on')
continueBtn.onclick = () => {//{ Botón continuar.
  stopsAudios()
  let revealed = keyRecovery( inputKey.value )
  inputText.readOnly = false
  if ( revealed !== "" ){

    sendText(enterKey( inputText.value, revealed ))
    keyPopUp.style.display = 'none'
    inputKey.value = '',
    toggleBlur()//& Activa y desactiva el efecto desenfoque.
  }else{
    stopsAudios()
    noKeySound.play()
    noText('Llave inválida.', noTextWarnning)
    inputKey.value = ''
    switchButtonsStates( encryptBtn, decryptBtn )
    cleanKey = generateKey()
  }
  
}

function enterKey( text, key ) {
  let noSpace = text.trim()
  if (key !== "") {
      stopsAudios()
      decryptedSound.play()
      inputText.value = ""
      shown.style.visibility = 'visible'
      hideSigns()
      let result = "";
      for (let i = 0; i < noSpace.length; i++) {
        result += String.fromCharCode(noSpace.charCodeAt(i) - key);
      }
      return result
    }
  
}


function noText( inscription, ele ) {
  let parragrah = document.querySelector('.parragrah')
  if ( parragrah ) {
    ele.removeChild(parragrah)
  }
  
  let p = document.createElement("p")
  p.classList.add('parragrah')
  p.textContent = inscription
  ele.appendChild(p);
  ele.style.visibility = 'visible'
  setTimeout(()=>{
    ele.style.visibility = 'hidden'
  },2500)
}

function switchButtonsStates(){
  let buttonArray = Array.from( arguments)
  buttonArray.forEach( button => {
      !button.disabled
  })
}

function toggleBlur() {
  let blur = document.getElementById('blur')
  blur.classList.toggle( 'active' )
}