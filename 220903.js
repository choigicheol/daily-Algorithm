/*
첫번째 단어는 무엇을 말하더라도 탈락할 수가 없기때문에 이전 단어들을 모아두는 객체(단어장)를 생성하면서 첫단어를 넣어준다.
  ㄴ> (for문에서 preWord를 참조하는 과정에 undefined 조건을 생략하고싶어서)

words를 for문으로 순회하면서  단어장 내에 현재 단어가 들어있거나, 끝말잇기가 안되는 조건에 해당한다면
answer에 번호와 차례를 할당하고 for문을 끝낸다.

위에 부합하는 조건이 없다면 단어장에 현재 단어를 추가 한다.

*/
function solution(n, words) {
  let answer = [0, 0];
  const preWords = {};
  preWords[words[0]] = true;

  for (let i = 1; i < words.length; i++) {
    const preWord = words[i - 1];
    const curWord = words[i];

    if (preWords[curWord] || preWord[preWord.length - 1] !== curWord[0]) {
      answer = [(i % n) + 1, Math.floor(i / n) + 1];
      break;
    }
    preWords[words[i]] = true;
  }

  return answer;
}
