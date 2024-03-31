"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  getBankInfo: () => getBankInfo
});
module.exports = __toCommonJS(src_exports);

// node_modules/.pnpm/tsup@8.0.2_typescript@5.4.3/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = () => typeof document === "undefined" ? new URL("file:" + __filename).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();

// src/index.ts
var import_csv_parser = __toESM(require("csv-parser"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_iconv_lite = __toESM(require("iconv-lite"));
var import_node_url = require("url");
var import_path = __toESM(require("path"));
var bankInfos = [];
var splitData = () => {
  return new Promise((resolve, reject) => {
    let dataArray = [];
    const transformStream = import_iconv_lite.default.decodeStream("gbk");
    const __filename2 = (0, import_node_url.fileURLToPath)(importMetaUrl);
    const csvPath = import_path.default.resolve(__filename2, "../bin.csv");
    import_fs_extra.default.createReadStream(csvPath).pipe(transformStream).pipe((0, import_csv_parser.default)()).on("data", (row) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBankInfo
});
