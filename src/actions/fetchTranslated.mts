import axios from 'axios';

async function fetchTranslated(text: string) {
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
    const resp = await axios.request(options);
    return resp.data[0].translations[0].text as string;
  } catch (err) {
    return '网络错误';
  }
}
// test:
// fetchTranslated('hello, how are you!').then(console.log);
export default fetchTranslated;
