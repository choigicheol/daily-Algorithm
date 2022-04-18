// 섬 연결하기
// n개의 섬 사이에 다리를 건설하는 비용(costs)이 주어질 때, 최소의 비용으로 모든 섬이 서로 통행 가능하도록 만들 때 필요한 최소 비용을 return 하도록 solution을 완성하세요.

// 다리를 여러 번 건너더라도, 도달할 수만 있으면 통행 가능하다고 봅니다. 예를 들어 A 섬과 B 섬 사이에 다리가 있고, B 섬과 C 섬 사이에 다리가 있으면 A 섬과 C 섬은 서로 통행 가능합니다.

// 제한사항

// 섬의 개수 n은 1 이상 100 이하입니다.
// costs의 길이는 ((n-1) * n) / 2이하입니다.
// 임의의 i에 대해, costs[i][0] 와 costs[i] [1]에는 다리가 연결되는 두 섬의 번호가 들어있고, costs[i] [2]에는 이 두 섬을 연결하는 다리를 건설할 때 드는 비용입니다.
// 같은 연결은 두 번 주어지지 않습니다. 또한 순서가 바뀌더라도 같은 연결로 봅니다. 즉 0과 1 사이를 연결하는 비용이 주어졌을 때, 1과 0의 비용이 주어지지 않습니다.
// 모든 섬 사이의 다리 건설 비용이 주어지지 않습니다. 이 경우, 두 섬 사이의 건설이 불가능한 것으로 봅니다.
// 연결할 수 없는 섬은 주어지지 않습니다.
// 입출력 예

// n	costs	return
// 4	[[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]]	4

function solution(n, costs) {
  // n = 1이면 바로 return
  if (n <= 1) {
    return costs[0][2];
  }

  // 가장 적은 비용부터 costs를 정렬하고 적은 비용의 다리 건설부터 하나씩 진행
  costs.sort((a, b) => a[2] - b[2]);

  // idx가 섬 번호, value가 부모노드(연결된 섬)
  // 다리를 연결하기전에 각 섬은 자기자신을 부모노드로 가진다.
  // 다리를 연결하면 큰 섬의 부모를 작은 섬의 부모로 교체한다.(다리가 연결되었다는 의미)
  let arrParent = Array(n)
    .fill(0)
    .map((el, idx) => idx);

  // 0,1 이 연결되고 2,3이 연결된 상태에서 0,2가 연결된다면?
  // 2를 부모로 가지고있는(2와 연결되어있는) 3 또한 0으로 바뀌어야한다.
  const changeParent = (secondPar, firstPar) => {
    for (let i = 0; i < arrParent.length; i++) {
      if (arrParent[i] === secondPar) {
        arrParent[i] = firstPar;
      }
    }
  };

  let sum = 0;
  let edge = 0;

  for (let i = 0; i < costs.length; i++) {
    let firstParent = arrParent[costs[i][0]];
    let secondParent = arrParent[costs[i][1]];

    // 전체가 연결되려면 다리는 n-1개 필요하다.
    if (edge === n - 1) {
      break;
    }

    if (firstParent !== secondParent) {
      if (arrParent.filter((el) => el === secondParent).length) {
        changeParent(secondParent, firstParent);
      }
      secondParent = firstParent;
      sum += costs[i][2];
      edge++;
    }
  }
  return sum;
}
