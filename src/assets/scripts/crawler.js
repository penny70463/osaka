const puppeteer = require('puppeteer');

(
async () => {
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
await page.goto('https://www.osp.osaka-info.jp/cht/facility/free');

const content=await page.evaluate(()=>{
    const data=[]
    const facilityRows = document.querySelectorAll('.free_body')
    for(const tr of facilityRows){
        data.push({
          id:tr.childNodes[1].innerText.slice(0,2),
          name: tr.childNodes[1].innerText.slice(2),
          content: tr.childNodes[3].innerText,
         })
}
return data
})
let firebase = require('firebase/app');
require('firebase/firestore');
let firebaseConfig = {
    apiKey: "AIzaSyCQnB2rjdsIw-sEfWG71c37sy-qoJeLjwc",
    authDomain: "osaka-map-1573973124960.firebaseapp.com",
    databaseURL: "https://osaka-map-1573973124960.firebaseio.com",
    projectId: "osaka-map-1573973124960",
    storageBucket: "osaka-map-1573973124960.appspot.com",
    messagingSenderId: "547081207024",
    appId: "1:547081207024:web:087eaeb54ebeaf3e53d635",
    measurementId: "G-T1RWX0JBXD"
  };
  let app=firebase.initializeApp(firebaseConfig);
  const db=firebase.firestore();
// const fs = require('fs')

// fs.writeFile(
//         './test.json',
//         JSON.stringify(content),
//         ()=>{}
// )
await browser.close();

})();

