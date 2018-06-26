const fs = require('fs')
fs.readFile('./data_json/goods.json', 'utf8', (err, data) => {
    let newData = JSON.parse(data)
    let i = 0;
    let pushData = []
    newData.RECORDS.map((value, index) => {
        if (value.IMAGE1) {
            i++;
            pushData.push(value)
        }
    })
    console.log(i);
    fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), (err) => {
        if (!err) console.log('写入成功');
        else console.log('写入失败');


    })


})