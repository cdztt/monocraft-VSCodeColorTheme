import axios from 'axios';
import { key } from '../../private';

export enum Lang {
  en = 'en',
  zh = 'zh-Hans',
}

/*
* 2024.11.09 api接口更改
* https://rapidapi.com/apiship-apiship-default/api/microsoft-translator-text-api3/playground/apiendpoint_e49986e8-2023-40ff-bbce-6d6b37cdb89f
*
* 原来的代码注释未删
* 一句翻译没问题，ztt的大段翻译没有测试
*/
async function fetchTranslated(text: string, toLang: Lang) {
  const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text-api3.p.rapidapi.com/largetranslate',
    params: {
      // 'api-version': '3.0',
      // 'to[0]': toLang,
      // textType: 'plain',
      // profanityAction: 'NoAction',
      to: toLang,
      from: toLang === 'en' ? 'zh-Hans' : 'en',
    },
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': key.XRapidAPIKey,
      'X-RapidAPI-Host': 'microsoft-translator-text-api3.p.rapidapi.com',
    },
    // data: [
    //   {
    //     text,
    //   },
    // ],
    data: {
      sep: '|',
      text,
    }
  };

  try {
    const result = await axios
      .request(options)
      // .then((resp) => resp.data[0].translations[0].text);
      .then((resp) => resp.data.text);
    return result;
  } catch (err) {
    return `错误：${(err as Error).message}`;
  }
}

export default fetchTranslated;
