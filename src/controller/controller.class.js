const Category = require("../model/category.class.js");
const Product = require("../model/product.class.js");
const Store = require("../model/store.class.js");
const View = require("../view/view.class.js");

class Controller {
    constructor() {
        this.store = new Store();
        this.view = new View();
    }

    init() {}

    addProductToStore(payload) {
        const prod = this.store.addProduct(payload);
        this.store.products.forEach((prod) => console.log(prod));
        this.view.mostrarProducto(prod,this.deleteProductFromStore.bind(this));
        const totalImport = this.store.totalImport();
        this.view.mostrarImporte(totalImport);
    }
    deleteProductFromStore(id) {
        const borrar=parseInt(id)
        const producto=this.store.delProduct(borrar)
        const prod = this.view.eliminarProducto(borrar);
    }
    deleteCategoryFromStore(id) {
        //cambiar
        const borrar=parseInt(id)
        const categ=this.store.delCategory(borrar)
        this.view.eliminarCategoria(categ)
        // const cat = this.store.delCategory(id);
    }
    addCategoryToStore(payload) {
        const cat = this.store.addCategory(payload.name, payload.descripcion);
        this.store.categories.forEach((cat) => console.log(cat));
        this.view.mostrarCategoria(cat);
    }
    modifyProductToStore(payload){
        const prodModificado = this.store.modificarProducto(payload);
        this.view.mostrarProductoModificado(prodModificado);  
        const totalImport = this.store.totalImport();
        this.view.mostrarImporte(totalImport);      
    }
}

module.exports = Controller;
