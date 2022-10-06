const Category = require("../model/category.class");
const Product = require("../model/product.class");
const Store = require("../model/store.class");

class View {
    constructor() {}

    mostrarCategoria(cat) {
        let select = document.getElementById("newprod-selcat");
        let opcion = document.createElement("option");
        opcion.value = cat.id;
        opcion.innerText = cat.name;
        opcion.id = "opCat" + cat.id;
        select.appendChild(opcion);
    }

    mostrarProducto(prod) {
        let tbody = document.getElementById("newprod-prod");
        let tr = document.createElement("tr");
        tr.id = prod.id;
        tr.innerHTML = `                            
        <td>${prod.id}</td>
        <td>${prod.name}</td>
        <td>${prod.category}</td>
        <td>${prod.units}</td>
        <td>${prod.price} €/u</td>
        <td>${prod.productImport()} €</td>
        <td></td>`;

        tbody.appendChild(tr);
    }
    mostrarImporte(totalImport) {
        let tfoot = document.getElementById("importe-total");
        tfoot.innerHTML = `
        <th colspan="5">Importe total del almacén:</th>
        <th>${totalImport} €</th>`;
    }
    eliminarProducto(prod) {
        let tbody = document.getElementById("newprod-prod");
        let tr = document.getElementById(prod);
        tbody.removeChild(tr);
    }

    eliminarCategoria(cat) {
        let select = document.getElementById("newprod-selcat");
        let option = document.getElementById("opCat" + cat.id);
        select.removeChild(option);
    }
}
module.exports = View;
