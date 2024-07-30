export interface Skill {
    title: string;
    description: string;
    level: string;
  }
  
  export const skills: Skill[] = [
    { title: 'React.js', description: 'Experto en la construcción de interfaces de usuario y componentes reutilizables.', level: '95' },
    { title: 'Next.js', description: 'Framework para React con renderizado del lado del servidor y generación de sitios estáticos.', level: '95'  },
    { title: 'TypeScript', description: 'Superset de JavaScript que añade tipos estáticos para mejorar el desarrollo y la calidad del código.' , level: '89' },
    { title: 'JavaScript', description: 'Lenguaje de programación principal para desarrollo web interactivo.', level: '89'  },
    { title: 'Tailwind CSS', description: 'Framework de utilidades CSS para crear diseños modernos y responsivos.' , level: '80' },
    { title: 'CSS', description: 'Estilo y diseño de páginas web, incluyendo técnicas avanzadas como flexbox y grid.', level: '80'  },
    { title: 'Node.js', description: 'Entorno de ejecución para JavaScript en el servidor.', level: '70'  },
    { title: 'Express.js', description: 'Framework para Node.js que facilita el desarrollo de aplicaciones web.', level: '75'  },
    { title: 'MongoDB', description: 'Base de datos NoSQL para almacenar datos en formato JSON.', level: '75'  },
    { title: 'PostgreSQL', description: 'Base de datos relacional SQL con características avanzadas.', level: '80'  },
    { title: 'Mongoose', description: 'Biblioteca para MongoDB en Node.js que proporciona una solución basada en esquemas.' , level: '75' },
    { title: 'Git', description: 'Sistema de control de versiones para gestionar el código fuente.' , level: '95' },
    { title: 'Scrum', description: 'Metodología ágil para la gestión de proyectos y desarrollo colaborativo.' , level: '100' },
  ];