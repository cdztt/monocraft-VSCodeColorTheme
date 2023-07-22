export declare enum Lang {
    en = "en",
    zh = "zh-Hans"
}
declare function fetchTranslated(text: string, toLang: Lang): Promise<string>;
export default fetchTranslated;
