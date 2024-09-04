document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("cuerpoTabla");

  let inicioRegistros = 1;
  let tamañoMaximoRegistros = 5;

  function obtenerAsesores(inicioRegistros) {
    fetch(`http://www.proyectsenaha2024.somee.com/api/asesor`)
      .then((response) => response.json())
      .then((data) => {
        tabla.innerHTML = "";
        data.forEach((asesor) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                   <td class="text-center" >${asesor.IdAse}</td>
                   <td class="text-center" >${asesor.Nombres}</td>
                   <td class="text-center" >${asesor.FechaNacimiento}</td>
                   <td class="text-center" >${asesor.Telefono}</td>
                   <td class="text-center" >${asesor.Correo}</td>
                   <td class="text-center" >${asesor.Ciudad}</td>
                   <td class="text-center" >${asesor.FechaIngreso}</td>
                   <td>
                    <button id="editar" value=${asesor.IdAse} class="btn btn-sm btn-warning" >editar</button>
                    <button id="borrar"  value=${asesor.IdAse} class="btn btn-sm btn-danger" >eliminar</button>
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

  obtenerAsesores(inicioRegistros);

  //-----------------------------------------------------------------------------------------------------//
  document.getElementById("paginaAnterior").addEventListener("click", () => {
    if (inicioRegistros > 1) {
      inicioRegistros--;
      obtenerAsesores(inicioRegistros);
    }
  });
  //-----------------------------------------------------------------------------------------------------//

  document.getElementById("paginaSiguiente").addEventListener("click", () => {
    inicioRegistros++;
    obtenerAsesores(inicioRegistros);
  });

  //-----------------------------------------------------------------------------------------------------//
  tabla.addEventListener("click", (event) => {
    if (event.target.id == "borrar") {
      const confirmacion = confirm(
        "¿Estás seguro de que deseas eliminar este registro?"
      );

      if (confirmacion == true) {
        fetch(`http://www.proyectsenaha2024.somee.com/api/asesor/${event.target.value}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al eliminar asesor");
            }

            event.target.closest("tr").remove();
          })
          .catch((error) => console.error("Error al eliminar asesor:", error));
      }
    } else if (event.target.id == "editar") {
      window.location.href = "../view/editar.html?id=" + event.target.value; // Agrega el parámetro a la URL
    }


  });
});
