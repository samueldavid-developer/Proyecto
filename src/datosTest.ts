import freudImg from './assets/Sigmund_Freud_LIFE.jpg';
import jungImg from './assets/Jung Carl Gustav.jpg';
import skinnerImg from './assets/Burrhus Frederic Skinner.jpg';
import rogersImg from './assets/Carl_Ransom_Rogers.jpg';

export const psicologos = {
  freud: {
    nombre: "Sigmund Freud",
    imagen: freudImg,
    descripcion: "El padre del psicoanálisis. Crees firmemente que nuestro pasado y nuestros impulsos ocultos dictan nuestro presente.",
    porQue: "Te pareces a Freud porque tiendes a analizar las cosas en profundidad, buscas el significado oculto detrás de las palabras y los sueños, y crees que la infancia moldea fundamentalmente quiénes somos."
  },
  jung: {
    nombre: "Carl Jung",
    imagen: jungImg,
    descripcion: "El fundador de la psicología analítica. Estás en sintonía con lo místico, los arquetipos y el inconsciente colectivo.",
    porQue: "Te pareces a Jung porque tienes una visión espiritual y profunda de la mente. Valoras la introversión/extroversión, buscas patrones universales en el comportamiento humano y confías en tu intuición."
  },
  skinner: {
    nombre: "B.F. Skinner",
    imagen: skinnerImg,
    descripcion: "El pionero del conductismo. Eres práctico, lógico y crees en el poder del hábito y el entorno.",
    porQue: "Te pareces a Skinner porque confías en lo que se puede observar y medir. Crees que las personas cambian si se modifican sus recompensas y castigos, y eres excelente creando sistemas y rutinas."
  },
  rogers: {
    nombre: "Carl Rogers",
    imagen: rogersImg,
    descripcion: "El pilar de la psicología humanista. Eres empático, centrado en el crecimiento personal y crees en el potencial humano.",
    porQue: "Te pareces a Rogers porque lideras con empatía. Crees que todas las personas son inherentemente buenas y solo necesitan un entorno de aceptación incondicional para florecer y alcanzar su mejor versión."
  }
};

export const preguntas = [
  {
    pregunta: "1. Cuando cometes un error, tu primer pensamiento es...",
    opciones: [
      { texto: "Por qué mi subconsciente me saboteó.", psicologo: "freud" },
      { texto: "Qué lección universal puedo extraer de esto.", psicologo: "jung" },
      { texto: "Qué hábito debo cambiar para no repetirlo.", psicologo: "skinner" },
      { texto: "Perdonarme, es parte de mi crecimiento personal.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "2. ¿Cómo interpretas tus sueños?",
    opciones: [
      { texto: "Son deseos reprimidos que salen a la luz.", psicologo: "freud" },
      { texto: "Son símbolos y arquetipos de la humanidad.", psicologo: "jung" },
      { texto: "Son solo mi cerebro procesando el día, nada especial.", psicologo: "skinner" },
      { texto: "Son reflejos de cómo me siento con mi vida actual.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "3. La mejor forma de ayudar a un amigo triste es...",
    opciones: [
      { texto: "Ayudarle a encontrar la raíz de su problema en su pasado.", psicologo: "freud" },
      { texto: "Escuchar qué le dicta su voz interior.", psicologo: "jung" },
      { texto: "Proponerle actividades nuevas que le den alegría.", psicologo: "skinner" },
      { texto: "Abrazarlo y decirle que valide sus emociones.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "4. ¿Qué te motiva a trabajar duro?",
    opciones: [
      { texto: "El deseo de superar mis conflictos internos.", psicologo: "freud" },
      { texto: "El camino hacia la individuación y ser yo mismo.", psicologo: "jung" },
      { texto: "El salario, los premios o el reconocimiento.", psicologo: "skinner" },
      { texto: "La necesidad de sentirme realizado y alcanzar mi potencial.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "5. ¿Cuál crees que es el mayor problema de la sociedad?",
    opciones: [
      { texto: "Reprimimos demasiado nuestros verdaderos instintos.", psicologo: "freud" },
      { texto: "Hemos perdido la conexión con nuestra espiritualidad.", psicologo: "jung" },
      { texto: "Faltan consecuencias claras y buena educación.", psicologo: "skinner" },
      { texto: "Falta empatía y amor incondicional entre nosotros.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "6. En tu tiempo libre prefieres...",
    opciones: [
      { texto: "Ver un thriller psicológico intenso.", psicologo: "freud" },
      { texto: "Leer sobre mitología, astrología o filosofía.", psicologo: "jung" },
      { texto: "Hacer algo productivo o jugar videojuegos por puntos.", psicologo: "skinner" },
      { texto: "Pasar tiempo de calidad con mis seres queridos.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "7. ¿Cómo reaccionas ante una figura de autoridad?",
    opciones: [
      { texto: "Me recuerda a mis padres, me genera conflicto.", psicologo: "freud" },
      { texto: "Los veo como el arquetipo del 'Gobernante'.", psicologo: "jung" },
      { texto: "Respeto las reglas si el sistema es justo.", psicologo: "skinner" },
      { texto: "Los respeto solo si ellos me respetan como persona.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "8. ¿Qué opinas de la infancia?",
    opciones: [
      { texto: "Es la etapa que define absolutamente todos tus traumas.", psicologo: "freud" },
      { texto: "Es cuando estamos más conectados con la magia del mundo.", psicologo: "jung" },
      { texto: "Es cuando aprendemos nuestras conductas base.", psicologo: "skinner" },
      { texto: "Es una etapa vital para recibir amor incondicional.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "9. ¿Cómo aprendes mejor algo nuevo?",
    opciones: [
      { texto: "Analizando por qué me cuesta trabajo.", psicologo: "freud" },
      { texto: "Conectándolo con conceptos que ya entiendo.", psicologo: "jung" },
      { texto: "Con práctica, repetición y recompensas.", psicologo: "skinner" },
      { texto: "En un ambiente sin juicios donde pueda equivocarme.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "10. ¿Cuál de estas palabras te describe mejor?",
    opciones: [
      { texto: "Analítico", psicologo: "freud" },
      { texto: "Intuitivo", psicologo: "jung" },
      { texto: "Práctico", psicologo: "skinner" },
      { texto: "Empático", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "11. ¿Qué te da más miedo?",
    opciones: [
      { texto: "Perder el control de mis impulsos.", psicologo: "freud" },
      { texto: "No descubrir quién soy realmente.", psicologo: "jung" },
      { texto: "Perder mi rutina o estabilidad.", psicologo: "skinner" },
      { texto: "Que la gente no me acepte tal como soy.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "12. Cuando discutes con alguien...",
    opciones: [
      { texto: "Suelo sacar cosas del pasado.", psicologo: "freud" },
      { texto: "Intento ver el problema desde una perspectiva más elevada.", psicologo: "jung" },
      { texto: "Me retiro o busco una solución lógica rápida.", psicologo: "skinner" },
      { texto: "Intento ponerme en sus zapatos para entender cómo se siente.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "13. ¿Qué crees que forma la personalidad?",
    opciones: [
      { texto: "Conflictos internos no resueltos.", psicologo: "freud" },
      { texto: "La mezcla de nuestra introversión/extroversión.", psicologo: "jung" },
      { texto: "Nuestro entorno y las experiencias vividas.", psicologo: "skinner" },
      { texto: "Nuestra libertad de elegir quiénes queremos ser.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "14. El arte para ti es...",
    opciones: [
      { texto: "Una forma de canalizar deseos que no podemos cumplir.", psicologo: "freud" },
      { texto: "Una conexión directa con el alma de la humanidad.", psicologo: "jung" },
      { texto: "Una conducta aprendida que resulta agradable.", psicologo: "skinner" },
      { texto: "La expresión máxima y libre del ser humano.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "15. Ante un nuevo hábito (ej. hacer ejercicio), tú...",
    opciones: [
      { texto: "Averiguas por qué te autosaboteas para no ir.", psicologo: "freud" },
      { texto: "Buscas el significado espiritual del cuidado corporal.", psicologo: "jung" },
      { texto: "Llevas un registro y te premias si cumples.", psicologo: "skinner" },
      { texto: "Vas si te hace sentir bien contigo mismo.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "16. El amor de pareja se basa en...",
    opciones: [
      { texto: "Proyectar nuestras carencias en el otro.", psicologo: "freud" },
      { texto: "La unión de dos almas que se complementan.", psicologo: "jung" },
      { texto: "Intercambio de refuerzos positivos mutuos.", psicologo: "skinner" },
      { texto: "Aceptación, escucha activa y cariño sincero.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "17. ¿Cómo tomas decisiones importantes?",
    opciones: [
      { texto: "Analizando mis motivos más ocultos.", psicologo: "freud" },
      { texto: "Siguiendo mi intuición y presentimientos.", psicologo: "jung" },
      { texto: "Haciendo una lista de pros y contras.", psicologo: "skinner" },
      { texto: "Eligiendo lo que me haga sentir más auténtico.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "18. ¿Qué rol tiene el destino en tu vida?",
    opciones: [
      { texto: "No existe, solo es nuestro inconsciente actuando.", psicologo: "freud" },
      { texto: "Es real, la sincronicidad del universo nos guía.", psicologo: "jung" },
      { texto: "Es una ilusión, somos producto del azar y el entorno.", psicologo: "skinner" },
      { texto: "Nosotros creamos nuestro propio destino paso a paso.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "19. Si alguien tiene un mal comportamiento, es porque...",
    opciones: [
      { texto: "Tiene traumas no resueltos.", psicologo: "freud" },
      { texto: "Su 'sombra' está tomando el control.", psicologo: "jung" },
      { texto: "No ha tenido las consecuencias adecuadas.", psicologo: "skinner" },
      { texto: "Su entorno no le permitió desarrollarse sanamente.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "20. La clave de la felicidad es...",
    opciones: [
      { texto: "Hacer consciente lo inconsciente.", psicologo: "freud" },
      { texto: "Encontrar el equilibrio entre luz y oscuridad interior.", psicologo: "jung" },
      { texto: "Vivir en un entorno pacífico y predecible.", psicologo: "skinner" },
      { texto: "Ser genuino y amar sin condiciones.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "21. Cuando sientes ansiedad, tú...",
    opciones: [
      { texto: "Racionalizas todo para no sentir dolor.", psicologo: "freud" },
      { texto: "Meditas o buscas un espacio de soledad profunda.", psicologo: "jung" },
      { texto: "Tratas de distraerte con una actividad concreta.", psicologo: "skinner" },
      { texto: "Lo hablas con alguien en quien confías plenamente.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "22. En un grupo de personas, tú eres...",
    opciones: [
      { texto: "El que observa y analiza en silencio a los demás.", psicologo: "freud" },
      { texto: "El que tiene las conversaciones más raras y profundas.", psicologo: "jung" },
      { texto: "El organizador que mantiene a todos en orden.", psicologo: "skinner" },
      { texto: "El mediador al que todos le cuentan sus problemas.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "23. Si pudieras viajar en el tiempo, irías a...",
    opciones: [
      { texto: "Tu propia infancia para cambiar un momento clave.", psicologo: "freud" },
      { texto: "Una civilización antigua llena de mitos.", psicologo: "jung" },
      { texto: "Al futuro, para ver qué tecnología usamos.", psicologo: "skinner" },
      { texto: "A los años 60, en pleno movimiento hippie de paz y amor.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "24. ¿Cómo ves la espiritualidad o religión?",
    opciones: [
      { texto: "Una ilusión para calmar nuestros miedos.", psicologo: "freud" },
      { texto: "Una parte vital e innegable de la psique humana.", psicologo: "jung" },
      { texto: "Un sistema de control de conducta comunitaria.", psicologo: "skinner" },
      { texto: "Una forma hermosa de conectar con uno mismo y los demás.", psicologo: "rogers" }
    ]
  },
  {
    pregunta: "25. El legado que te gustaría dejar es...",
    opciones: [
      { texto: "Haber descubierto una gran verdad incómoda.", psicologo: "freud" },
      { texto: "Obras que inspiren misterio y conocimiento.", psicologo: "jung" },
      { texto: "Un sistema o invento que facilite la vida a todos.", psicologo: "skinner" },
      { texto: "Haber hecho sentir amados a quienes me rodearon.", psicologo: "rogers" }
    ]
  }
];