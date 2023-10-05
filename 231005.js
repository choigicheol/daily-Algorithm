// 광물 캐기
// 문제 설명
// 마인은 곡괭이로 광산에서 광석을 캐려고 합니다.
// 마인은 다이아몬드 곡괭이, 철 곡괭이, 돌 곡괭이를 각각 0개에서 5개까지 가지고 있으며, 곡괭이로 광물을 캘 때는 피로도가 소모됩니다.

// 예를 들어, 철 곡괭이는 다이아몬드를 캘 때 피로도 5가 소모되며, 철과 돌을 캘때는 피로도가 1씩 소모됩니다.
// 각 곡괭이는 종류에 상관없이 광물 5개를 캔 후에는 더 이상 사용할 수 없습니다.

// 마인은 다음과 같은 규칙을 지키면서 최소한의 피로도로 광물을 캐려고 합니다.

// 사용할 수 있는 곡괭이중 아무거나 하나를 선택해 광물을 캡니다.
// 한 번 사용하기 시작한 곡괭이는 사용할 수 없을 때까지 사용합니다.
// 광물은 주어진 순서대로만 캘 수 있습니다.
// 광산에 있는 모든 광물을 캐거나, 더 사용할 곡괭이가 없을 때까지 광물을 캡니다.
// 즉, 곡괭이를 하나 선택해서 광물 5개를 연속으로 캐고, 다음 곡괭이를 선택해서 광물 5개를 연속으로 캐는 과정을 반복하며,
// 더 사용할 곡괭이가 없거나 광산에 있는 모든 광물을 캘 때까지 과정을 반복하면 됩니다.

// 마인이 갖고 있는 곡괭이의 개수를 나타내는 정수 배열 picks와 광물들의 순서를 나타내는 문자열 배열 minerals가 매개변수로 주어질 때,
// 마인이 작업을 끝내기까지 필요한 최소한의 피로도를 return 하는 solution 함수를 완성해주세요.

// 제한사항
// picks는 [dia, iron, stone]과 같은 구조로 이루어져 있습니다.
// 0 ≤ dia, iron, stone ≤ 5
// dia는 다이아몬드 곡괭이의 수를 의미합니다.
// iron은 철 곡괭이의 수를 의미합니다.
// stone은 돌 곡괭이의 수를 의미합니다.
// 곡괭이는 최소 1개 이상 가지고 있습니다.

// 5 ≤ minerals의 길이 ≤ 50
// minerals는 다음 3개의 문자열로 이루어져 있으며 각각의 의미는 다음과 같습니다.
// diamond : 다이아몬드
// iron : 철
// stone : 돌

// 입출력 예
// picks	minerals	result
// [1, 3, 2]	["diamond", "diamond", "diamond", "iron", "iron", "diamond", "iron", "stone"]	12
// [0, 1, 1]	["diamond", "diamond", "diamond", "diamond", "diamond", "iron", "iron", "iron", "iron", "iron", "diamond"]	50

// 입출력 예 설명

// 입출력 예 #1
// 다이아몬드 곡괭이로 앞에 다섯 광물을 캐고 철 곡괭이로 남은 다이아몬드, 철, 돌을 1개씩 캐면 12(1 + 1 + 1 + 1+ 1 + 5 + 1 + 1)의 피로도로 캘 수 있으며 이때가 최소값입니다.

// 입출력 예 #2
// 철 곡괭이로 다이아몬드 5개를 캐고 돌 곡괭이고 철 5개를 캐면 50의 피로도로 캘 수 있으며, 이때가 최소값입니다.

// --------------------------------------------------------------------------------------------------------------------------------

function solution(picks, minerals) {
  let answer = 0;

  // 다이아 곡괭이가 충분하다면 피로도는 minerals.length만큼이 된다.
  if (minerals.length / 5 < picks[0]) return minerals.length;

  // 그렇지 않다면 먼저 곡괭이의 총 갯수를 구한다.
  let sumPicks = picks.reduce((acc, cur) => acc + cur);

  // minerals를 곡괭이 갯수만큼 5개씩 나누어 분할한다.
  const splitMinerals = [];
  while (minerals.length && sumPicks) {
    splitMinerals.push(minerals.splice(0, 5));
    sumPicks--;
  }

  // 분할한 광물의 그룹갯수
  let mineralsLength = splitMinerals.length;

  // 사용할 곡괭이의 수 구하기 (5개분할 광물그룹이 2개라면 곡괭이는 2개만 사용하면 된다)
  const usePicks = [];

  picks.map((pick, idx) => {
    if (mineralsLength - pick > 0) {
      usePicks.unshift(pick);
      mineralsLength -= pick;
    } else {
      usePicks.unshift(mineralsLength);
      mineralsLength = 0;
    }
  });

  // cost 관련 테이블
  // 돌곡괭이의 경우 cost의 0~2 인덱스까지 사용
  // 철곡괭이의 경우 cost의 1~3 인덱스까지 사용
  // 다이아몬드곡괭이의 경우 cost의 2~4 인덱스까지 사용
  // costId의 경우 해당 광물을 캐는데 발생하는 cost비용이 위의 cost범위에서 n번째임을 나타낸다.
  const costId = { diamond: 0, iron: 1, stone: 2 };
  const cost = [25, 5, 1, 1, 1];

  // cost가 제일 높게나오는 하위 곡괭이부터 5개로묶은 광물 그룹중에서 제일 적게 cost가 발생하는 구역을 찾고 해당 광물들을 캔다.
  // (다이아는 언제나 cost가 1씩 들기 때문에 돌, 철곡괭이 순으로 광물 그룹중 제일 적게 비용이 발생하는 그룹의 광물을 캔다. 이후 해당 광물그룹은 삭제)

  for (let i = 0; i < usePicks.length - 1; i++) {
    let minCostIndex = 0;
    while (usePicks[i] !== 0) {
      let minCost = Infinity;
      splitMinerals.map((minerals, idx) => {
        const sumCost = minerals.reduce(
          (acc, cur) => acc + cost[costId[cur] + i],
          0
        );
        if (sumCost < minCost) {
          minCost = sumCost;
          minCostIndex = idx;
        }
      });
      usePicks[i]--;
      answer += minCost;
      splitMinerals.splice(minCostIndex, 1);
    }
  }
  //  돌, 철 곡괭이의 최소 비용만 더해주었고 남은 광물들은 전부 다이아곡괭이로 캘것이기 때문에 length만큼 더해주기만 하면 된다.
  answer += splitMinerals.reduce((acc, cur) => acc + cur.length, 0);
  return answer;
}
