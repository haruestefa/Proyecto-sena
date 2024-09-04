document.addEventListener("DOMContentLoaded", () => {
  const btnEditar = document.getElementById("editar");

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  const nombre = document.getElementById("nombre");
  const telefono = document.getElementById("telefono");
  const correo = document.getElementById("correo");
  const ciudad = document.getElementById("ciudad");


  fetch("http://www.proyectsenaha2024.somee.com/api/cliente/" + id)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((client) => {
        nombre.value = client.Nombres;
        telefono.value = client.Telefono;
        correo.value = client.Correo;
        ciudad.value = client.Ciudad;

      });
    })
    .catch((error) =>
      console.error("Error al obtener datos de la API:", error)
    );

  btnEditar.addEventListener("click", () => {

    const data = {
      "IdCli": id,
      "Nombres": nombre.value,
      "Telefono": telefono.value,
      "Correo": correo.value,
      "Ciudad": ciudad.value,

    }


    fetch("http://www.proyectsenaha2024.somee.com/api/cliente/", {
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
