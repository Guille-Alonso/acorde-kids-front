// export const obtenerHoraArgentina = () => {
//     const ahora = new Date();
  
//     // Formatear fecha y hora para la zona horaria de Argentina (GMT-3)
//     const opciones = {
//       timeZone: "America/Argentina/Buenos_Aires",
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: false, // 24 horas
//     };
  
//     const formato = new Intl.DateTimeFormat("es-AR", opciones);
//     const horaArgentina = formato.format(ahora);
  
//     return horaArgentina;
//   };
  

export const obtenerHoraArgentina = () => {
    const ahora = new Date();
  
    // Formatear la fecha en formato dd/mm/aaaa
    const opcionesFecha = {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
  
    const formatoFecha = new Intl.DateTimeFormat("es-AR", opcionesFecha);
    const fecha = formatoFecha.format(ahora);
  
    // Formatear la hora en formato hora:minutos
    const opcionesHora = {
      timeZone: "America/Argentina/Buenos_Aires",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24 horas
    };
  
    const formatoHora = new Intl.DateTimeFormat("es-AR", opcionesHora);
    const hora = formatoHora.format(ahora);
  
    // Combinar fecha y hora en el formato deseado
    return `${fecha} - ${hora}`;
  };

  
  