'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')

const myController = new Controller()
myController.init()

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const name = document.getElementById('newprod-name').value
    const price = parseInt(document.getElementById('newprod-price').value)
    const category = parseInt(document.getElementById('newprod-selcat').value)
    const units = parseInt(document.getElementById('newprod-units').value)   
    // ...
    const idProd = document.getElementById('newprod-id').value; 
    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    if(!document.getElementById("new-prod").checkValidity()){
      return
    }
    if(idProd){
        //modificar 
        let id=document.getElementById('newprod-id').value;
        myController.modifyProductToStore({id, name, category, price, units })
    }else{
      myController.addProductToStore({ name, category, price, units })
    }
    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // ) 
  })

  document.getElementById("tab-producto").addEventListener("click", () => {
    document.getElementById("almacen").classList.remove("hide")
    document.getElementById("form-prod").classList.add("hide")
    document.getElementById("form-categoria").classList.add("hide")
   });
   document.getElementById("tab-addProducto").addEventListener("click", () => {
    document.getElementById("almacen").classList.add("hide")
    document.getElementById("form-prod").classList.remove("hide")
    document.getElementById("form-categoria").classList.add("hide")
   });
   document.getElementById("tab-addCategoria").addEventListener("click", () => {
    document.getElementById("almacen").classList.add("hide")
    document.getElementById("form-prod").classList.add("hide")
    document.getElementById("form-categoria").classList.remove("hide")
   });

  document.getElementById('new-cat').addEventListener('submit', (event) => {
    event.preventDefault()

    // Aquí el código para obtener los datos del formulario
    const name = document.getElementById('newcat-name').value
    const descripcion = document.getElementById('newcat-desc').value   
    // ...
    
    // Aquí llamamos a la función del controlador que añade productos (addProductToStore)
    // pasándole como parámetro esos datos
    myController.addCategoryToStore({ name, descripcion })   
    // Sintaxis de ES2015 que equivale a 
    //
    // myController.addProductToStore(
    //   { 
    //     name: name,
    //     price: price 
    //   }
    // ) 
  })

  document.getElementById('del-cat').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.deleteCategoryFromStore(document.getElementById('del-cat-input').value)      
  })
})