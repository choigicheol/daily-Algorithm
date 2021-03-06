// 슈퍼 게임 개발자 오렐리는 큰 고민에 빠졌다. 그녀가 만든 프랜즈 오천성이 대성공을 거뒀지만, 요즘 신규 사용자의 수가 급감한 것이다. 원인은 신규 사용자와 기존 사용자 사이에 스테이지 차이가 너무 큰 것이 문제였다.

// 이 문제를 어떻게 할까 고민 한 그녀는 동적으로 게임 시간을 늘려서 난이도를 조절하기로 했다. 역시 슈퍼 개발자라 대부분의 로직은 쉽게 구현했지만, 실패율을 구하는 부분에서 위기에 빠지고 말았다. 오렐리를 위해 실패율을 구하는 코드를 완성하라.

// 실패율은 다음과 같이 정의한다.
// 스테이지에 도달했으나 아직 클리어하지 못한 플레이어의 수 / 스테이지에 도달한 플레이어 수
// 전체 스테이지의 개수 N, 게임을 이용하는 사용자가 현재 멈춰있는 스테이지의 번호가 담긴 배열 stages가 매개변수로 주어질 때, 실패율이 높은 스테이지부터 내림차순으로 스테이지의 번호가 담겨있는 배열을 return 하도록 solution 함수를 완성하라.

// 제한사항
// 스테이지의 개수 N은 1 이상 500 이하의 자연수이다.
// stages의 길이는 1 이상 200,000 이하이다.
// stages에는 1 이상 N + 1 이하의 자연수가 담겨있다.
// 각 자연수는 사용자가 현재 도전 중인 스테이지의 번호를 나타낸다.
// 단, N + 1 은 마지막 스테이지(N 번째 스테이지) 까지 클리어 한 사용자를 나타낸다.
// 만약 실패율이 같은 스테이지가 있다면 작은 번호의 스테이지가 먼저 오도록 하면 된다.
// 스테이지에 도달한 유저가 없는 경우 해당 스테이지의 실패율은 0 으로 정의한다.
// 입출력 예
// N	stages	result
// 5	[2, 1, 2, 6, 2, 4, 3, 3]	[3,4,2,1,5]
// 4	[4,4,4,4,4]	[4,1,2,3]
// 입출력 예 설명
// 입출력 예 #1
// 1번 스테이지에는 총 8명의 사용자가 도전했으며, 이 중 1명의 사용자가 아직 클리어하지 못했다. 따라서 1번 스테이지의 실패율은 다음과 같다.

// 1 번 스테이지 실패율 : 1/8
// 2번 스테이지에는 총 7명의 사용자가 도전했으며, 이 중 3명의 사용자가 아직 클리어하지 못했다. 따라서 2번 스테이지의 실패율은 다음과 같다.

// 2 번 스테이지 실패율 : 3/7
// 마찬가지로 나머지 스테이지의 실패율은 다음과 같다.

// 3 번 스테이지 실패율 : 2/4
// 4번 스테이지 실패율 : 1/2
// 5번 스테이지 실패율 : 0/1
// 각 스테이지의 번호를 실패율의 내림차순으로 정렬하면 다음과 같다.

// [3,4,2,1,5]
// 입출력 예 #2

// 모든 사용자가 마지막 스테이지에 있으므로 4번 스테이지의 실패율은 1이며 나머지 스테이지의 실패율은 0이다.

// [4,1,2,3]

function solution(N, stages) {
  let result = [];
  let failStage = {};
  let numOfUsers = stages.length;

  for (let i = 1; i <= N; i++) {
    failStage[i] = 0;
  }

  // 유저들이 머물고 있는 스테이지에 몇명이 있는지 구한다.
  stages.map((userStage) => {
    if (userStage <= N) {
      return failStage[userStage]++;
    }
  });

  // 각 스테이지의 실패율을 arr에 담아준다.
  let arrFailPer = [];
  for (let key in failStage) {
    // TODO: 퍼센트를 그냥 숫자로 담았을때는 통과 안되는 테스트 케이스가 있다.
    // TODO: 문자열로 변환 후 넘겨주면 전체 통과 이유는?
    // TODO: => 유저들이 낮은 스테이지에 모여있으면 높은 스테이지 실패율이 0/0이 되어서 NaN가 할당되어서 생기는 문제로 예상(0/0 = NaN)
    // TODO: 값이 없으면 0을 할당하도록 수정하니까 전체 통과 됨

    // const percent = String(failStage[key] / numOfUsers);
    const percent = failStage[key] / numOfUsers || 0;
    arrFailPer.push(percent);
    numOfUsers -= failStage[key];
  }

  // 퍼센트 배열을 복사하고 내림차순 sort 해준다.
  let sortFailPer = [...arrFailPer];
  sortFailPer.sort((a, b) => b - a);

  // sort한 배열을 map 사용하여 실패율이 높은 순으로 arrFailPer 배열에서 idx를 찾는다(idx+1 = 스테이지);
  sortFailPer.map((sortPer) => {
    const stageIdx = arrFailPer.indexOf(sortPer);
    result.push(stageIdx + 1);
    arrFailPer[stageIdx] = null;
  });
  return result;
}

// * 보기 좋았던 좀 더 간결한 코드
// (이중배열로 스테이지와 실패율을 같이 담고 sort할때 a[1]과 같은 식으로 이중배열안의 실패율율 기준으로 sort한 후 결과값 return은 map을 이용하여 스테이지만 return)
// function solution(N, stages) {
//   let result = [];
//   for (let i = 1; i <= N; i++) {
//     let reach = stages.filter((x) => x >= i).length;
//     let curr = stages.filter((x) => x === i).length;
//     result.push([i, curr / reach]);
//   }
//   result.sort((a, b) => b[1] - a[1]);
//   return result.map((x) => x[0]);
// }
