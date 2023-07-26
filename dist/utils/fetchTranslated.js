"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lang = void 0;
const axios_1 = __importDefault(require("axios"));
var Lang;
(function (Lang) {
    Lang["en"] = "en";
    Lang["zh"] = "zh-Hans";
})(Lang || (exports.Lang = Lang = {}));
async function fetchTranslated(text, toLang) {
    const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        params: {
            'api-version': '3.0',
            'to[0]': toLang,
            textType: 'plain',
            profanityAction: 'NoAction',
        },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '528e06a4a6mshbd0ed4c156ab813p1f8a0ejsn419e8182ed3c',
            'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
        },
        data: [
            {
                text,
            },
        ],
    };
    try {
        const resp = await axios_1.default.request(options);
        return resp.data[0].translations[0].text;
    }
    catch (err) {
        return '网络错误';
    }
}
exports.default = fetchTranslated;
