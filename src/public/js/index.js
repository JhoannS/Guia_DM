 
         //crear
         const open = document.getElementById('open');
        const modal_container = document.getElementById('modal_container');
        const close = document.getElementById('close');

open.addEventListener("click", () => {
  modal_container.classList.add("show");
});

close.addEventListener("click", () => {
  modal_container.classList.remove("show");
});

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false,
  isAutoPlay = true,
  startX,
  startScrollLeft,
  timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
};

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
};
autoPlay();

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
        carousel.addEventListener("scroll", infiniteScroll);
        wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
        wrapper.addEventListener("mouseleave", autoPlay);


       // Función para obtener la fecha y hora actual en formato 12 horas con día, mes y año
       function obtenerFechaHoraActual() {
        const fechaHora = new Date();
        const diaSemana = obtenerDiaSemana(fechaHora.getDay()); // Obtiene el nombre del día de la semana
        const dia = fechaHora.getDate();
        const mes = fechaHora.toLocaleString('es-ES', { month: 'long' }); // Obtén el nombre del mes
        const anio = fechaHora.getFullYear();
        let hora = fechaHora.getHours();
        const minutos = fechaHora.getMinutes();
        const segundos = fechaHora.getSeconds();
        let amPm = "AM"; // Por defecto, asumimos que es AM

        // Ajusta la hora al formato de 12 horas y determina si es AM o PM
        if (hora >= 12) {
            amPm = "PM";
            if (hora > 12) {
                hora -= 12;
            }
        }

        // Formatea la fecha y hora
        const fechaFormateada = `${diaSemana} ${dia} de ${mes} de ${anio}`;
        const horaFormateada = `${hora}:${minutos}:${segundos} ${amPm}`;

        // Muestra la fecha y hora en el elemento con id "fecha-hora"
        document.getElementById("fecha").textContent = `${fechaFormateada}`;
        document.getElementById("hora").textContent = `${horaFormateada}`;
    }

    // Función para obtener el nombre del día de la semana
    function obtenerDiaSemana(numeroDia) {
        const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        return diasSemana[numeroDia];
    }

    // Llama a la función al cargar la página
    obtenerFechaHoraActual();

    // Actualiza los segundos cada segundo
    setInterval(obtenerFechaHoraActual, 1000);