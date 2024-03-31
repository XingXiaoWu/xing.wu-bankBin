interface BankInfo {
    BankBin: string;
    BankNumberLength: string;
    BankName: string;
    BankNumber: string;
    BankClass: string;
    BankBinLength: string;
}
declare const getBankInfo: (cardNumber: string) => Promise<BankInfo | null>;

export { getBankInfo };
