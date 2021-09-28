var productoArray = {};
var comentariosArray = {};
var relatedArray = [];
var array2 = [
    1,
    3
];

function mostrarImagenes(array) {
    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        

        document.getElementById("imagenes").innerHTML = htmlContentToAppend;
        
    }   
}

function mostrarComentarios(arrayComentarios) {
    let htmlContentToAppend = "";
    
    for(let i = 0; i < arrayComentarios.length; i++){
        let comments = arrayComentarios[i];
        htmlContentToAppend += `
        <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ comments.user +`</h4>  
                    </div>
                    <p class="mb-1">` + comments.description + ` </p>
                    <p class="mb-1">` + comments.dateTime + `</p>
                    <p class="mb-1">` + comments.score + `</p>
                </div>
                `;
                let puntos = "";
                for (let i = 1; i <= comments.score; i++) {
                    puntos += `<span class="fa fa-star checked"></span>`;
                }
                for (let i = comments.score + 1; i <= 5; i++) {
                    puntos += `<span class="fa fa-star"></span>`;
                }
                htmlContentToAppend += `<div style="text-align: right;">${puntos}</div><br><hr>`
        
                document.getElementById("comentarios").innerHTML = htmlContentToAppend
    }
    
}

function mostrarProductosRelacionados (array) {
    let htmlContentToAppend = "";
    
    for(let i = 0; i < array.length; i++) {
        let product = relatedArray[array2[i]] 
    
            htmlContentToAppend +=
            ` <a href="product-info.html" class="list-group-item list-group-item-action">
               <div class="row">
               <div class="col-3">
                           <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                       </div>
                   <div class="col">
                       <div class="d-flex w-100 justify-content-between">
                           <h4 class="mb-1">`+ product.name +`</h4>  
                       </div>
                       <p class="mb-1">` + product.cost + ` </p>
                       <p class="mb-1">` + product.description + `</p>
                   </div>
               </div>
           </a>
           `
           
           document.getElementById("productosrelacionados").innerHTML = htmlContentToAppend;
       
    }
         
    
        }

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
       if (resultObj.status === "ok") {
           comentariosArray = resultObj.data
           mostrarComentarios (resultObj.data)
       }
  })
   
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok") {

            product = resultObj.data;

            let nombreProductoHTML  = document.getElementById("nombreProducto");
            let descripcionProductoHTML = document.getElementById("descripcionProducto");
            let costoProductoHTML = document.getElementById("costoProducto");
            let monedaProductoHTML = document.getElementById("monedaProducto");
            let productCountHTML = document.getElementById("soldCount");
            let categoriaProductoHTML = document.getElementById("categoriaProducto");
        
            nombreProductoHTML.innerHTML = product.name;
            descripcionProductoHTML.innerHTML = product.description;
            costoProductoHTML.innerHTML = product.cost;
            monedaProductoHTML.innerHTML = product.currency;
            productCountHTML.innerHTML = product.soldCount;
            categoriaProductoHTML.innerHTML = product.category


            //Muestro las imagenes en forma de galería
            mostrarImagenes(product.images);

        }
    });

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok") {
            relatedArray = resultObj.data
            mostrarProductosRelacionados (relatedArray)
        }
    })

});