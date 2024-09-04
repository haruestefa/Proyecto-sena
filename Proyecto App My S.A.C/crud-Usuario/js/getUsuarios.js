document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("cuerpoTabla");

  let inicioRegistros = 1;
  let tamañoMaximoRegistros = 5;

  function obtenerUsuarios(inicioRegistros) {
    fetch(`http://www.proyectsenaha2024.somee.com/api/usuario`)
      .then((response) => response.json())
      .then((data) => {
        tabla.innerHTML = "";
        data.forEach((user) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                   <td class="text-center" >${user.IdUsu}</td>
                   <td class="text-center" >${user.Nombres}</td>
                   <td class="text-center" >${user.FechaNacimiento}</td>
                   <td class="text-center" >${user.Telefono}</td>
                   <td class="text-center" >${user.Correo}</td>
                   <td class="text-center" >${user.Ciudad}</td>
                   <td class="text-center" >${user.FechaIngreso}</td>
                   <td>
                    <button id="editar" value=${user.IdUsu} class="btn btn-sm btn-warning" >editar</button>
                    <button id="borrar"  value=${user.IdUsu} class="btn btn-sm btn-danger" >eliminar</button>
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

  obtenerUsuarios(inicioRegistros);

  //-----------------------------------------------------------------------------------------------------//
  document.getElementById("paginaAnterior").addEventListener("click", () => {
    if (inicioRegistros > 1) {
      inicioRegistros--;
      obtenerUsuarios(inicioRegistros);
    }
  });
  //-----------------------------------------------------------------------------------------------------//

  document.getElementById("paginaSiguiente").addEventListener("click", () => {
    inicioRegistros++;
    obtenerUsuarios(inicioRegistros);
  });

  //-----------------------------------------------------------------------------------------------------//
  tabla.addEventListener("click", (event) => {
    if (event.target.id == "borrar") {
      const confirmacion = confirm(
        "¿Estás seguro de que deseas eliminar este registro?"
      );

      if (confirmacion == true) {
        fetch(`http://www.proyectsenaha2024.somee.com/api/usuario/${event.target.value}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Error al eliminar el usuario");
            }

            event.target.closest("tr").remove();
          })
          .catch((error) => console.error("Error al eliminar usuario:", error));
      }
    } else if (event.target.id == "editar") {
      window.location.href = "../view/editar.html?id=" + event.target.value; // Agrega el parámetro a la URL
    }


  });
});
