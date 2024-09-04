document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("cuerpoTabla");

  let inicioRegistros = 1;
  let tamañoMaximoRegistros = 5;

  function obtenerCliente(inicioRegistros) {
    fetch(`http://www.proyectsenaha2024.somee.com/api/cliente`)
      .then((response) => response.json())
      .then((data) => {
        tabla.innerHTML = "";
        data.forEach((client) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                   <td class="text-center" >${client.IdCli}</td>
                   <td class="text-center" >${client.Nombres}</td>
                   <td class="text-center" >${client.Telefono}</td>
                   <td class="text-center" >${client.Correo}</td>
                   <td class="text-center" >${client.Ciudad}</td>
                   <td>
                      <button id="editar"  value=${client.IdCli} class="btn btn-sm btn-warning" >editar</button>
                      <button id="borrar"  value=${client.IdCli} class="btn btn-sm btn-danger" >eliminar</button>
                   </td>
               `;

          tabla.appendChild(row);

        });
        console.log(data);
      })
      .catch((error) =>
        console.error("Error al obtener datos de la API:", error)
      );
  }

  obtenerCliente(inicioRegistros);

  //-----------------------------------------------------------------------------------------------------//
  document.getElementById("paginaAnterior").addEventListener("click", () => {
    if (inicioRegistros > 1) {
      inicioRegistros--;
      obtenerCliente(inicioRegistros);
    }
  });
  //-----------------------------------------------------------------------------------------------------//

  document.getElementById("paginaSiguiente").addEventListener("click", () => {
    inicioRegistros++;
    obtenerCliente(inicioRegistros);
  });

  //-----------------------------------------------------------------------------------------------------//
  tabla.addEventListener("click", (event) => {
    if (event.target.id == "borrar") {
      const confirmacion = confirm(
        "¿Estás seguro de que deseas eliminar este registro?"
      );

      if (confirmacion == true) {
        fetch(`http://www.proyectsenaha2024.somee.com/api/cliente/${event.target.value}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al eliminar cliente");
            }

            event.target.closest("tr").remove();
          })
          .catch((error) => console.error("Error al eliminar cliente:", error));
      }
    } else if (event.target.id == "editar") {
      window.location.href = "../view/editar.html?id=" + event.target.value; // Agrega el parámetro a la URL
    }


  });
});
