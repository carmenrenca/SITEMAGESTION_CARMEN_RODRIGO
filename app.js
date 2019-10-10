// Initialize Cloud Firestore 
//inicializamos la base datos 
firebase.initializeApp({
  apiKey: "AIzaSyCz-6cHppdhMsK2hEhVhiLqTgwiQfnPSWc",
      authDomain: "gestion-factura.firebaseapp.com",
 projectId: "gestion-factura"
});
//creamos una variable donde guardaremos la funcion de la BD para poder hacer consultas
var db = firebase.firestore();
//con esta funcion vamos guardando a los usuarios que creemos en la BD concretamente en la colecion cliente
//le pasamos le JSON con los datos recogidos de los inputs
function guardarcliente(){


var nombre = document.getElementById('nombre').value;
var apellido = document.getElementById('apellido').value;
var direccion = document.getElementById('direccion').value;
var telefono = document.getElementById('telefono').value;
var email = document.getElementById('email').value;
var fecha = document.getElementById('fecha').value;
var dni= document.getElementById('dni').value;
if(nombre==""){
	alert("Tienes que poner un nombre");
	return false;
}else if(apellido.length==""){
	alert("Tienes que poner un apellido");
	return false;
}else if(direccion.lenght==""){
	alert("Tienes que poner una direccion");
	return false;

}else if(email.lenght==""){
	alert("Tienes que poner un email");
	return false;
}else if(fecha.lenght==""){
	alert("Tienes que poner una direccion");
	return false;
}else if(dni.lenght=="" ){
	alert("Tienes que poner un DNI correcto	");
	return false;
}else{
	db.collection("clientes").add({

    nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    telefono: telefono,
    email: email,
    fecha: fecha,
    dni: dni
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

}
	



//selecionamos todos los cliente en la colecion para poder visualizarlos todos
//para ello vamos a utlizar un forEach para recorrer
//onSnashot() esto  va ha estar escuchando cada vez que se haga un cambio a la base de datos 
//y lo va a reflejar en nuestra web
//creamos los botones eliminar y editar que se dirirán a sus correspondientes metodos
var tablacli= document.getElementById('tablacliente');

db.collection("clientes").onSnapshot((querySnapshot) => {
	//limpiamos la tabla 

	tablacli.innerHTML='';

    querySnapshot.forEach((doc) => {

    	tablacli.innerHTML +=`
    	<tr>
    		<td>${doc.id }  </td>
    		<td>${doc.data().nombre }  </td>
    		<td>${doc.data().apellido}</td>
    		<td>${doc.data().direccion}</td>
    		<td>${doc.data().telefono}</td>
    		<td>${doc.data().email}</td>
    		<td>${doc.data().fecha}</td>
            <td>${doc.data().dni}</td>
    	      <td> <button type="button" class="btn btn-danger" onclick="eliminaruser('${doc.id }')">Eliminar</button></td>
    	       <td><button type="button" class="btn btn-info" onclick="editaruser('${doc.id }','${doc.data().nombre}','${doc.data().apellido}','${doc.data().direccion}','${doc.data().telefono}' ,'${doc.data().email}','${doc.data().fecha}','${doc.data().dni}')" data-toggle="modal" data-target="#miModal">Editar</button></td>
    	</tr>
    	`
    


      
    });

});


//borrar usuarios mediante la id que le pasemos 
function eliminaruser(iduser){
db.collection("clientes").doc(iduser).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});


}

//editar clientes
//al pulsar el boton editar que creamos antes me va ha coger todos los datos de 
//esa fila en concreto, y los paso por parametro 

function editaruser(id,nombre, apellido, direccion,telefono, email, fecha, dni){
//voy a pasar toda la informacion de esa fila a mi formulario
	document.getElementById('nombre').value = nombre;
	document.getElementById('apellido').value = apellido;
	document.getElementById('direccion').value = direccion;
	document.getElementById('telefono').value = telefono;
	document.getElementById('email').value = email;
	document.getElementById('fecha').value = fecha;
	document.getElementById('dni').value = dni;
	//obtenemos el boton y  vamos a cambiarle el nombre por 'editar'
	var a = document.getElementById('boton');
	var b = document.getElementById('botonedit');
	a.style.display='none';
	b.style.display = '';
	//limpiar formulario
	
	b.onclick= function(){
		console.log("entroo")
    //guardo la colección cliente con esa id en concreto
		var washingtonRef = db.collection("clientes").doc(id);
	
var nombre=  document.getElementById('nombre').value;
var apellido=	document.getElementById('apellido').value;
var direccion=	document.getElementById('direccion').value;
var telefono=	document.getElementById('telefono').value;
var email=	document.getElementById('email').value;
var fecha=	document.getElementById('fecha').value;
var dni=	document.getElementById('dni').value;
//despues la uso para actualizar esa coleccion en concreto con estos nuevos valores 
	return washingtonRef.update({
	 nombre: nombre,
    apellido: apellido,
    direccion: direccion,
    telefono: telefono,
    email: email,
    fecha: fecha,
    dni: dni
	})
  //luego limpio los imput para poder volver a editar 
	.then(function() {
			document.getElementById('nombre').value ='';
	document.getElementById('apellido').value = '';
	document.getElementById('direccion').value = '';
	document.getElementById('telefono').value = '';
	document.getElementById('email').value = '';
	document.getElementById('fecha').value = '';
	document.getElementById('dni').value = '';
		b.innerHTML='Guardar';

	    console.log("Document successfully updated!");

 $("#miModal").modal('hide');//ocultamos el modal

  $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
  $('.modal-backdrop').remove();//eliminamos el backdrop del modal
  //todo esto lo hago para poder poner le modal limpio sin datos 
a.style.display='';
  b.style.display = 'none';
	})
	.catch(function(error) {
	  
	    console.error("Error updating document: ", error);
	});
	}
	
	}


function buscacliente(){

	
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tb");
   console.log(table);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  
}
}


//////////////////////////////////ARTICULOS\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\



//agregar articulo
function guarda_articulos(){
var nombre = document.getElementById('nombre').value;
var precio = document.getElementById('precio').value;
var stock = document.getElementById('stock').value;
var descripcion = document.getElementById('descripcion').value;

if(nombre==""){
	alert("Tienes que poner un nombre");
	return false;
}else if(precio.length==""){
	alert("Tienes que poner un precio al artículo");
	return false;
}else if(stock.lenght==""){
	alert("Tienes que poner un numero de stock");
	return false;

}else if(descripcion.lenght==""){
	alert("Debes de poner una descripción al artículo");
	return false;
}else{
	db.collection("articulos").add({

    nombre: nombre,
    precio: precio,
    stock: stock,
    descripcion: descripcion
   
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}

}
//saco en la tabla todos los articulos de la BD y creamos los botones editar y eliminar
	
var tablaart= document.getElementById('tablaarticulo');

db.collection("articulos").onSnapshot((querySnapshot) => {
	//limpiamos la tabla 

	tablaart.innerHTML='';

    querySnapshot.forEach((doc) => {

    	tablaart.innerHTML +=`
    	<tr>
    		<td>${doc.id }  </td>
    		<td>${doc.data().nombre }  </td>
    		<td>${doc.data().precio}</td>
    		<td>${doc.data().stock}</td>
    			<td>${doc.data().descripcion}</td>
    		
    	      <td> <button type="button" class="btn btn-danger" onclick="elimina_articulos('${doc.id }')">Eliminar</button></td>
    	       <td><button type="button" class="btn btn-info" onclick="editar_user('${doc.id }','${doc.data().nombre}','${doc.data().precio}','${doc.data().stock}','${doc.data().descripcion}')" data-toggle="modal" data-target="#miModalart">Editar</button></td>
    	</tr>
    	`
    


      
    });

});

function cerrarmodal(){
  document.getElementById('nombre').value ='';
  document.getElementById('apellido').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('email').value = '';
  document.getElementById('fecha').value = '';
  document.getElementById('dni').value = '';
    

}

function busca_articulo(){

	
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("tableart");
   console.log(table);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  
}
}

//borrar articulos por id
function elimina_articulos(iduser){
db.collection("articulos").doc(iduser).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});


}

//editar articulos


function editar_user(id,nombre, precio, stock,descripcion){
//voy a pasar toda la informacion de esa fila a mi formulario
console.log(descripcion);
	document.getElementById('nombre').value = nombre;
	document.getElementById('precio').value = precio;
	document.getElementById('stock').value = stock;
	document.getElementById('descripcion').value = descripcion;

	//obtenemos el boton y  vamos a cambiarle el nombre por 'editar'
	var a = document.getElementById('boton');
	var b = document.getElementById('botonedit');
	a.style.display='none';
	b.style.display = '';
	//limpiar formulario
	
	b.onclick= function(){
	
		var washingtonRef = db.collection("articulos").doc(id);
	
var nombre=  document.getElementById('nombre').value;
var precio=	document.getElementById('precio').value;
var stock=	document.getElementById('stock').value;
var descripcion=	document.getElementById('descripcion').value;


	return washingtonRef.update({
	 nombre: nombre,
   precio: precio,
    stock: stock,
    descripcion: descripcion
	})
	.then(function() {
			document.getElementById('nombre').value ='';
	document.getElementById('precio').value = '';
	document.getElementById('stock').value = '';
	document.getElementById('descripcion').value = '';

		b.innerHTML='Guardar';

	    console.log("Document successfully updated!");
 $("#miModalart").modal('hide');//ocultamos el modal

  $('body').removeClass('modal-open');//eliminamos la clase del body para poder hacer scroll
  $('.modal-backdrop').remove();//eliminamos el backdrop del modal
a.style.display='';
	b.style.display = 'none';
	})
	.catch(function(error) {
	  
	    console.error("Error updating document: ", error);
	});
	}
	
	}

	/////////////////////////////////FATURA\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
 mostrarfactura();
//le pasamos al input fecha, la fecha de hoy y la hora actual que se ha creado la factura
var d = new Date();
var dia=d.getDate();
var mes=d.getMonth();
document.getElementById('fecha').value=`${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
///inicializar un numero de factura 
document.getElementById('Nfactura').value=Math.floor(Math.random() * 100000)+100; 
	//mostrar  facturas de la base de datos
  function mostrarfactura(){
    var tablafac= document.getElementById('tablafacturaa');


db.collection("factura").onSnapshot((querySnapshot) => {
  //limpiamos la tabla 
var id_facutura= document.getElementById('Nfactura');
  tablafac.innerHTML='';

    querySnapshot.forEach((doc) => {

      tablafac.innerHTML +=`
      <tr>
      
          <td>${doc.data().id_factura}</td>
        <td>${doc.data().id_cliente}</td>
         <td>${doc.data().fecha }  </td>
             <td><button data-toggle="modal" data-target="#modalfactura" onclick=editarfactura('${doc.data().id_factura}') class='btn btn-info'>Editar</button></td>
            
      </tr>
      `
    


      
    });

});
  }



function busca_factura(){

	
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInputfac");
  filter = input.value.toUpperCase();
  table = document.getElementById("tablef");
   console.log(table);
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  
}
}

//Editar una factura en concreto , (esta función esta todavía por terminar)
///////////////////////////////////////////////////////////////////////////////////////////////
function editarfactura(id){
console.log(id);
  var c;
  db.collection("factura").where("id_factura", "==", id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
   document.getElementById('Nfacturaedit').value=doc.data().id_factura;
   document.getElementById('fechaedit').value=doc.data().fecha;
   document.getElementById('dniedit').value=doc.data().id_cliente;

    console.log(doc.data().fecha);
    
        });
    })

    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
//sacamos la informacion de cliente segun el cliente que hayamos sacado antes
var cl="3";
cl=document.getElementById('dniedit').value;
console.log(cl);
      db.collection("clientes").where("dni", "==", cl)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
   document.getElementById('nombreedit').value=doc.data().nombre;
   document.getElementById('apellidoedit').value=doc.data().apellido;
   document.getElementById('telefonoedit').value=doc.data().telefono;
document.getElementById('direccionedit').value=doc.data().direccion;
document.getElementById('emailedit').value=doc.data().email;
    console.log(doc.data().fecha);
    
        });
    })

    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });

}

//mostrar clientes para crear la factura

var cl= document.getElementById('sele');

db.collection("clientes").onSnapshot((querySnapshot) => {
  //limpiamos la tabla 

  cl.innerHTML='';

    querySnapshot.forEach((doc) => {

     cl.innerHTML +=`
    
     <option>${doc.data().dni}  </option>
           
      </tr>
      `
     //<option>${doc.data().nombre } ${doc.data().apellido} </option>


      
    });

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Funcion para devolverme los datos del cliente en la factura despues de elegir su DNI
function funcionselectcliente(){
  var cod = document.getElementById("sele").value;
var f = new Date();
console.log(cod);

db.collection("clientes").where("dni", "==", cod)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
        document.getElementById('nombre').value= doc.data().nombre;
        document.getElementById('apellido').value= doc.data().apellido;
          document.getElementById('telefono').value= doc.data().telefono;
            document.getElementById('direccion').value= doc.data().direccion;
              document.getElementById('email').value= doc.data().email;


        });
    })

    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}





//////mostrar los articulos del sistema

var cla= document.getElementById('artf');

db.collection("articulos").onSnapshot((querySnapshot) => {
  //limpiamos la tabla 

  cla.innerHTML='';

    querySnapshot.forEach((doc) => {

     cla.innerHTML +=`
    
     <option>${doc.data().nombre}  </option>
           
      </tr>
      `


      
    });

});
//funcion que me saca el codigo y el precio dependiendo de que producto sea
function funcionmostrardatoart(){
  var cod = document.getElementById("artf").value;

console.log(cod);

db.collection("articulos").where("nombre", "==", cod)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for qu ery doc snapshots
        document.getElementById('codigo').value= doc.id;
        document.getElementById('precio').value= doc.data().precio;
        



        });
    })

    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}


//me añadirá una linea en mi factura con el producto y todos sus datos 
function anadir_art(){
  
  var codigo =document.getElementById('codigo').value;
  var precio=document.getElementById('precio').value;
  var nombre= document.getElementById('artf').value
  var cantidad= document.getElementById('cantidad').value
    var descuento= document.getElementById('descuento').value;

 var preciodescuento=((precio*cantidad)*descuento)/100;
var preciototal=(precio*cantidad)-preciodescuento;
 var sumatotal=0;


//vamos a añadir nuestor articulo a la factura para eso vamos a ir recorriendo la tabla

var fila="<tr><td>"+codigo+"</td><td>"+nombre+"</td><td>"+precio+"</td><td>"+cantidad+"</td><td>"+preciototal+"</td><td><button class='btn btn-danger' onclick='eliminarlineadefactura('+${codigo}')'>Eliminar</button></td><td><button class='btn btn-info'>Editar</button></td></tr>";
var total="<tr><td>"+"</td><td>"+"</td><td>"+"</td><td>"+'SUBTOTAL €'+"</td><td>"+sumatotal+"</td></tr>";
  var btn = document.createElement("TR");
     btn.innerHTML=fila;
    document.getElementById("lineaf").appendChild(btn);
 //limpio los imput 
 document.getElementById('codigo').value='';
 document.getElementById('precio').value='';
 //hago las operaciones en esta función
calculototal(preciototal);
//guardo mi producto elegido en la BD
guardar_linea(codigo, precio,nombre,cantidad,preciototal,sumatotal);
}
var cuenta = [];
function calculototal(n){
//SUBTOTAL
cuenta.push(n);
 var sumatotal=0;
   //con este for vamos a ir sumando todos los precios de los articulos que vayamos añadiendo
for (var i=0; i<cuenta.length; i++) { sumatotal = sumatotal + cuenta[i] ; }
 
  console.log(sumatotal);

document.getElementById('preciototal').value=sumatotal;

///IVA
var iva;
iva=sumatotal*0.18;

document.getElementById('iva').value=iva;
//TOTAL
document.getElementById('total').value=iva+sumatotal;
}




//////////////AÑADIR ARTICULO A FIREBASE\\\\\\\\\\\\\\\\\\\\\º

//guardo la linea de factura en detalle_factura referenciado con el id de esa factura en concreto
function guardar_linea(codigo, precio,nombre,cantidad,preciototal,sumatotal){
  var id_factura=document.getElementById('Nfactura').value;
  db.collection("detalle_factura").add({
     objectExample: {
        nombre: nombre,
        cantidad:cantidad,
        precio:precio,
        preciototal:preciototal},
    id_articulo:codigo,
    id_factura:id_factura
   
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
}
//funcion que cuando pulse el boton guardar va a guardarme la fecha, el dni del cliente y el id de la factura
//en la base de datos
function enviarfactura(){
var fecha= document.getElementById('fecha').value
var idF= document.getElementById('Nfactura').value
var id_cliente= document.getElementById('sele').value
 db.collection("factura").add({
   
        fecha: fecha,
        id_cliente:id_cliente,
        id_factura:idF
   
   
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);

})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

}
