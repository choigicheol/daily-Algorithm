// 타겟 넘버
// 문제 설명
// n개의 음이 아닌 정수들이 있습니다. 이 정수들을 순서를 바꾸지 않고 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.

// -1+1+1+1+1 = 3
// +1-1+1+1+1 = 3
// +1+1-1+1+1 = 3
// +1+1+1-1+1 = 3
// +1+1+1+1-1 = 3
// 사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 주어지는 숫자의 개수는 2개 이상 20개 이하입니다.
// 각 숫자는 1 이상 50 이하인 자연수입니다.
// 타겟 넘버는 1 이상 1000 이하인 자연수입니다.
// 입출력 예
// numbers	target	return
// [1, 1, 1, 1, 1]	3	5
// [4, 1, 2, 1]	4	2
// 입출력 예 설명
// 입출력 예 #1

// 문제 예시와 같습니다.

// 입출력 예 #2

// +4+1-2+1 = 4
// +4-1+2-1 = 4
// 총 2가지 방법이 있으므로, 2를 return 합니다.

function solution(numbers, target) {
  var answer = 0;
  const PlusMinus = [1, -1];

  const DFS = (arr, sum = 0) => {
    if (!arr.length) {
      return sum;
    }

    const [head, ...tail] = arr;

    // ex) [4,1,2,1]의 경우
    //    1. DFS([1,2,1], 4)
    //    2. DFS([2,1], 4+1)
    //    3. DFS([1], 4+1+2)
    //    4. DFS([], 4+1+2+1)

    // 첫번째 전달인자로 들어온 배열이 빈배열이라면 그때까지의 합(sum)을 return
    // sum과 target이 일치하는지 비교 후( 8 === 4 ),
    //  4번으로 돌아가 DFS([], 4+1+2-1) 호출 후 비교, (마지막 1 +- 일때의 확인은 끝)

    //  3번으로 돌아가 DFS([1], 4+1-2) 호출
    //  DFS([], 4+1-2+1) 호출 후 비교
    //  DFS([], 4+1-2-1) 호출 후 비교
    // ...

    // 전체 경우를 순회하여 answer에 카운트한다.

    for (let i = 0; i < PlusMinus.length; i++) {
      const sumNum = sum + head * PlusMinus[i];
      const totalSum = DFS(tail, sumNum);
      if (totalSum === target) answer++;
    }
  };

  DFS(numbers);

  return answer;
}

solution([4, 1, 2, 1], 4);
