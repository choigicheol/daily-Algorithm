// JadenCase 문자열 만들기

// 문제 설명
// JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다.
// 단, 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
// 문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.

// 제한 조건
// s는 길이 1 이상 200 이하인 문자열입니다.
// s는 알파벳과 숫자, 공백문자(" ")로 이루어져 있습니다.
// 숫자는 단어의 첫 문자로만 나옵니다.
// 숫자로만 이루어진 단어는 없습니다.
// 공백문자가 연속해서 나올 수 있습니다.

// 입출력 예
// "3people unFollowed me" =>	"3people Unfollowed Me"
// "for the last week" =>	"For The Last Week"

// 문자열을 split()을 이용해 공백으로 기준으로 분리해 새로운 배열로 만들어준다
// 배열을 순회하면서 문자열의 맨앞자리는 대문자로 나머지는 소문자로 변환하고 합쳐준다
// 배열을 join을 이용해 공백을 기준으로 다시 문자열로 합쳐주고 반환한다.

// ** str을 인덱스로 접근하면 ex) str[0].toUpperCase()
//    str이 빈문자열일 경우 undefined에 string 타입의 메서드인 toUpperCase()를 사용하게 되어 런타임 에러가 발생한다.
//    charAt()과 substring()을 이용해 문자열에 접근하면 "" 빈문자열을 반환해서 에러가 발생하지않는다. (slice를 이용해도 "" 반환)

function solution(s) {
  const arrStr = s.split(" ");
  return arrStr
    .map((str) => {
      return `${str.charAt(0).toUpperCase()}${str.substring(1).toLowerCase()}`;
    })
    .join(" ");
}

// str[0] 인덱스로 접근하는경우 조건문으로 str의 길이가 1이상일때만 처리하도록 한다.

// function solution(s) {
//   const arrStr = s.split(" ");
//   return arrStr
//     .map((str) => {
//       if(str.length) {
//         return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
//       }
//     })
//     .join(" ");
// }
