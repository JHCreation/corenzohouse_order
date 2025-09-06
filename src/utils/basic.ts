import queryString from "query-string";

export const makeNewParams= (key, value)=> {
    const currentQuery = queryString.parse(window.location.search);
    console.log(currentQuery)
    const newParams = { [key]: value }
    const updatedQuery = { ...currentQuery, ...newParams }
    const newQueryString = queryString.stringify(updatedQuery)
    return newQueryString
}

function hasFinalConsonant(koreanChar) {
    const code = koreanChar.charCodeAt(0) - 0xac00;
    return code % 28 !== 0;
}

export function attachJosa(word, josaPair) {
    if (!word) return "";
    const lastChar = word[word.length - 1];
    if (!/[가-힣]/.test(lastChar)) return word + josaPair[1]; // 한글 아니면 뒤 조사(default)

    return (hasFinalConsonant(lastChar) ? josaPair[0] : josaPair[1]);
}

export function removeParentheticalText (text) {
  const regex = /\s*\(.*\)/;
  const result = text.replace(regex, "");
  return result
}

export const stringToParse= (str)=> {
  let parse
  try {
    parse= JSON.parse(str)
  } catch (error) {
    parse= str
  }
  return parse
} 

console.log(attachJosa("사과", ["을", "를"])); // 사과를