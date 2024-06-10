// 앞뒤를 뒤집어도 똑같은 문자열을 팰린드롬(palindrome)이라고 합니다.
// 문자열 s가 주어질 때, s의 부분문자열(Substring)중 가장 긴 팰린드롬의 길이를 return 하는 solution 함수를 완성해 주세요.

// 예를들면, 문자열 s가 "abcdcba"이면 7을 return하고 "abacde"이면 3을 return합니다.

// 제한사항
// 문자열 s의 길이 : 2,500 이하의 자연수
// 문자열 s는 알파벳 소문자로만 구성
// 입출력 예
// s	answer
// "abcdcba"	7
// "abacde"	3
// 입출력 예 설명
// 입출력 예 #1
// 4번째자리 'd'를 기준으로 문자열 s 전체가 팰린드롬이 되므로 7을 return합니다.

// 입출력 예 #2
// 2번째자리 'b'를 기준으로 "aba"가 팰린드롬이 되므로 3을 return합니다.

// ---------------------------------------------------------------------------------------------------- //

// dp를 이용한다.
// 문제를 작은 부분으로 나누어 큰부분으로 생각할때 중복되는 체크가 발생하는 경우 dp를 생각해 보아야한다

// 팰린드롬인지 확인하는 방법
// 양끝이 같은가? 그다음 양끝이 같은가? 그다음 양끝이 같은가? ... 와같은 비교를 한다.

// "abcdefghijkldbaabclkjihgfedcba" 라는 문자열이 주어진다면 어떨까
// "abcdefghijkld["baab"]clkjihgfedcba" 가장 긴 팰린드롬은 "baab" 이다.

// 하지만 긴 문자열부터 확인하게 되면
// "abcdefghijkld["baab"]clkjihgfedcba"
// "bcdefghijkld["baab"]clkjihgfedcb"
// "cdefghijkld["baab"]clkjihgfedc"
// "defghijkld["baab"]clkjihgfed"
// "efghijkld["baab"]clkjihgfe"
// ...
// 와 같은 경우에 계속해서 의미없는 팰린드롬 검사를 계속 하게 될 것이다.

// 작은 문자열부터 확인한다면?

// 확인할 글자수를 늘리면서 확인해본다.

// 1단계
// "a", "b", "c", "d", "c", "b", "a"
// 자기자신은 팰린드롬이다. start, end가 같은가? yes

// 2단계
// "ab" => start, end가 같은가? no
// "bc" => start, end가 같은가? no
// "cd" => start, end가 같은가? no
// "dc" => start, end가 같은가? no
// "cb" => start, end가 같은가? no
// "ba" => start, end가 같은가? no

// 3단계
// "abc" => start, end가 같은가? no
// "bcd" => start, end가 같은가? no
// "cdc" => start, end가 같은가? yes => start+1, end-1은 같은가? yes
// "dcb" => start, end가 같은가? no
// "cba" => start, end가 같은가? no
// 아직 3글자가 제일 긴 팰린드롬이라는 확신은 없다 더 확인해본다.

// 4단계
// "abcd" => no
// "bcdc" => no
// "cdcb" => no
// "dcba" => no

// 5단계
// "abcdc" => no
// "bcdcb" => start, end가 같은가? yes => start+1, end-1은 같은가? yes => start+2, end-2는 같은가? yes
// "cdcba" => no
// 아직 5글자가 제일 긴 팰린드롬이라는 확신은 없다 더 확인해본다.

// 6단계
// "abcdcb" => no
// "bcdcba" => no

// 7단계
// "abcdcba" => start, end가 같은가? yes => start+1, end-1은 같은가? yes => start+2, end-2는 같은가? yes => start+3, end-3은 같은가? yes

// 3단계 5단계 7단계에서 중복되는 검사가 발생한다.

// 5단계에서 start, end가 같기때문에 팰린드롬 후보이다.
// 그 다음 양끝을 검사하는것은 3단계에서 이뤄진 검사이다. 3단계의 검사 결과가 저장되어있다면 더이상 검사 하지 않고도 팰린드롬이라고 확신 할 수 있다.
// 마찬가지로 7단계에서도 5단계의 결과를 저장되어있다면 7단계의 start, end만 비교하고도 팰린드롬이라는 확신을 얻을 수 있다.

// dp 배열을 만들어준다.
// 2중배열로 [i][j] 인덱스가 의미하는 바는 인자로 전달받은 s의 [i]인덱스부터 [j]인덱스까지의 글자가 팰린드롬인지 나타낸다.(boolean)
// 1글자, 2글자는 바로 비교가 가능하기 때문에 s를 for문을 통해 순회하며 해당하는 dp 배열에 팰린드롬이라면 true로 변경한다.
// 3글자부터는 start, end가 같은 문자열이라면, dp[start+1][end-1] 값만 확인하면 된다.
// s[start] === s[end] && dp[start+1][end-1] === true 라면 dp[start][end]를 true로 저장하고 가장긴 문자열길이를 해당 길이로 변경해준다.
// 아직 가장 긴 팰린드롬이라는 확신이 없기 때문에 for문은 끝까지 검사를 진행 한다.

function solution(s) {
  let answer = 1;
  const len = s.length;
  //     dp의 기본값은 false로 채워준다 2중배열
  //     dp[i][j] => i번째 인덱스에서 j번째 인덱스까지의 문자열이 팰린드롬인지 나타낸다. true = 팰린드롬
  const dp = new Array(s.length)
    .fill(0)
    .map((el) => new Array(len).fill(false));

  //     문자열 1개인 자기자신은 팰린드롬이기 때문에 true,
  //     바로 옆자리 문자열이 같다면 두글자짜리 팰린드롬이기 때문에 true
  for (let i = 0; i < len; i++) {
    dp[i][i] = true;
    if (s[i] === s[i + 1]) {
      dp[i][i + 1] = true;
      answer = 2;
    }
  }

  //    i = 몇글자짜리 팰린드롬을 찾을것인지
  for (let i = 3; i <= len; i++) {
    for (let start = 0; start <= len - i; start++) {
      const end = start + i - 1;
      if (s[start] === s[end] && dp[start + 1][end - 1]) {
        dp[start][end] = true;
        answer = i;
      }
    }
  }

  return answer;
}
