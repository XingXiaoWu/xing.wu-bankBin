// test-es6.js
import { getBankInfo } from './index';
// 使用myFunction进行测试
const main = async () => {
    const aa = await getBankInfo('6226822200352071283')
    console.log(aa.BankName);
}

main()