// Array de palabras
let posiblesPalabras = [
  ["amarillo", "Un color"],
  ["atlantico", "Un océano"],
  ["ordenador", "Una gran herramienta  ;)"],
  ["laurel", "Un árbol"],
  ["plaza", "Espacio público"],
  ["avenida", "Espacio público"],
  ["calle", "Espacio público"],
  ["desarrolador", "Una profesión"],
  ["rueda", "Gran invento"],
  ["cereza", "Una fruta"],
  ["petanca", "Un juego"],
  ["pintor", "Una profesión"],
  ["naranjo", "Un árbol"],
  ["higuera", "Un árbol"],
  ["everest", "Un monte"],
  ["relampago", "Antecede al trueno"],
  ["jirafa", "Un animal"],
  ["nogal", "Un árbol"],
  ["tigre", "Un animal"],
  ["elefante", "Un animal"],
  ["mosquito", "Un insecto"],
  ["caballo", "Un animal"],
  ["rinoceronte", "Un animal"],
  ["portugal", "Un país"],
  ["españa", "Un país"],
  ["noruega", "Un país"],
  ["italia", "Un país"],
  ["rusia", "Un país"],
  ["uruguay", "Un país"],
  ["ilustracion", "Representación gráfica"],
  ["tarta", "De la pastelería"],
  ["pepito", "De la pastelería"],
  ["excursion", "Actividad en la naturaleza"],
  ["empanadilla", "De la panadería"],
  ["pastel", "De la pastelería"],
  ["colegio", "Lugar para estudiar"],
  ["carrera", "Competición"],
  ["mermelada", "Confitura"],
];

let abecedario = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let palabra = document.getElementById("palabra");

let inicio = document.getElementById("inicio");

let botonera = document.getElementById("botonera");
let intentos = document.getElementById("intentos");
let imagen = document.getElementById("imagen");
let pista = document.getElementById("pista");

const fragmentBUT = document.createDocumentFragment()
const fragmentGUION = document.createDocumentFragment()

let numeroPalabraOculta = Math.floor(Math.random() * posiblesPalabras.length)
let palabraOriginal = posiblesPalabras[numeroPalabraOculta][0]
let pistaPalabra = posiblesPalabras[numeroPalabraOculta][1]
console.log(palabraOriginal)

let letrasAdivinadas = []
let palabraAdivinada = []

let contFallos = 6

for (let letra of abecedario) {
  let boton = document.createElement('button')
  boton.textContent = letra
  boton.classList.add("tamanio-botones","btn","btn-outline-success","m-1","font-weight-bold")
  fragmentBUT.appendChild(boton)
}

botonera.appendChild(fragmentBUT)

for (let letra of palabraOriginal) {
  palabraAdivinada.push('_')
}

const guion = document.createElement('p')
guion.textContent = palabraAdivinada.join(' ')
palabra.appendChild(guion)

const clickLetra = (event) => {
  
  if (event.target.tagName === "BUTTON") {
    
    const letraUsuario = event.target.textContent.toLowerCase()
    
      if (palabraOriginal.includes(letraUsuario)) {

        for (let i = 0; i < palabraOriginal.length; i++) {
          if (palabraOriginal[i] === letraUsuario) {
            palabraAdivinada[i] = letraUsuario
          }
        }
        event.target.classList.add("bg-success","text-white")
        event.target.disabled = true
        
      } else {

        contFallos = contFallos-1
        event.target.classList.add("bg-danger","text-white","border-danger")
        event.target.disabled = true
        
        if (contFallos > 0) {
          imagen.src="imagenes/ahorcado_"+contFallos+".png"
          intentos.textContent=contFallos

        } else {
          
          imagen.src="imagenes/ahorcado_0.png"
          intentos.textContent='0'
          
          const perdido = document.createElement('p')
          const palabraEra = document.createElement('p')
          perdido.textContent='No has acertado'
          perdido.classList.add("text-danger","intentos","font1")
          palabraEra.textContent='La palabra era '+palabraOriginal
          palabraEra.classList.add("text-success","intentos")

          botonera.innerHTML=""
          palabra.innerHTML=""

          botonera.prepend(perdido)
          botonera.appendChild(palabraEra)

        }       
      }
      guion.textContent = palabraAdivinada.join(' ')

      if (palabraAdivinada.join('') === palabraOriginal) {
        const ganado = document.createElement('p')
        const palabraEs = document.createElement('p')
        ganado.textContent='FELICIDADES!'
        ganado.classList.add("text-danger","intentos","font1")
        palabraEs.textContent=palabraOriginal
        palabraEs.classList.add("text-success","intentos")

        botonera.innerHTML=""
        palabra.innerHTML=""

        botonera.prepend(ganado)
        botonera.appendChild(palabraEs)

        inicio.textContent='Empezar'
      }
    
  }
}

botonera.addEventListener("click", clickLetra)

inicio.addEventListener("click", () => {
  location.reload()
})

const crearPista = () => {
  const pistaza = document.createElement('p')
  pistaza.textContent = pistaPalabra
  pistaza.classList.add("text-danger", "intentos")
  intentos.after(pistaza)

  pista.removeEventListener("click", crearPista)
}

pista.addEventListener("click", crearPista)