const puppeteer = require('puppeteer');
(async () => {
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

const fs = require('fs')

fs.writeFile(
        './freeFacilities.json',
        JSON.stringify(content),
        ()=>{}
)
await browser.close();

})();

