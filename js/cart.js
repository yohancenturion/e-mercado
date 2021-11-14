var carritoArray = [];
var arrayProducto = [0];

function calcEnvio(){
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;

    let elements = document.getElementsByName("envio");
        for (var i = 0; i < elements.length; i++){
            if (elements[i].checked){
                envio = parseInt(elements[i].value * total / 100)
            }
        }
        let totalConEnvio = total + envio
        let contenido = `
        <tr>
            <td>${total}</td>
            <td>${envio}</td>
            <td>${totalConEnvio}</td>
        </tr>
        `
        document.getElementById("totalEnvio").innerHTML = contenido
}

function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++){
        total += parseInt(subs[i].innerHTML)
    }
    document.getElementById("total").innerHTML = total
    calcEnvio()
}


function calcSubtotal(unitCost) {
    let cantidad = parseInt(document.getElementById(`cantidad`).value);
    subtotal = (cantidad * unitCost);
    document.getElementById(`subtotalarticulo`).innerHTML = subtotal;
    calcTotal();

}

function productoComprado (array){
let htmlContentToAppend = "";

for(let i = 0; i < carritoArray.length; i++){
    let articles = carritoArray[arrayProducto[0]]
    let subtotal = (articles.count * articles.unitCost);
    htmlContentToAppend += ` 
        <tr>
        
            <td> <img src="` + articles.src + `" > </td>
            <td>`+ articles.name +`</td>  
            <td>` + articles.unitCost + ` ` + articles.currency + ` </td>
            <td>`+ articles.count +`</td> 
            <td> <input style="width:60px;" onchange="calcSubtotal(${articles.unitCost})" value="${articles.count}"
            type="number" id="cantidad" ><br></td>
            <td><span class="subtotal" id="subtotalarticulo" ${subtotal} </span></td>
            
        
        </tr>
`
document.getElementById("listado").innerHTML = htmlContentToAppend;
}

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            carritoArray = resultObj.data.articles
            productoComprado (carritoArray)
        }
})

let elements = document.getElementsByName("envio");
for (var i = 0; i < elements.length; i++) {
elements[i].addEventListener("change", function(){
    calcEnvio()
})
}


})