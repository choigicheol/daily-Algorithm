// 짝지어 제거하기
// 문제 설명
// 짝지어 제거하기는, 알파벳 소문자로 이루어진 문자열을 가지고 시작합니다. 먼저 문자열에서 같은 알파벳이 2개 붙어 있는 짝을 찾습니다. 그다음, 그 둘을 제거한 뒤, 앞뒤로 문자열을 이어 붙입니다. 이 과정을 반복해서 문자열을 모두 제거한다면 짝지어 제거하기가 종료됩니다. 문자열 S가 주어졌을 때, 짝지어 제거하기를 성공적으로 수행할 수 있는지 반환하는 함수를 완성해 주세요. 성공적으로 수행할 수 있으면 1을, 아닐 경우 0을 리턴해주면 됩니다.

// 예를 들어, 문자열 S = baabaa 라면

// b aa baa → bb aa → aa →

// 의 순서로 문자열을 모두 제거할 수 있으므로 1을 반환합니다.

// 제한사항
// 문자열의 길이 : 1,000,000이하의 자연수
// 문자열은 모두 소문자로 이루어져 있습니다.
// 입출력 예
// s	result
// baabaa	1
// cdcd	0
// 입출력 예 설명
// 입출력 예 #1
// 위의 예시와 같습니다.
// 입출력 예 #2
// 문자열이 남아있지만 짝지어 제거할 수 있는 문자열이 더 이상 존재하지 않기 때문에 0을 반환합니다.

// ---------------------------------------------------------------------------------------------------- //

/*
  문제를 잘못이해해 주어진 s를 순회하며 짝지어져있는 부분을 제거하고, 
  while문을 통해 다시 순회하며 더이상 제거할 짝이 없을때까지 반복 했을 때, 효율성 테스트에서 시간초과가 발생하였다.

  stack을 써야겠다고 생각을 하고나니 굉장히 쉬웠던 문제.
  특히나 push나 pop은 시간복잡도가 N(1)이다.
*/

// 기본적으로 짝지어 제거하는 로직이기 때문에 s의 length가 홀수라면 0을 리턴한다.
// 빈 stack을 만든다.
// s 를 for문으로 순회한다.
// stack의 마지막 인덱스 value와 s[i]를 비교한다.
// 둘이 같다면 짝이 맞기 때문에 stack을 pop() 한다.
// 다르다면 s[i]를 stack에 push 한다.
// s의 루프가 끝나고 stack의 사이즈를 확인한다.
// 사이즈가 0이라면 짝이 전부 맞았기때문에 1을 리턴하고, 0보다 크다면 0을 리턴한다.

function solution(s) {
  if (s.length % 2 !== 0) return 0;

  const strLen = s.length;
  const stack = [];

  for (let i = 0; i < strLen; i++) {
    const stackSize = stack.length;
    const char = s[i];
    if (stack[stackSize - 1] === char) stack.pop();
    else stack.push(char);
    // if (stackSize > strLen - i) return 0; // s의 길이가 1,000,000 이하에서는 체감상 큰 차이는 없지만 최악의경우 최대 2배정도 빠르다.
  }
  return stack.length > 0 ? 0 : 1;
}
