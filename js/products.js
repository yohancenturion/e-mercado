var categoriesArray = [];

function showCategoriesList (array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++) {
        let category = array[i];
        htmlContentToAppend += `
        <a href="category-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name +`</h4>  
                    </div>
                    <p class="mb-1">` + category.cost + ` </p>
                    <p class="mb-1">` + category.description + `</p>
                </div>
            </div>
        </a>
        `;
         }
         document.getElementById("productos").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(resultObj.data);
        }
    }
    )

});