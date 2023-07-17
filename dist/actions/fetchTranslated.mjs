var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
function fetchTranslated(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'POST',
            url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
            params: {
                'api-version': '3.0',
                'to[0]': 'zh-Hans',
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
            const resp = yield axios.request(options);
            return resp.data[0].translations[0].text;
        }
        catch (err) {
            return '网络错误';
        }
    });
}
// test:
// fetchTranslated('hello, how are you!').then(console.log);
export default fetchTranslated;
