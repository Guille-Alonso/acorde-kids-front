import React from 'react'

const PreInscripcionExitosa = () => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            textAlign: 'center',
            padding: '20px'
        },
        title: {
            color: '#2C3E50',  // Azul oscuro
            fontSize: '2.5rem',
            marginBottom: '20px'
        },
        monto: {
            color: '#E74C3C',  // Rojo suave
            fontSize: '2rem',
            marginBottom: '20px'
        },
        subtitle: {
            color: '#34495E',  // Gris azulado
            fontSize: '1.5rem',
            marginBottom: '15px',
            maxWidth: '600px',  // Para asegurar que el texto no sea demasiado largo
            lineHeight: '1.4'
        },
        strong: {
            color: '#2980B9'  // Azul más claro para el texto resaltado
        }
    };

    return (
      // <div style={styles.container}>
      //     <h2 style={styles.title}>¡GRACIAS!</h2>
      //     <h3 style={styles.monto}>
      //         Su monto a pagar es {localStorage.getItem("monto")}
      //     </h3>
      //     <h4 style={styles.subtitle}>
      //         La cuota debe abonarse del 1 al 10 de cada mes, transfiriendo al alias{' '}
      //         <strong style={styles.strong}>Acorde2025.mp</strong>
      //     </h4>
      //     <h4 style={styles.subtitle}>
      //         Enviar comprobante por correo a{' '}
      //         <strong style={styles.strong}>acorde.yb@gmail.com</strong>{' '}
      //         para confirmar su Inscripción.
      //     </h4>
      // </div>

      <div style={styles.container}>
        <h2 style={styles.title}>¡GRACIAS!</h2>
        <h3 style={styles.subtitle}>
          Nosotros nos comunicaremos con vos, <br /> después de ver los cupos
          disponibles!
        </h3>
      </div>
    );
}

export default PreInscripcionExitosa