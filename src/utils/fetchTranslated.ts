import axios from 'axios';
import { key } from '../../private';

export enum Lang {
  en = 'en',
  zh = 'zh-Hans',
}

async function fetchTranslated(text: string, toLang: Lang) {
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
      'X-RapidAPI-Key': key.XRapidAPIKey,
      'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com',
    },
    data: [
      {
        text,
      },
    ],
  };

  try {
    const result = await axios
      .request(options)
      .then((resp) => resp.data[0].translations[0].text);
    return result;
  } catch (err) {
    return `错误：${(err as Error).message}`;
  }
}

export default fetchTranslated;
