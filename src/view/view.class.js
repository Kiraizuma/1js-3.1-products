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

    mostrarProducto(prod, callback) {
        let tbody = document.getElementById("newprod-prod");
        let tr = document.createElement("tr");
        tr.id = "tr" + prod.id;
        tr.innerHTML = `                            
        <td align="center">${prod.id}</td>
        <td align="center">${prod.name}</td>
        <td align="center">${prod.category}</td>
        <td align="center" id="unidadesProd${prod.id}">${prod.units}</td>
        <td align="center">${prod.price} €/u</td>
        <td align="center" id="importeTotal${prod.id}">${prod.productImport().toFixed(2)} €</td>
        <td align="center"><button class="btn btn-secondary" id="prod_up${prod.id}">
        <span class="material-icons">arrow_drop_up</span>
        </button>
        <button class="btn btn-secondary" id="prod_down${prod.id}">
        <span class="material-icons">arrow_drop_down</span>
        </button>
        <button class="btn btn-secondary" id="prod_edit${prod.id}">
        <span class="material-icons">edit</span>
        </button>
        <button class="btn btn-secondary" id="prod_delete${prod.id}">
        <span class="material-icons">delete</span>
        </button>
        </td>`;
        tbody.appendChild(tr);
        document.getElementById("prod_delete" + prod.id).addEventListener("click", () => {
            callback(prod.id);
        });

        document.getElementById("prod_edit" + prod.id).addEventListener("click", () => {
            document.getElementById("newprod-name").value = prod.name;
            document.getElementById("newprod-selcat").value = prod.category;
            document.getElementById("newprod-units").value = prod.units;
            document.getElementById("newprod-price").value = prod.price;
            document.getElementById("newprod-id").value = prod.id;
        });

        document.getElementById("prod_up" + prod.id).addEventListener("click", () => {
            prod.moreUnits();
            document.getElementById("unidadesProd"+prod.id).textContent = prod.units;
            this.quitarBoton(prod);
            document.getElementById("importeTotal"+prod.id).textContent= prod.productImport().toFixed(2)+" €"
        });
        document.getElementById("prod_down" + prod.id).addEventListener("click", () => {
            prod.lessUnits();
            document.getElementById("unidadesProd"+prod.id).textContent = prod.units;
            this.quitarBoton(prod);
            document.getElementById("importeTotal"+prod.id).textContent= prod.productImport().toFixed(2)+" €"

        });
    }
    mostrarImporte(totalImport) {
        let tfoot = document.getElementById("importe-total");
        tfoot.innerHTML = `
        <th colspan="5" align="center">Importe total del almacén:</th>
        <th align="left">${totalImport} €</th>`;
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
    quitarBoton(prod) {
        let valor = document.getElementById("unidadesProd" + prod.id).textContent;
        let botonAbajo = parseInt(valor);
        if (botonAbajo == 0) {
            document.getElementById("prod_down"+ prod.id).disabled = true;
        } else {
            document.getElementById("prod_down"+ prod.id).disabled = false;
        }
    }
    mostrarProductoModificado(prod) {
        console.log(prod);
        document.getElementById("tr" + prod.id).children[1].textContent = prod.name;
        document.getElementById("tr" + prod.id).children[2].textContent = prod.category;
        document.getElementById("tr" + prod.id).children[3].textContent = prod.units;
        document.getElementById("tr" + prod.id).children[4].textContent = prod.price;
        document.getElementById("tr" + prod.id).children[5].textContent = prod.productImport().toFixed(2) + " €";
    }
}
module.exports = View;
