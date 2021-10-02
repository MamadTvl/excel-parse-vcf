const xlsxFile = require('read-excel-file/node');
const fs = require('fs');

const readData = async (index) => {
  const rows = await xlsxFile(`./excel/3400-3500.xlsx`);
  let vcard = ''
  for (const row of rows) {
    for (let j = 0; j < row.length; j++) {
      const el = row[j]
        if (el){
          const string = el.toString()
          if (string[0] === "9"){
            if (string.length === 10){
              let obj = 'BEGIN:VCARD\nVERSION:3.0\n'
              obj += `N:;${row[j - 2]};;;\n`
              obj += `TEL;type=Mobile:0${string}\n`
              obj += 'END:VCARD\n'
              vcard += obj
            }
          }
        }
    }
  }
  return vcard
}



// for (let index = 0; index < 26; index++) {
  readData(1).then(vcard => {
    try {
      fs.writeFileSync('./contact-with-zero.vcf', vcard)
      console.log(vcard);
    }catch (err){
      console.error(err)
    } 
  })
// }
