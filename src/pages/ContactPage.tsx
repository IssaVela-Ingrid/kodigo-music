import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'; // Importa SubmitHandler
import '../styles/App.css';

// 1. Definimos una interfaz para los tipos de los datos del formulario
interface ContactFormInputs {
  name: string;
  email: string;
  message: string;
}

function ContactPage() {
  // 2. Usamos la interfaz ContactFormInputs con useForm
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormInputs>();

  // 3. Tipamos la función onSubmit con SubmitHandler
  const onSubmit: SubmitHandler<ContactFormInputs> = (data) => {
    console.log("Datos del formulario enviados:", data);
    alert(`Mensaje enviado por ${data.name}! Revisa la consola para ver los datos.`);
    reset();
  };

  return (
    <div className="page-content contact-page">
      <h1>Contáctanos</h1>
      <p>¿Tienes preguntas o comentarios? Envíanos un mensaje.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Tu Nombre:</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "El nombre es obligatorio", minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" } })}
          />
          {errors.name && <p className="error-message">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Tu Correo Electrónico:</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Formato de correo electrónico inválido"
              }
            })}
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Tu Mensaje:</label>
          <textarea
            id="message"
            rows={5} // `rows` es un número en React
            {...register("message", { required: "El mensaje es obligatorio", minLength: { value: 10, message: "El mensaje debe tener al menos 10 caracteres" } })}
          ></textarea>
          {errors.message && <p className="error-message">{errors.message.message}</p>}
        </div>

        <button type="submit" className="submit-button">Enviar Mensaje</button>
      </form>
    </div>
  );
}

export default ContactPage;