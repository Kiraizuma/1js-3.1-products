const Category = require("../model/category.class.js");
const Product = require("../model/product.class.js");
const Store = require("../model/store.class.js");
const View = require("../view/view.class.js");

class Controller {
    constructor() {
        this.store = new Store();
        this.view = new View();
    }

    init() {
        this.setListeners();
    }

    setListeners() {
        const inputName = document.getElementById("newprod-name");
        inputName.addEventListener("blur", () => this.validateName(inputName));

        const catName = document.getElementById("newcat-name");
        catName.addEventListener("blur", () => this.validateCat(catName));

        const inputUnits = document.getElementById("newprod-units");
        inputUnits.addEventListener("blur", () => this.validateUnits(inputUnits));

        const inputPrice = document.getElementById("newprod-price");
        inputPrice.addEventListener("blur", () => this.validatePrice(inputPrice));

        const inputSelcat = document.getElementById("newprod-selcat");
        inputSelcat.addEventListener("blur", () => this.validateSelcat(inputSelcat));

        document.getElementById('new-prod').addEventListener('submit', (event) => {
            this.validateName(inputName);
            this.validateCat(catName);
            this.validatePrice(inputPrice);
            this.validateUnits(inputUnits);
            this.validateSelcat(inputSelcat);
        })

       
    }

    validateSelcat(inputSelcat){
        inputSelcat.nextElementSibling.textContent = inputSelcat.validationMessage;

    }

    validateName(inputNameMet) {
        if (this.store.productNameExist(inputNameMet.value)) {
            inputNameMet.setCustomValidity("Este producto ya existe");
        } else {
            inputNameMet.setCustomValidity("");
        }
        inputNameMet.nextElementSibling.textContent = inputNameMet.validationMessage;
    }

    validateCat(inputCatMet) {
        inputCatMet.nextElementSibling.textContent = inputCatMet.validationMessage;
    }

    validatePrice(inputPriceMet) {

        inputPriceMet.nextElementSibling.textContent = inputPriceMet.validationMessage;

    }

    validateUnits(inputUnitsMet) {
        inputUnitsMet.nextElementSibling.textContent = inputUnitsMet.validationMessage;
    }

    addProductToStore(payload) {
        const prod = this.store.addProduct(payload);
        this.store.products.forEach((prod) => console.log(prod));
        this.view.mostrarProducto(prod, this.deleteProductFromStore.bind(this));
        const totalImport = this.store.totalImport();
        this.view.mostrarImporte(totalImport);
    }
    deleteProductFromStore(id) {
        const borrar = parseInt(id);
        const producto = this.store.delProduct(borrar);
        const prod = this.view.eliminarProducto(borrar);
    }
    deleteCategoryFromStore(id) {
        //cambiar
        const borrar = parseInt(id);
        const categ = this.store.delCategory(borrar);
        this.view.eliminarCategoria(categ);
        // const cat = this.store.delCategory(id);
    }
    addCategoryToStore(payload) {
        const cat = this.store.addCategory(payload.name, payload.descripcion);
        this.store.categories.forEach((cat) => console.log(cat));
        this.view.mostrarCategoria(cat);
    }
    modifyProductToStore(payload) {
        const prodModificado = this.store.modificarProducto(payload);
        this.view.mostrarProductoModificado(prodModificado);
        const totalImport = this.store.totalImport();
        this.view.mostrarImporte(totalImport);
    }
}

module.exports = Controller;
