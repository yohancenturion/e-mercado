var categoriesArray = [];
var minCost = undefined;
var maxCost = undefined;

function sortProductos (criterio, array) {
    let result = [];
    if (criterio === 1) {
        result = array.sort(
            function (a, b) {
                if (a.cost < b.cost) { return -1; }
                if (a.cost > b.cost) { return 1; }
                return 0
            });
    } else if (criterio === 2) {
        result = array.sort (
            
            function (a, b) {
                
                if (a.cost > b.cost){
                    return -1;
                }

                if (a.cost < b.cost){
                    return 1
                }

                return 0
            });
    } else if (criterio === 3){
        result = array.sort(function(a,b){
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            if (aCount > bCount) {return -1;}
            if (aCount < bCount) {return 1;}
            return 0
        });
    }
    return result;
}

function showCategoriesList (array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++) {
        let product = array[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

        htmlContentToAppend +=
        ` <div class="col-sm-12 col-md-9 col-lg-6 col-xl-3">
           <div class="card" style="width: 18rem;">
           <img src="` + product.imgSrc + `" class="card-img-top" alt="` + product.imgSrc + `">
           <div class="card-body">
            <h5 class="card-title">`+ product.name +`</h5>
            <p class="card-text">` + product.description + `</p>
            <p class="mb-1">` + product.cost + ` </p>
            <a href="product-info.html" class="btn btn-primary">Ir al producto</a>
           </div>
           </div>
           </div>
        </a>
        `
         }
         document.getElementById("productos").innerHTML = htmlContentToAppend;
}}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(resultObj.data);

            categoriesArray = (1, categoriesArray);
            showCategoriesList(categoriesArray);
        }
    }
    )

    document.getElementById("costo-ascendente").addEventListener("click", function(){
        categoriesArray = sortProductos(1, categoriesArray);
    
        showCategoriesList(categoriesArray);
    }
    )
    
    document.getElementById("costo-descendente").addEventListener("click", function (){
        categoriesArray = sortProductos(2, categoriesArray);
    
        showCategoriesList(categoriesArray);
    }
    )
    
    document.getElementById("sold-count").addEventListener("click", function () {
        categoriesArray = sortProductos(3, categoriesArray);
        showCategoriesList(categoriesArray);
    }
    )
    
    document.getElementById("filtrar").addEventListener("click", function(e){
    
        minCost = document.getElementById("rango-min-cost").value;
        maxCost = document.getElementById("rango-max-cost").value
    
        if ((minCost != undefined) && (minCost !="") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }
    
        if ((maxCost != undefined) && (maxCost !="") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }
    
        showCategoriesList(categoriesArray)
    }
    );
    
    document.getElementById("limpiar").addEventListener("click", function (e){
        document.getElementById("rango-min-cost").value = "";
        document.getElementById("rango-max-cost").value = "";
    
        minCost = undefined;
        maxCost = undefined;
    
        showCategoriesList(categoriesArray)
    }
    );
    

});