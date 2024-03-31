import csv from 'csv-parser'
import fs from 'fs-extra'
import iconv from 'iconv-lite'
import { fileURLToPath } from 'node:url';
import path from 'path'
interface BankInfo {
    BankBin: string,
    BankNumberLength: string,
    BankName: string,
    BankNumber: string,
    BankClass: string,
    BankBinLength: string
}
let bankInfos: any = []
const splitData = () => {
    return new Promise((resolve, reject) => {
        let dataArray: any = []
        const transformStream = iconv.decodeStream('gbk');
        // const __dirname = path.resolve();
        // const csvPath = path.resolve(__dirname, './src/bin.csv')
        //const csvPath = path.resolve(import.meta.dirname, './bin.csv')
        const __filename = fileURLToPath(import.meta.url)
        const csvPath = path.resolve(__filename, '../bin.csv')
        fs.createReadStream(csvPath)
            .pipe(transformStream)
            .pipe(csv())
            .on('data', (row) => {
                let rowData = Object.values(row); // 获取当前行的值作为一个数组
                dataArray.push(rowData); // 添加到结果数组中
            })
            .on('end', () => {
                resolve(dataArray)
            }).on('error', (err) => {
                console.error('Error reading file:', err);
                reject(err)
            });;
    })
}

// 获取银行信息
const getBankInfo = async (cardNumber: string) => {
    if (bankInfos.length === 0) {
        // 如果不存在，就初始化
        bankInfos = await splitData()
    }
    for (let i = 1; i < bankInfos.length; i++) {
        let length = parseInt(bankInfos[i][5]);
        let str = cardNumber.substring(0, length);
        if (str.includes(bankInfos[i][0]) && cardNumber.length === parseInt(bankInfos[i][1])) {
            let keyValues: BankInfo = {
                BankBin: '',
                BankNumberLength: '',
                BankName: '',
                BankNumber: '',
                BankClass: '',
                BankBinLength: ''
            };
            keyValues["BankBin"] = bankInfos[i][0];
            keyValues["BankNumberLength"] = bankInfos[i][1];
            keyValues["BankName"] = bankInfos[i][2];
            keyValues["BankNumber"] = bankInfos[i][3];
            keyValues["BankClass"] = bankInfos[i][4];
            keyValues["BankBinLength"] = bankInfos[i][5];
            return keyValues;
        }
    }
    return null;
}

export {
    getBankInfo
}

// const aa = await getBankInfo('6226822200352071283')
// console.log(aa.BankName);