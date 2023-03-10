window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;
const voices = synth.getVoices();
const texts = document.querySelector(".texts");
recognition.lang = "es-DO";
console.log(voices);
recognition.interimResults = true;
const msg = new SpeechSynthesisUtterance();

recognition.addEventListener("result", (e) => {

    const text = Array.from(e.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");

    if (e.results[0].isFinal) {
        let p = document.createElement("p");
        if (text.includes("innova") || text.includes("Innova") || text.includes("INNOVA")) {
            talk(`
        INNOVATEP, es la feria de INFOTEP para presentar y estimular la innovación en la formación técnico profesional

        La Dirección Regional Metropolitana, desde las 9 de la mañana hasta las 9 de la noche, lugar que se transformará en un Hub de Innovación, acogiendo 45 proyectos innovadores de áreas que van desde la agricultura, tecnología, salud y bienestar, gastronomía y otras.
       
       Además, INNOVATEP, servirá como un espacio de intercambio de conocimiento, transferencia de tecnología y actualización con un programa que incluye conferencias internacionales, talleres de innovación, exhibición de empresas, actividades culturales, entre otras actividades.
       
       
       Direcciones regionales 
       
       INFOTEP cuenta con seis Direcciones Regionales que funcionan en el Distrito Nacional, Santo Domingo Este, Santiago, San Francisco de Macorís, La Romana y Azua y en las que funcionan Centros Tecnológicos.
       
       Sus docentes y participantes estarán presentando proyectos novedosos, tales como la transformación de vehículos de combustión a un automóvil 100% eléctrico. Además, novedades del área de gastronomía, domótica, agricultura.
       
       Algunos proyectos
       
       Entre los proyectos se destacan, dispositivos para control agrícola en ambientes controlados, reconversión de materiales de plásticos y vidrios para fabricación y un dispositivo para controlar dosis de medicamentos.
       
       Además, control de tráfico para paso de ambulancias, entre otras novedades.
       
       Cómo estará organizada la Feria INNOVATEP
       
       Innovatep estará organizada por proyectos, exposiciones de servicios, exposiciones de trabajos de participantes de cursos de INFOTEP, exposición de equipos y recursos didácticos, áreas de espacios didácticos y de charlas.
       
       Los proyectos serán presentados atendiendo a los colores de la economía, usando el verde para mostrar los relacionados con la agropecuaria, azul para los sectores secundarios o industrial, amarillo para los servicios. El rojo para el área del conocimiento y el naranja para el sector quinario, que incluye los servicios sin ánimo de lucro como la salud, la educación, la cultura, la investigación, seguridad y otras instituciones gubernamentales. 
       
       Diferente público
       
       La feria está dirigida a todos los sectores educativos públicos y privados, así como a las grandes, pequeñas y medianas empresas.
       
       Además, todas las instituciones involucradas con el Sistema Nacional de Formación Técnico Profesional.
        `);
        } else {


            p.innerText = text;
            texts.appendChild(p);
            console.log(msg);
            // msg.cancel();
            searchResponseApi(text);
        }
    }
});

recognition.addEventListener("end", () => {
    recognition.start();
});

recognition.start();

function searchResponseApi(text) {
    axios.get('https://4c43-181-37-213-161.eu.ngrok.io/question/' + text).then((response) => {
        response = response.data;
        console.log(response);
        talk(response);

    });
}

function talk(text) {
    msg.text = text;
    msg.lang = "es-DO";
    synth.speak(msg);
    p = document.createElement("p");
    p.classList.add("replay");
    p.innerText = text;
    texts.appendChild(p);
}