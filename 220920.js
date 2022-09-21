// JadenCase 문자열 만들기
// 문제 설명
// JadenCase란 모든 단어의 첫 문자가 대문자이고, 그 외의 알파벳은 소문자인 문자열입니다. 단, 첫 문자가 알파벳이 아닐 때에는 이어지는 알파벳은 소문자로 쓰면 됩니다. (첫 번째 입출력 예 참고)
// 문자열 s가 주어졌을 때, s를 JadenCase로 바꾼 문자열을 리턴하는 함수, solution을 완성해주세요.

// 제한 조건
// s는 길이 1 이상 200 이하인 문자열입니다.
// s는 알파벳과 숫자, 공백문자(" ")로 이루어져 있습니다.
// 숫자는 단어의 첫 문자로만 나옵니다.
// 숫자로만 이루어진 단어는 없습니다.
// 공백문자가 연속해서 나올 수 있습니다.
// 입출력 예
// s	return
// "3people unFollowed me"	"3people Unfollowed Me"
// "for the last week"	"For The Last Week"

// ---------------------------------------------------------------------------------------------------- //

/**
  문자열 s를 전체 소문자로 변경해준다.
  공백을 기준으로 split 해준다.
  split한 배열을 순회하면서 각 원소의 첫글자를 대문자로 변환해준다.
  공백을 기준으로 join하여 리턴한다.

  간단한 문제지만 문자열에 index로 직접 접근하는것과 charAt(index)을 이용해 접근하는것의 차이에 대해 느낀 문제
  조건중에 공백이 연속으로 올 수도 있다고 되어있다. (즉, 공백 하나를 기준으로 split 하면 배열의 원소중에 빈문자열("") 이 존재한다.)
  빈문자열의 [0] 인덱스로 접근할 시 undefined를 반환하기 때문에 toUpperCase() 메서드를 사용하면 에러가 발생한다.
  (그래서 빈문자열이 아닐때만 toUpperCase()를 하도록 조건문을 추가했다)
  반면 charAt(index)를 이용하면 인덱스가 문자열 길이를 초과하는 경우 빈문자열을 반환한다.
  빈문자열도 타입은 string 이기 때문에 string에 사용가능한 메서드를 사용하여도 에러가 발생하지않는다.
 */

//case1 문자열의 인덱스로 직접 접근할때
function solution(s) {
  const arrStr = s.toLowerCase().split(" ");
  return arrStr
    .map((s) => (s !== "" ? s[0].toUpperCase() + s.slice(1) : "")) //s ===  "" 이라면 s[0]이 undefined가 나오기 때문에 조건을 달아야한다.
    .join(" ");
}

// case2 charAt()을 이용해 해닥 인덱스의 문자를 반환 받을떄
function solution(s) {
  const arrStr = s.toLowerCase().split(" ");
  return arrStr.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" "); // s === ""이라면 ""을 반환하기때문에 조건을 추가할 필요가 없다.
}
