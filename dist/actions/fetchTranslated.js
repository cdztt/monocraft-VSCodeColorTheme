"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function fetchTranslated(text, toLang) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const resp = yield axios_1.default.request(options);
            return resp.data[0].translations[0].text;
        }
        catch (err) {
            return '网络错误';
        }
    });
}
exports.default = fetchTranslated;
