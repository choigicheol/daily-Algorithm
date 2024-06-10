// 1. ')' 로 시작하면 애초에 성립이 안된다 return false;
// 2. for문으로 s를 전체 순회하면서 count 변수에 '(' = 1, ')' = -1씩 더해준다.
// 3. 짝이 맞는 괄호라면 카운트 하는 과정에서 음수가 나올 수 없다. 음수가 나온다면 return false;
// 4. 전체를 순회하고 count가 0보다 크다면 짝이 맞지않는 괄호이다. return false;
// 여기까지만 구현해도 알고리즘은 통과된다.

// '('만 10만개라면? 꼭 끝까지 순회해야 짝이 맞지 않는다는걸 알 수 있을까?
// ㄴ> s의 처음과 끝은 '(' , ')' 이여야 한다. (1번 과정 수정)

// '(((((((((((((((()'와 같이 마지막만 ')' 이라면?
// for문 중간에 알 수 있는 방법이 없을까?
// replace를 활용해서 풀어보려고 했지만 효율성에서 시간초과.
// '()'를 ""로 치환할때 '()'를 검색하기위해 s의 인덱스를 여러번 순회하기때문에 시간초과인듯하다.

function solution(s) {
  // let count = 0;
  // const bracket = { "(": 1, ")": -1 };
  // const strLen = s.length;

  // if (s[0] !== "(" || s[strLen - 1] !== ")") return false;

  // for (let i = 0; i < strLen; i++) {
  //   count += bracket[s[i]];
  //   if (count < 0) return false;
  // }

  // if (count > 0) return false;
  // return true;

  // ----- 위와 기본적인 구조는 같다. -----
  /*  stack을 배열로 push, pop을 했다가
        stack에 있는 괄호보다 남은 괄호가 적을때 더 순회하지않고 중간에 멈추기 위한 구현에서 
        stack.length를 계속 참조하다보니 효율성 테스트에서 시간초과가 발생했다.
        stack에는 '('만 들어가기 때문에 객체로 숫자로만 표현하였다. */

  const strLen = s.length;

  if (s[0] !== "(" || s[strLen - 1] !== ")") return false;

  const stack = { leftBracket: 0 };
  for (let i = 0; i < strLen; i++) {
    if (s[i] === ")") {
      stack.leftBracket--;
      if (stack.leftBracket < 0) return false;
    } else {
      stack.leftBracket++;
      if (strLen - i < stack.leftBracket) return false;
    }
  }
  if (stack.leftBracket > 0) return false;
  return true;
}
