// src/index.ts
import csv from "csv-parser";
import fs from "fs-extra";
import iconv from "iconv-lite";
import { fileURLToPath } from "node:url";
import path from "path";
var bankInfos = [];
var splitData = () => {
  return new Promise((resolve, reject) => {
    let dataArray = [];
    const transformStream = iconv.decodeStream("gbk");
    const __filename2 = fileURLToPath(import.meta.url);
    const csvPath = path.resolve(__filename2, "./bin.csv");
    fs.createReadStream(csvPath).pipe(transformStream).pipe(csv()).on("data", (row) => {
      let rowData = Object.values(row);
      dataArray.push(rowData);
    }).on("end", () => {
      resolve(dataArray);
    }).on("error", (err) => {
      console.error("Error reading file:", err);
      reject(err);
    });
    ;
  });
};
var getBankInfo = async (cardNumber) => {
  if (bankInfos.length === 0) {
    bankInfos = await splitData();
  }
  for (let i = 1; i < bankInfos.length; i++) {
    let length = parseInt(bankInfos[i][5]);
    let str = cardNumber.substring(0, length);
    if (str.includes(bankInfos[i][0]) && cardNumber.length === parseInt(bankInfos[i][1])) {
      let keyValues = {
        BankBin: "",
        BankNumberLength: "",
        BankName: "",
        BankNumber: "",
        BankClass: "",
        BankBinLength: ""
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
};
export {
  getBankInfo
};
