const puppeteer = require('puppeteer');
const lang='en';
(
async () => {
const browser = await puppeteer.launch({headless:false});
const page = await browser.newPage();
// await page.goto(`https://www.osp.osaka-info.jp/${lang}/facility/free`);
await page.goto('https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=html&date=20200201&stockNo=2330')
const content=await page.evaluate(()=>{
    const data=[]
    //const facilityRows = document.querySelectorAll('.free_body')
    const facilityRows = document.querySelectorAll('td')
    for(const tr of facilityRows){
      console.log(tr)
        // data.push({
        //   id:tr.childNodes[1].innerText.slice(0,2),
        //   name: tr.childNodes[1].innerText.slice(2),
        //   content: tr.childNodes[3].innerText,
        //  })
}
return data
})
// let firebase = require('firebase/app');
// require('firebase/firestore');
// let firebaseConfig = {
//     apiKey: "AIzaSyCQnB2rjdsIw-sEfWG71c37sy-qoJeLjwc",
//     authDomain: "osaka-map-1573973124960.firebaseapp.com",
//     databaseURL: "https://osaka-map-1573973124960.firebaseio.com",
//     projectId: "osaka-map-1573973124960",
//     storageBucket: "osaka-map-1573973124960.appspot.com",
//     messagingSenderId: "547081207024",
//     appId: "1:547081207024:web:087eaeb54ebeaf3e53d635",
//     measurementId: "G-T1RWX0JBXD"
//   };
//   let app=firebase.initializeApp(firebaseConfig);
//   const db=firebase.firestore();

//   db.collection('2020-4-6').get().then((doc)=>{
//     doc.docs.forEach((elm)=>{
//       content.forEach(el=>{
//         if(elm._document.proto.fields.id.stringValue==el.id) {
//           return db.collection('2020-4-6').doc(elm.id).update({
//             enContent:el.content,
//             enName:el.name,
//           })
          
//         }
//       })
      
//     })
//   })
  
  //生成json
// const fs = require('fs')

// fs.writeFile(
//         './test.json',
//         JSON.stringify(content),
//         ()=>{}
// )
//await browser.close();

})();

