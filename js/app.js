const cubicWeight = new calculateAverageCubicWeight();
const apiUrl="http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com";

const createHtml = (categoryValue = {}) => {
  const html = `
    <tr>
      <td>${categoryValue.categoryCount}</td>
      <td>${categoryValue.categoryTitle}</td>
      <td>${categoryValue.categorySizeWidth}</td>
      <td>${categoryValue.catergorySizeLength}</td>
      <td>${categoryValue.categorySizeHeight}</td>
      <td>${categoryValue.cubicMeters}<span>m<sup>3</sup></span></td>
      <td>250</td>
      <td class = "col-sm-1">${categoryValue.cubicWeightAC}&nbsp&nbsp&nbspkg</td> 
    </tr>
`;
  return html;
};
//get Products from each page
const getProducts = async function(pageNo = 1) {
  let actualUrl = apiUrl + `/api/products/${pageNo}`;
  var apiResults=await fetch(actualUrl)
  .then(resp=>{
  return resp.json();
  });
  return apiResults;
}

const getEntireProductsList = async function(pageNo = 1) {
  const results = await getProducts(pageNo);
  //Retreiving data from API;
  if (results.next !== null) {
    //get the next page Number
      pageNo = results.next.charAt(results.next.length-1);
    //CONCATENATE all the products
      return results.objects.concat(await getEntireProductsList(pageNo)); 
  } else {
    return results;
  }
};

(async ()=>{
    const entireList=await getEntireProductsList();
    const cubicWeightArray = []
    const productValues = [];
    let   categoryCount = 1;
    const productHtmlList = [];
  
    for (const key in entireList) {
      if (Object.hasOwnProperty.call(entireList, key)) {
        const element = entireList[key];
        //check for Air Conditioners products from all the pages
        if(element.category === 'Air Conditioners'){
          productValues.push({
            categoryCount: categoryCount++,
            categoryTitle:  element.title,
            catergorySizeLength: element.size.length ,
            categorySizeWidth: element.size.width,
            categorySizeHeight: element.size.height,
            cubicMeters : cubicWeight.calculateCubicMeters(element.size),
            cubicWeightAC : cubicWeight.calculateACCubicWeight() 
          });
          const cubicWeightAC = cubicWeight.calculateACCubicWeight();
          cubicWeightArray.push(cubicWeightAC);//Array of All the cubic weights fo air conditioner products
        }  
      }
    }
    const cubicWeightAverage = cubicWeight.find_average(cubicWeightArray); //method call to calculate average cubic weight for air conditoner, argument - cubicWeightArray
    productValues.forEach(categoryValue => {
      const productHtml =  createHtml (categoryValue);
      productHtmlList.push(productHtml);
    })
    // render!
    document.getElementById('category-container').innerHTML = productHtmlList.join('<br>');
    document.getElementById('average-cubicweight').insertAdjacentHTML("afterend", `<td class = "col-sm-1">${cubicWeightAverage}&nbsp&nbspkg</td>`);

})();