// 쇠막대기 성공

// 문제
// 여러 개의 쇠막대기를 레이저로 절단하려고 한다. 효율적인 작업을 위해서 쇠막대기를 아래에서 위로 겹쳐 놓고, 레이저를 위에서 수직으로 발사하여 쇠막대기들을 자른다. 쇠막대기와 레이저의 배치는 다음 조건을 만족한다.

// 쇠막대기는 자신보다 긴 쇠막대기 위에만 놓일 수 있다. - 쇠막대기를 다른 쇠막대기 위에 놓는 경우 완전히 포함되도록 놓되, 끝점은 겹치지 않도록 놓는다.
// 각 쇠막대기를 자르는 레이저는 적어도 하나 존재한다.
// 레이저는 어떤 쇠막대기의 양 끝점과도 겹치지 않는다.
// 아래 그림은 위 조건을 만족하는 예를 보여준다. 수평으로 그려진 굵은 실선은 쇠막대기이고, 점은 레이저의 위치, 수직으로 그려진 점선 화살표는 레이저의 발사 방향이다.

// 레이저는 여는 괄호와 닫는 괄호의 인접한 쌍 ‘( ) ’ 으로 표현된다. 또한, 모든 ‘( ) ’는 반드시 레이저를 표현한다.
// 쇠막대기의 왼쪽 끝은 여는 괄호 ‘ ( ’ 로, 오른쪽 끝은 닫힌 괄호 ‘) ’ 로 표현된다.

// 쇠막대기와 레이저의 배치를 나타내는 괄호 표현이 주어졌을 때, 잘려진 쇠막대기 조각의 총 개수를 구하는 프로그램을 작성하시오.

// 입력
// 한 줄에 쇠막대기와 레이저의 배치를 나타내는 괄호 표현이 공백없이 주어진다. 괄호 문자의 개수는 최대 100,000이다.

// 출력
// 잘려진 조각의 총 개수를 나타내는 정수를 한 줄에 출력한다.

// 예제 입력 1
// ()(((()())(())()))(())

// 예제 출력 1
// 17

// 예제 입력 2
// (((()(()()))(())()))(()())

// 예제 출력 2
// 24

// ----------------------------------------------------------------------------------------------------------------------------

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line); // 입력받은 여러줄, line
}).on("close", function () {
  let result = 0;
  let count = 0;

  const len = input[0].length;

  for (let i = 0; i < len; i++) {
    const popElement = input[0][i];
    if (popElement === "(") count++;
    else if (input[0][i - 1] === "(") {
      count--;
      result += count;
    } else {
      count--;
      result += 1;
    }
  }

  console.log(result);
});

// ----------------------------------------------------------------------------------------------------------------------------
// 오큰수 성공

// 시간 제한	메모리 제한	제출	정답	맞힌 사람	정답 비율
// 1 초	512 MB	73260	25616	18117	33.556%
// 문제
// 크기가 N인 수열 A = A1, A2, ..., AN이 있다. 수열의 각 원소 Ai에 대해서 오큰수 NGE(i)를 구하려고 한다. Ai의 오큰수는 오른쪽에 있으면서 Ai보다 큰 수 중에서 가장 왼쪽에 있는 수를 의미한다. 그러한 수가 없는 경우에 오큰수는 -1이다.

// 예를 들어, A = [3, 5, 2, 7]인 경우 NGE(1) = 5, NGE(2) = 7, NGE(3) = 7, NGE(4) = -1이다. A = [9, 5, 4, 8]인 경우에는 NGE(1) = -1, NGE(2) = 8, NGE(3) = 8, NGE(4) = -1이다.

// 입력
// 첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000,000)이 주어진다. 둘째 줄에 수열 A의 원소 A1, A2, ..., AN (1 ≤ Ai ≤ 1,000,000)이 주어진다.

// 출력
// 총 N개의 수 NGE(1), NGE(2), ..., NGE(N)을 공백으로 구분해 출력한다.

// 예제 입력 1
// 4
// 3 5 2 7

// 예제 출력 1
// 5 7 7 -1

// 예제 입력 2
// 4
// 9 5 4 8

// 예제 출력 2
// -1 8 8 -1

let inputs = [];

rl.on("line", function (line) {
  inputs.push(line); // 입력받은 여러줄, line
}).on("close", function () {
  const input = inputs[1].split(" ").map((el) => parseInt(el));
  const result = new Array(input.length).fill(-1);

  const stack = [input.pop()];
  let pointer = input.length - 1;

  while (input.length > 0) {
    const stackTop = stack[stack.length - 1];
    const inputEnd = input[input.length - 1];
    if (stackTop && stackTop > inputEnd) {
      result[pointer] = stackTop;
      stack.push(input.pop());
      pointer--;
    } else {
      stack.pop();
      if (!stack.length) {
        stack.push(input.pop());
        pointer--;
      }
    }
  }

  console.log(result.join(" "));
});
