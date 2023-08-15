import axios from 'axios';
import key from '../../private';

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
    const resp = await axios.request(options);
    return resp.data[0].translations[0].text as string;
  } catch (err) {
    return '网络错误';
  }
}

export default fetchTranslated;
