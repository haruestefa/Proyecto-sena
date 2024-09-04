document.addEventListener("DOMContentLoaded", () => {
  const btnEditar = document.getElementById("editar");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const nombre = document.getElementById("nombre");
  const FechaNacimiento = document.getElementById("FechaNacimiento");
  const telefono = document.getElementById("telefono");
  const correo = document.getElementById("correo");
  const ciudad = document.getElementById("ciudad");
  const fecha = document.getElementById("fecha");


  fetch("http://www.proyectsenaha2024.somee.com/api/asesor/" + id)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((asesor) => {
        nombre.value = asesor.Nombres;
        FechaNacimiento.value = asesor.FechaNacimiento;
        telefono.value = asesor.Telefono;
        correo.value = asesor.Correo;
        ciudad.value = asesor.Ciudad;
        fecha.value = asesor.FechaIngreso;

      });
    })
    .catch((error) =>
      console.error("Error al obtener datos de la API:", error)
    );

  btnEditar.addEventListener("click", () => {

    const data = {
      "IdAse": id,
      "Nombres": nombre.value,
      "FechaNacimiento": FechaNacimiento.value,
      "Telefono": telefono.value,
      "Correo": correo.value,
      "Ciudad": ciudad.value,
      "FechaIngreso": fecha.value
    }


    fetch("http://www.proyectsenaha2024.somee.com/api/asesor/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {

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
});
