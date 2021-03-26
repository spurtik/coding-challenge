# Coding Challenge

## Description

*_ Create an app that uses http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1 API End point to Find the average cubic weight for all products in the "Air Conditioners" category. _*

# Languages
* HTML5
* Bootstrap
* Async Functions
* JavaScript

## Walkthrough
1. Get the API
2. 
3. Create the HTML
* Create a table for the data to be displayed.
Step 4: Use the API's response
* Create a new function that fetches the products info from the API.
* Using template literals for the API url
fetch(`http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com/api/products/1`)
* Format the response into a usable format with .then(response => response.json());
* To get all the data from paginated API - concat the data 
5. Implement the Javascript structure(app.js)
* Target all the required elements using document.getElementById();
* create a new function const createHtml = ({}) => It will take in the parameters of the API data.
* In createHtml return the template card that was created in the html. Pass in the input value as one of the parts of your table data to make sure it works!
* You will need to return the string using template literals and the return keyword if you have not used the one line function style.
   const productHtml =  createHtml (categoryValue);
   productHtmlList.push(productHtml);
   document.getElementById('category-container').innerHTML = productHtmlList.join('<br>');

