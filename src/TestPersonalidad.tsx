import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { preguntas, psicologos } from './datosTest';

export default function TestPersonalidad() {
  const [fase, setFase] = useState<'inicio' | 'test' | 'resultado'>('inicio');
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntajes, setPuntajes] = useState<any>({ freud: 0, jung: 0, skinner: 0, rogers: 0 });
  const [resultadoFinal, setResultadoFinal] = useState<any>(null);

  const manejarInicio = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim() && cedula.trim()) {
      setFase('test');
    }
  };

  const manejarRespuesta = (psicologoSeleccionado: string) => {
    const nuevosPuntajes = { ...puntajes, [psicologoSeleccionado]: puntajes[psicologoSeleccionado] + 1 };
    setPuntajes(nuevosPuntajes);

    if (preguntaActual + 1 < preguntas.length) {
      setPreguntaActual(preguntaActual + 1);
    } else {
      calcularResultado(nuevosPuntajes);
    }
  };

  const calcularResultado = (puntajesFinales: any) => {
    const ganador = Object.keys(puntajesFinales).reduce((a, b) => 
      puntajesFinales[a] > puntajesFinales[b] ? a : b
    );
    setResultadoFinal((psicologos as any)[ganador]);
    setFase('resultado');
  };

  const reiniciarTest = () => {
    setPreguntaActual(0);
    setPuntajes({ freud: 0, jung: 0, skinner: 0, rogers: 0 });
    setNombre('');
    setCedula('');
    setResultadoFinal(null);
    setFase('inicio');
  };

  return (
    <div style={styles.contenedorPantalla}>
      <div style={styles.contenedorTest}>
        
        {fase === 'test' && (
          <div style={styles.barraProgresoFondo}>
            <motion.div 
              style={styles.barraProgresoLlenado}
              initial={{ width: 0 }}
              animate={{ width: `${(preguntaActual / preguntas.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {fase === 'inicio' && (
            <motion.div
              key="inicio"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={styles.tarjeta}
            >
              <h2 style={styles.tituloPrincipal}>Bienvenido al Test de Personalidad</h2>
              <p style={styles.subtitulo}>Descubre qué psicólogo histórico se parece más a ti.</p>
              
              <form onSubmit={manejarInicio} style={styles.formulario}>
                <div style={styles.campoInput}>
                  <label style={styles.label}>Por favor, dime tu nombre:</label>
                  <input 
                    type="text" 
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Tu nombre aquí"
                    style={styles.input}
                  />
                </div>

                <div style={styles.campoInput}>
                  <label style={styles.label}>Cédula / Identificación:</label>
                  <input 
                    type="text" 
                    required
                    value={cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    placeholder="Tu número de cédula"
                    style={styles.input}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  style={styles.botonPrincipal}
                >
                  Comenzar Test
                </motion.button>
              </form>
            </motion.div>
          )}

          {fase === 'test' && (
            <motion.div
              key={preguntaActual}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              style={styles.tarjeta}
            >
              <h2 style={styles.tituloPregunta}>{preguntas[preguntaActual].pregunta}</h2>
              
              <div style={styles.contenedorOpciones}>
                {preguntas[preguntaActual].opciones.map((opcion: any, index: number) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, backgroundColor: "#f0f4ff" }}
                    whileTap={{ scale: 0.98 }}
                    style={styles.botonOpcion}
                    onClick={() => manejarRespuesta(opcion.psicologo)}
                  >
                    {opcion.texto}
                  </motion.button>
                ))}
              </div>
              <p style={styles.contador}>Pregunta {preguntaActual + 1} de {preguntas.length}</p>
            </motion.div>
          )}

          {fase === 'resultado' && resultadoFinal && (
            <motion.div
              key="resultado"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              style={styles.tarjetaResultado}
            >
              <h1 style={styles.tituloFelicitaciones}>¡Felicidades {nombre} por hacer el test!</h1>
              <h2 style={styles.tituloResultado}>Eres {resultadoFinal.nombre}</h2>
              
              <img 
                src={resultadoFinal.imagen} 
                alt={resultadoFinal.nombre} 
                style={styles.imagenImagen} 
              />
              
              <div style={styles.textoResultadoCaja}>
                <p style={styles.descripcionCorta}><strong>{resultadoFinal.descripcion}</strong></p>
                <div style={styles.separador}></div>
                <p style={styles.porQueTexto}>{resultadoFinal.porQue}</p>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={styles.botonPrincipal} 
                onClick={reiniciarTest}
              >
                Volver a hacer el test
              </motion.button>

              <div style={styles.agradecimientosDiscretos}>
                Gracias por participar • Gracias a Wismar
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

// Estilos Responsive
const styles = {
  contenedorPantalla: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e0e7ff', padding: '15px', fontFamily: '"Inter", sans-serif' },
  contenedorTest: { width: '100%', maxWidth: '600px', margin: '0 auto' },
  barraProgresoFondo: { width: '100%', height: '8px', backgroundColor: '#c7d2fe', borderRadius: '10px', marginBottom: '20px', overflow: 'hidden' },
  barraProgresoLlenado: { height: '100%', backgroundColor: '#4f46e5', borderRadius: '10px' },
  
  // Aquí usamos clamp() para que el padding cambie según el tamaño de la pantalla
  tarjeta: { backgroundColor: 'white', padding: 'clamp(25px, 5vw, 40px) clamp(15px, 4vw, 30px)', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center' as const, width: '100%' },
  
  tituloPrincipal: { fontSize: 'clamp(22px, 5vw, 26px)', color: '#1e1b4b', marginBottom: '10px', fontWeight: '700' },
  subtitulo: { color: '#475569', marginBottom: '25px', fontSize: 'clamp(14px, 3vw, 16px)' },
  
  formulario: { display: 'flex', flexDirection: 'column' as const, gap: '20px', textAlign: 'left' as const },
  campoInput: { display: 'flex', flexDirection: 'column' as const, gap: '8px' },
  label: { fontSize: '14px', fontWeight: '600', color: '#3730a3' },
  input: { padding: '12px 15px', fontSize: '16px', border: '2px solid #c7d2fe', borderRadius: '10px', outline: 'none', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box' as const },
  
  botonPrincipal: { padding: 'clamp(12px, 3vw, 15px)', fontSize: 'clamp(14px, 4vw, 16px)', fontWeight: 'bold' as const, color: 'white', backgroundColor: '#4f46e5', border: 'none', borderRadius: '10px', cursor: 'pointer', marginTop: '10px', width: '100%' },
  
  tituloPregunta: { fontSize: 'clamp(18px, 5vw, 22px)', color: '#1e1b4b', marginBottom: '20px', fontWeight: '600' },
  contenedorOpciones: { display: 'flex', flexDirection: 'column' as const, gap: '12px' },
  botonOpcion: { padding: 'clamp(12px, 3vw, 15px) 20px', fontSize: 'clamp(14px, 4vw, 16px)', color: '#3730a3', backgroundColor: 'white', border: '2px solid #c7d2fe', borderRadius: '12px', cursor: 'pointer', textAlign: 'left' as const, outline: 'none', width: '100%' },
  contador: { marginTop: '25px', color: '#6b7280', fontSize: '13px' },
  
  tarjetaResultado: { backgroundColor: 'white', padding: 'clamp(25px, 5vw, 40px) clamp(15px, 4vw, 30px)', borderRadius: '20px', boxShadow: '0 10px 30px rgba(79, 70, 229, 0.2)', textAlign: 'center' as const, display: 'flex', flexDirection: 'column' as const, alignItems: 'center' },
  tituloFelicitaciones: { fontSize: 'clamp(18px, 4vw, 22px)', color: '#1e293b', marginBottom: '5px', fontWeight: '600' },
  tituloResultado: { fontSize: 'clamp(26px, 7vw, 36px)', color: '#4f46e5', marginBottom: '25px', fontWeight: '800' },
  
  // Imagen responsive
  imagenImagen: { width: 'clamp(120px, 40vw, 180px)', height: 'clamp(120px, 40vw, 180px)', objectFit: 'cover' as const, borderRadius: '50%', border: '5px solid #e0e7ff', marginBottom: '25px' },
  
  textoResultadoCaja: { backgroundColor: '#f8fafc', padding: 'clamp(15px, 4vw, 20px)', borderRadius: '15px', marginBottom: '25px', width: '100%', boxSizing: 'border-box' as const },
  descripcionCorta: { fontSize: 'clamp(16px, 4vw, 18px)', color: '#1e293b', marginBottom: '15px' },
  separador: { height: '1px', backgroundColor: '#cbd5e1', width: '50%', margin: '0 auto 15px auto' },
  porQueTexto: { fontSize: 'clamp(14px, 3.5vw, 16px)', color: '#475569', lineHeight: '1.6' },
  
  agradecimientosDiscretos: { marginTop: '30px', fontSize: '12px', color: '#94a3b8', letterSpacing: '0.5px', textAlign: 'center' as const }
};