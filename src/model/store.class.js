const Category = require("./category.class");
const Product = require("./product.class");

// Aquí la clase Store
class Store {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.products = [];
        this.categories = [];
    }

    getCategoryById(id) {
        let cat = this.categories.find((thing) => thing.id === id);
        if (cat) {
            return cat;
        }
        throw "Esta categoria no existe";
    }

    getCategoryByName(name) {
        let cat = this.categories.find((thing) => thing.name.toUpperCase() === name.toUpperCase());
        if (cat) {
            return cat;
        }
        throw "Este nombre no existe";
    }

    getProductById(id) {
        let product = this.products.find((thing) => thing.id === id);
        if (product) {
            return product;
        }
        throw "Esta producto no existe";
    }

    getProductsByCategory(id) {
        return this.products.filter((thing) => thing.category === id);
    }

    addCategory(nombre, descripcion) {
        if (!nombre) {
            throw "No hay nombre";
        }
        try {
            this.getCategoryByName(nombre.toUpperCase());
        } catch (err) {
            let cat = new Category(this.calculaId(this.categories), nombre, descripcion);
            this.categories.push(cat);
            return cat;
        }
        throw "Ya existe esta categoria";
    }

    calculaId(array) {
        return array.reduce((max, valor) => (valor.id > max ? valor.id : max), 0) + 1;
    }

    addProduct(payload) {
        if (!payload.name) {
            throw "Nombre vacio o incorrecto";
        } else if (!payload.category || !this.getCategoryById(payload.category)) {
            throw "No existe categoria o no se le pasa";
        } else if (!payload.price || payload.price < 0 || isNaN(payload.price)) {
            throw "Numero negativo o no se le pasa";
        } else if (payload.units && isNaN(payload.units)) {
            throw "No es negativo";
        } else if (payload.units && !Number.isInteger(payload.units)) {
            throw "No es entero";
        } else if (payload.units < 0) {
            throw "Son menores que cero";
        }
        let pro = new Product(this.calculaId(this.products), payload.name, payload.category, payload.price, payload.units);
        this.products.push(pro);
        return pro;
    }

    delCategory(id) {
        try {
            var catnull = this.getCategoryById(id);
        } catch (err) {
            throw "Este producto tiene unidades";
        }
        if (catnull.units > 0) {
            throw "Este producto tiene unidades";
        }
        if (this.products.filter((prod) => prod.category === catnull.id).length > 0) {
            throw "No se puede borrar esta categoria porque incluye productos";
        }
        let indexOf = this.categories.findIndex((catnull) => catnull.id === id);
        let array = this.categories.splice(indexOf, 1);
        return array[0];
    }

    delProduct(id) {
        try {
            var prodnull = this.getProductById(id);
        } catch (err) {
            throw "Este producto tiene unidades";
        }
        if (prodnull.units >= 1) {
            throw "Este producto tiene unidades";
        }
        let indexOf = this.products.findIndex((prodnull) => prodnull.id === id);
        let array = this.products.splice(indexOf, 1);
        return array[0];
    }

    totalImport() {
        return this.products.reduce((total, valor) => (total += valor.productImport()), 0);
    }

    orderByUnitsDesc() {
        return this.products.sort((pro1, pro2) => pro2.units - pro1.units);
    }

    orderByName() {
        return this.products.sort((pro1, pro2) => pro1.name.localeCompare(pro2.name));
    }

    underStock(units) {
        return this.products.filter((thing) => thing.units < units);
    }

    toString() {
        let cadena = `Almacén ${this.id} => ${this.products.length} productos: ${this.totalImport().toFixed(2)} €`;
        this.products.forEach((prod) => (cadena += "\n- " + prod));
        return cadena;
    }

    modificarProducto(payload){
        let index = this.products.findIndex(prod => prod.id === payload.id)
        let prodModificado = new Product(payload.id, payload.name, payload.category, payload.price, payload.units);
        return prodModificado;
    }
}

module.exports = Store;
