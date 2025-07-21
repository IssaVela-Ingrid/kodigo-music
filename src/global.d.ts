declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Si en el futuro usas SCSS modules, también puedes añadirlo aquí:
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Si usas imágenes, puedes añadir esto para que TypeScript las reconozca al importar:
declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.svg' {
  const value: string;
  export default value;
}
// etc.