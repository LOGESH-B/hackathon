async function pricetrack() {
    console.log((document.getElementById("search-box").value));
    let search = (document.getElementById("search-box").value);
    // search = search.trim();
    // search = search.replace(/http:\/\//g, " http://");
    // search = search.replace(/https:\/\//g, " https://");
    // search = search.replace(/https:\/\/dl.flipkart.com/g, " http://dl.flipkart.com");
    // if (search.length == 0) {
    //     console.log("No serach param")
    // } while (search.length > 1 && search[search.length - 1] == "=") { search = search.slice(0, -1); }
    // const matches = search.match(/\bhttps?:\/\/\S+/gi);
    // console.log(matches[0]);
    // if (matches != null && matches.length > 0) {
    //     fetch("https://hackathon-n4v9.onrender.com/proxy/search/", { method: 'POST', headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }, body: JSON.stringify({ url: matches[0] }), })
    //         .then((response) => response.json()).then((data) => {
    //             console.log(data);
    //             if (data.status) {
    //                 // window.location.href = "https://pricehistory.app/p\/" + data.code;
    //                 fetch("https://price-history.in/product\/" + data.code).then(res=>res.text()).then((resdata) =>{
    //                 // console.log(resdata);   
    //                 console.log(extractAmountValues(resdata))
    //                 } )
    //             }
    //             else {

    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error:', error);
    //         });
    // }
    // else {
    //     window.location.href = "https://pricehistory.app/page/search#gsc.tab=0&gsc.q=" + encodeURIComponent(search);
    // }

    fetch("https://hackathon-n4v9.onrender.com/proxy/search", { method: 'POST', headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" }, body: JSON.stringify({ q: search }), })
        .then((response) => response.json()).then((data) => {
            console.log("hii")
            var result = extractAmountValues(data);
            console.log(result)
            var predicted = predict(result)
            printOnScreen(result, predicted)

        })
}

function extractAmountValues(htmlString) {
    // const regex = /<span class="label">(.*?)<\/span>\s*<span class="amount">(.*?)<\/span>/g;

    // let match;
    // const result = {};

    // while ((match = regex.exec(htmlString)) !== null) {
    //     const label = match[1].trim();
    //     const amount = match[2].trim();

    //     result[label] = amount;
    // }


    // Parse the HTML string into a DOM structure
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Get elements using class names
    const currentPriceElement = doc.querySelector('.js-product-price');
    const lowestPriceLabelElement = doc.querySelector('.lowest');
    const highestPriceLabelElement = doc.querySelector('.highest');

    const lowestPriceElement = getNextSibling(lowestPriceLabelElement)
    const highestPriceElement = getNextSibling(highestPriceLabelElement)

    function getNextSibling(element) {
        let sibling = element.nextSibling;
        while (sibling && sibling.nodeType !== 1) {
            sibling = sibling.nextSibling;
        }
        return sibling;
    }

    // Extract text content from elements
    const currentPrice = currentPriceElement.innerHTML.trim();
    const lowestPrice = lowestPriceElement.innerHTML.trim();
    const highestPrice = highestPriceElement.innerHTML.trim();

    // Log or use the extracted prices
    console.log('Current Price:', (currentPrice));
    console.log('Lowest Price:', lowestPrice);
    console.log('Highest Price:', highestPrice);

    // return result;
    return [parseInt(parseInt(currentPrice.replace(/[^\d]/g, ''), 10)), parseInt(lowestPrice.replace(/[^\d]/g, ''), 10), parseInt(highestPrice.replace(/[^\d]/g, ''), 10)]
}

function predict(prices) {
    var cur = prices[0]
    var high = prices[1]
    var low = prices[2]
    var avg = (high + low) / 2
    var discount_prec = 15
    // To find the original price

    var dis_decimal = (discount_prec) / 100
    var original = (cur) / (1 - dis_decimal)

    if (cur == low) {
        console.log("This is the least price over the last three months");
        return "This is the least price over the last three months"
    }
    else if (cur > low && cur < avg) {
        console.log("The discount is real")
        return "The discount is real"
    }
    else if (cur >= avg && cur < high) {
        console.log("The discount may be fake");
        return "The discount may be fake"
    }
    else if (cur >= high) {
        console.log("The discount is fake, This is the highest price over the last three months");
        return "The discount is fake, This is the highest price over the last three months"
    }

    //To find the discount percentage froom the original price (for the lowest price)
    // var low_discount = original - low
    // var low_discount_prec = (low_discount / original) * 100
    // console.log("dis_decimal:", dis_decimal, " low_discount_prec:", low_discount_prec, "original:", original)
}


function printOnScreen(result, predicted) {
    var data = `<td>${result[0]}</td>
    <td>${result[1]}</td>
    <td>${result[2]}</td>`

    document.getElementById("table-data").innerHTML=data;
    document.getElementById("predicted-data").innerText=predicted;
}
// Example usage with an HTML string
// const htmlString = '<div class="col-12 px-0 py-2 all-time-price-overview small">...</div>';
// const extractedValues = extractAmountValues(htmlString);

// // Output the values to the console (you can do whatever you want with these values)
// console.log('Extracted Values:', extractedValues);


// document.getElementById("search-message").getElementsByTagName("span")[0].addEventListener("click", function (e) {
//     document.getElementById("search-message").classList.add("d-none");
// });
// let queryString = window.location.search.replace(/\+\&/g, "+").replace(/\+\=/g, "+").replace(/\+\&/g, "+").replace(/\+\=/g, "+");
// const searchParams = {};
// if (queryString) {
//     queryString.substr(1).split('&').forEach(param => {
//         const [key, value] = param.split('=');
//         if (value && value.length > 0) {
//             try {
//                 searchParams[key] = decodeURIComponent(value.replace(/\+/g, '%20'));
//             } catch (error) {
//                 searchParams[key] = "" + (value.replace(/\+/g, ' '));
//             }
//         }
//         else {
//             searchParams['search'] += key.replace(/\+/g, ' ');
//         }
//     });
// } if (searchParams['search'] != undefined) {
//     document.getElementById("search").value = searchParams['search'];
//     setTimeout(() => { document.getElementById("search-submit").click(); }, 500)
// }