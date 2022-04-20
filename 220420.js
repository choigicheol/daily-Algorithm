// 네오와 프로도가 숫자놀이를 하고 있습니다. 네오가 프로도에게 숫자를 건넬 때 일부 자릿수를 영단어로 바꾼 카드를 건네주면 프로도는 원래 숫자를 찾는 게임입니다.

// 다음은 숫자의 일부 자릿수를 영단어로 바꾸는 예시입니다.

// 1478 → "one4seveneight"
// 234567 → "23four5six7"
// 10203 → "1zerotwozero3"
// 이렇게 숫자의 일부 자릿수가 영단어로 바뀌어졌거나, 혹은 바뀌지 않고 그대로인 문자열 s가 매개변수로 주어집니다. s가 의미하는 원래 숫자를 return 하도록 solution 함수를 완성해주세요.

// 참고로 각 숫자에 대응되는 영단어는 다음 표와 같습니다.

// 숫자	영단어
// 0	zero
// 1	one
// 2	two
// 3	three
// 4	four
// 5	five
// 6	six
// 7	seven
// 8	eight
// 9	nine
// 제한사항
// 1 ≤ s의 길이 ≤ 50
// s가 "zero" 또는 "0"으로 시작하는 경우는 주어지지 않습니다.
// return 값이 1 이상 2,000,000,000 이하의 정수가 되는 올바른 입력만 s로 주어집니다.
// 입출력 예
// s	result
// "one4seveneight"	1478
// "23four5six7"	234567
// "2three45sixseven"	234567
// "123"	123
// 입출력 예 설명
// 입출력 예 #1

// 문제 예시와 같습니다.
// 입출력 예 #2

// 문제 예시와 같습니다.
// 입출력 예 #3

// "three"는 3, "six"는 6, "seven"은 7에 대응되기 때문에 정답은 입출력 예 #2와 같은 234567이 됩니다.
// 입출력 예 #2와 #3과 같이 같은 정답을 가리키는 문자열이 여러 가지가 나올 수 있습니다.
// 입출력 예 #4

// s에는 영단어로 바뀐 부분이 없습니다.
// 제한시간 안내
// 정확성 테스트 : 10초

//  TODO: join()을 자세히 알고 있어야 풀 수 있는 방식
// join은 구문은 arr.join([separator])
// separator
// 1. 생략하면 배열의 요소들이 쉼표로 구분된다.
// 2. 빈 문자열이면 모든 요소들 사이에 아무 문자도 없이 연결된다.
// 3. 배열의 각 요소를 구분할 문자열을 지정할 수 도 있다.

function solution(s) {
  let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

  for (let i = 0; i < numbers.length; i++) {
    s = s.split(numbers[i]).join(i);
  }
  return Number(s);
}

//  TODO: replace()를 이용해 푼 방식
// function solution(s) {
//     let numWord = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
//     for(let i = 0; i < numWord.length; i++){
//         s = s.replace(new RegExp(numWord[i], 'g'), i);
//     }
//     return Number(s);
// }

//  TODO: 0~9 정규표현식만을 이용해 푼 방식
// function solution(s) {
//     let result = ""
//     const findNum = {
//         "ze" : [0,4],
//         "on" : [1,3],
//         "tw" : [2,3],
//         "th" : [3,5],
//         "fo" : [4,4],
//         "fi" : [5,4],
//         "si" : [6,3],
//         "se" : [7,5],
//         "ei" : [8,5],
//         "ni" : [9,4],
//     }

//     let num = /^[0-9]$/;
//     for(let i = 0; i < s.length; i++){
//         if(num.test(s[i])){
//             result += s[i];
//         } else {
//             result += findNum[s[i]+s[i+1]][0];
//             i += findNum[s[i]+s[i+1]][1] -1;
//         }
//     }
//     return Number(result);
// }
