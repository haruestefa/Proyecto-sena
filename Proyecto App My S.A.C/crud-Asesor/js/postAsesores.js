document.addEventListener("DOMContentLoaded", () => {

  const registrar = document.getElementById("registrar");

  registrar.addEventListener("click", (e) => {
    const IdAse = document.getElementById("idase").value;
    const Nombres = document.getElementById("nombre").value;
    const FechaNacimiento = document.getElementById("FechaNacimiento").value;
    const Telefono = document.getElementById("telefono").value;
    const Correo = document.getElementById("correo").value;
    const Ciudad = document.getElementById("ciudad").value;
    const Fecha = document.getElementById("fecha").value;

    const data = {
      IdAse: IdAse,
      nombres: Nombres,
      fechanacimiento: FechaNacimiento,
      telefono: Telefono,
      correo: Correo,
      ciudad: Ciudad,
      fecha: Fecha
    }

    fetch("http://www.proyectsenaha2024.somee.com/api/asesor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => {
        // Verificar si la respuesta es exitosa (código de estado 200)
        if (response.ok) {
          console.log("Datos enviados correctamente");

          window.location.href = "../view/index.html"

        } else {
          console.error("Error al enviar la solicitud:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
      });
  });


})

