// test-commonjs.js
const getBankInfo = require('./index');
// 使用myLibrary进行测试
const main = async () => {
    const aa = await getBankInfo('6226822200352071283')
    console.log(aa.BankName);
}

main()