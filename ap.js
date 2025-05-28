var avehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
const agregarvehiculo = () => {
 let marca = document.getElementById('marca').value
 let modelo = document.getElementById('modelo').value
 let año = document.getElementById('año').value
 let costo = document.getElementById('costo').value
 let placa = document.getElementById('placa').value
 
 if (marca.trim() === "" || modelo.trim() === "" || año.trim() === "" || costo.trim() === "" || placa.trim() === "") {
  Swal.fire({
   title: "Error",
   text: "Faltan campos vacíos",
   icon: "error"
  });
  return;
 }
 
 let vehiculo = { marca, modelo, año, costo, placa };
 avehiculos.push(vehiculo);
 localStorage.setItem("vehiculos", JSON.stringify(avehiculos));
 
 limpiarCampos();
 cerrarmodal('exampleModal');
 refrescarTabla();
}

const limpiarCampos = () => {
 document.getElementById("marca").value = ""
 document.getElementById("modelo").value = ""
 document.getElementById("año").value = ""
 document.getElementById("costo").value = ""
 document.getElementById("placa").value = ""
}
const refrescarTabla = () => {
 avehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
 tablaHTML = "";
 index = 0;
 avehiculos.map(v => {
  tablaHTML += `
      <tr>
        <td>${v.marca}</td>
        <td>${v.modelo}</td>
        <td>${v.año}</td>
        <td>${v.costo}</td>
        <td>${v.placa}</td>
        <td>
        <button class="btn btn-danger" onclick="eliminarvehiculo(${index})">
        <i class="bi bi-trash"></i></button>
        
         <button class="btn btn-primary" onclick="editarvehiculo(${index})" data-bs-toggle="modal" data-bs-target="#editModal">
         <i class="bi bi-pencil-fill"></i></button>
        </td>
      </tr>
    `
  index++;
 });
 document.getElementById("listavehiculo").innerHTML = tablaHTML
}

const cerrarmodal = (modal) => {
 var myModalEl = document.getElementById(modal);
 var modal2 = bootstrap.Modal.getInstance(myModalEl)
 modal2.hide();
}

const eliminarvehiculo = (index) => {
 avehiculos = JSON.parse(localStorage.getItem("vehiculos")) || []
 const Sweet = Swal.mixin({
  customClass: {
   confirmButton: "btn btn-success mx-3",
   denyButton: "btn btn-danger"
  },
  buttonStyling: false
 });
 
 Sweet.fire({
  title: "quieres eliminar",
  showDenyButton: true,
  confirmButtonText: "SI",
  denyButtonText: 'NO'
 }).then((result) => {
  if (result.isConfirmed) {
   avehiculos.splice(index, 1)
   localStorage.setItem("vehiculos", JSON.stringify(avehiculos))
   refrescarTabla()
   Swal.fire("EXITO!!", "SE ELIMINO CORRECTAMENTE!!", "success");
  }
 });
}

const editarvehiculo = (index) => {
 avehiculos = JSON.parse(localStorage.getItem("vehiculos")) || []
 vehiculo = avehiculos[index]
 document.getElementById("emarca").value = vehiculo.marca
 document.getElementById("emodelo").value = vehiculo.modelo
 document.getElementById("eaño").value = vehiculo.año
 document.getElementById("ecosto").value = vehiculo.costo
 document.getElementById("eplaca").value = vehiculo.placa
 document.getElementById("index").value = index
}

const guardarvehiculo = () => {
 let marca = document.getElementById("emarca").value
 let modelo = document.getElementById("emodelo").value
 let año = document.getElementById("eaño").value
 let costo = document.getElementById("ecosto").value
 let placa = document.getElementById("eplaca").value
 let index = document.getElementById("index").value
 if (marca.trim() === "" || modelo.trim() === "" || año.trim() === "" || costo.trim() === "" || placa.trim() === "") {
  Swal.fire({
   title: "Error",
   text: "Faltan campos vacíos",
   icon: "error"
  });
  return;
 }
 
 let vehiculo = { marca, modelo, año, costo, placa };
 avehiculos[index] = vehiculo
 localStorage.setItem("vehiculos", JSON.stringify(avehiculos));
 limpiarCampos();
 cerrarmodal('editModal');
 refrescarTabla();
}

refrescarTabla();