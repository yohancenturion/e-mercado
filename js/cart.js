var carritoArray = [];
var arrayProducto = [0];

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
            <td> <input style="width:60px;" onchange="calcSubtotal(${articles.unitCost})"
            type="number" id="cantidad" ><br></td>
            <td><span class="subtotal" id="subtotalarticulo"</span></td>
            
        
        </tr>
`
document.getElementById("listado").innerHTML = htmlContentToAppend;
}
calcTotal();
}

function calcSubtotal(unitCost) {
    let cantidad = parseInt(document.getElementById(`cantidad`).value);
    subtotal = (cantidad * unitCost);
    document.getElementById(`subtotalarticulo`).innerHTML = subtotal;
    calcTotal();
}

function calcTotal(){
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++){
        total += parseInt(subs[i].innerHTML)
    }
    document.getElementById("total").innerHTML = total
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
})