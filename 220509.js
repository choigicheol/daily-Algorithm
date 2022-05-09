// 연결된 정점들
// 문제
// 방향이 없는 간선들의 목록이 주어질 때, 연결된 정점의 컴포넌트(그룹들)가 몇 개인지 반환하는 함수를 작성하세요.

// 입력
// 인자 1: edges
// 2차원 Array 타입을 요소로 갖는 시작과 도착 정점이 담겨있는 배열들을 담고 있는 목록 (2차원 배열, 정수 요소)
// ex) [[0, 1], [1, 2], [3, 4]]

// 출력
// Number 타입을 리턴해야 합니다.
// 연결된 정점의 컴포넌트의 수를 숫자로 반환합니다.

// 주의 사항
// 주어진 간선은 무향입니다.
// [1, 2] 는 정점 1에서 정점 2로도 갈 수 있으며, 정점 2에서 정점 1로도 갈 수 있습니다.

// 입출력 예시
// const result = connectedVertices([
// 	[0, 1],
// 	[2, 3],
// 	[4, 5],
// ]);
// console.log(result); // 3

// const result = connectedVertices([
// 	[0, 1],
// 	[2, 3],
// 	[3, 4],
// 	[3, 5],
// ]);
// console.log(result); // 2

function connectedVertices(edges) {
  // 최대 vertex를 구한다
  let maxVertex = 0;

  edges.map((edge) => {
    const maxEdge = Math.max(...edge);
    if (maxVertex < maxEdge) maxVertex = maxEdge;
  });

  let adjList = {};

  for (let i = 0; i <= maxVertex; i++) {
    adjList[i] = [];
  }

  for (let i = 0; i < edges.length; i++) {
    adjList[edges[i][0]].push(edges[i][1]);
    adjList[edges[i][1]].push(edges[i][0]);
  }

  let visited = {};
  let count = 0;

  for (let vertex = 0; vertex <= maxVertex; vertex++) {
    if (!visited[vertex]) {
      bfs(adjList, vertex, visited);

      count++;
    }
  }
  return count;
}

// BFS
const bfs = (adjList, vertex, visited) => {
  // bfs는 가장 가까운 정점부터 탐색하기 때문에 queue를 사용한다.
  // queue에 vertex를 담는다.
  let queue = [vertex];

  // 해당 버텍스를 방문했기 때문에 visited에 담아 주고, 방문했다는 표시인 true를 할당한다.
  visited[vertex] = true;

  while (queue.length > 0) {
    // 그래프의 now 정점에 있는 간선들을 전부 순회한다.
    const now = queue.shift();

    for (let i = 0; i < adjList[now].length; i++) {
      // 만약, 해당 버텍스를 방문하지 않았다면 queue에 push 한다.
      // 해당 버텍스에 방문했다는 표시로 visited key에 해당 vertex를 담고 값에 true를 할당한다.
      if (!visited[adjList[now][i]]) {
        queue.push(adjList[now][i]);
        visited[adjList[now][i]] = true;
      }
    }
  }
};

// DFS
const dfs = (adjList, vertex, visited) => {
  // 해당 버텍스에 방문했다는 표시로 visited key에 vertex를 담고 값에 true를 할당한다.
  visited[vertex] = true;

  // 해당 버텍스의 모든 간선들을 전부 순회한다.
  for (let i = 0; i < adjList[vertex].length; i++) {
    // 만약 i번째 간선과 이어진 버텍스를 방문하지 않았다면
    if (!visited[adjList[vertex][i]]) {
      // dfs를 재귀호출하여 방문한다.
      dfs(adjList, adjList[vertex][i], visited);
    }
    // 모든 방문이 종료되면 다음 버텍스를 확인한다.
    // 재귀가 종료되면(한 정점에서 이어진 모든 간선들을 확인했다면) dfs 함수를 종료하고 카운트를 센다.
  }
};
