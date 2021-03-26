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
      <td>${categoryValue.cubicMeters}&nbspm<sup>3</sup></td>
      <td>250</td>
      <td>${categoryValue.cubicWeightAC}&nbspkg</td> 
    </tr>
`;
  return html;
};

const getProducts = async function(pageNo = 1) {

let actualUrl = apiUrl + `/api/products/${pageNo}`;
//console.log('PN-' + pageNo);
//console.log(actualUrl);
var apiResults=await fetch(actualUrl)
.then(resp=>{
return resp.json();
});

return apiResults;

}

const getEntireProductsList = async function(pageNo = 1) {
  const results = await getProducts(pageNo);
  //console.log("Retreiving data from API for page : " + results);
  if (results.next !== null) {
      pageNo = results.next.charAt(results.next.length-1);
      //console.log('--' + pageNo);
      //console.log(results);
        return results.objects.concat(await getEntireProductsList(pageNo)); 
  } else {
    return results;
  }
};


(async ()=>{
    const entireList=await getEntireProductsList();
    const cubicWeightArray = []
    const productValues = [];
    let categoryCount = 1;
    const productHtmlList = [];
  
    for (const key in entireList) {
      if (Object.hasOwnProperty.call(entireList, key)) {
        const element = entireList[key];
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
          console.log(cubicWeightAC);
          cubicWeightArray.push(cubicWeightAC);
        }  
      }
    }
    
    //console.log(element.size);
    //cubicWeight.find_average(cubicWeightArray);
    //console.log(cubicWeightArray);
    const cubicWeightAverage = cubicWeight.find_average(cubicWeightArray);
    productValues.forEach(categoryValue => {
      const productHtml =  createHtml (categoryValue);
      productHtmlList.push(productHtml);
    })
    // const displayAverage = createHtml(cubicWeightAverage, productValues);
    // console.log(displayAverage);
    // render!
    document.getElementById('category-container').innerHTML = productHtmlList.join('<br>');
    document.getElementById('average-cubicweight').insertAdjacentHTML("afterend", `<td>${cubicWeightAverage}<span>&nbspkg</span></td>`);

})();