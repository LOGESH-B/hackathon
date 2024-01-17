
async function pricetrack() {
    let search = "https://www.amazon.in/OnePlus-Wireless-Earbuds-Drivers-Playback/dp/B0C8JB3G5W/ref=lp_80662755031_1_12?pf_rd_p=9e034799-55e2-4ab2-b0d0-eb42f95b2d05&pf_rd_r=E58SZ8BWVE62B3FR38E3&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D";
    search = search.trim();
    search = search.replace(/http:\/\//g, " http://");
    search = search.replace(/https:\/\//g, " https://");
    search = search.replace(/https:\/\/dl.flipkart.com/g, " http://dl.flipkart.com");
    console.log("hii");
    if (search.length == 0) {
        console.log("No serach param")
    } while (search.length > 1 && search[search.length - 1] == "=") { search = search.slice(0, -1); }
    const matches = search.match(/\bhttps?:\/\/\S+/gi);
    console.log(matches[0]);
    if (matches != null && matches.length > 0) {
        fetch("https://pricehistory.app/" + "api/search", { method: 'POST', headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin':"*" }, body: JSON.stringify({ url: matches[0] }), })
            .then((response) => response.json()).then((data) => {
                console.log(data);
                if (data.status) {
                    // window.location.href = "https://pricehistory.app/p\/" + data.code;
                }
                else {

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    else {
        console.log("hiik");
        window.location.href = "https://pricehistory.app/page/search#gsc.tab=0&gsc.q=" + encodeURIComponent(search);
    }
} ("https://www.amazon.in/OnePlus-Wireless-Earbuds-Drivers-Playback/dp/B0C8JB3G5W/ref=lp_80662755031_1_12?pf_rd_p=9e034799-55e2-4ab2-b0d0-eb42f95b2d05&pf_rd_r=E58SZ8BWVE62B3FR38E3&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D")



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