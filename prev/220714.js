function solution(maps) {
  // queue 배열은 출발점인 [[0,0, count = 0]]으로 시작한다.
  // queue를 shift()하여 동서남북 이동 가능한 칸을 찾아 queue에 push한다.
  // queue에 push 할때 count++ 를 해준다. 여러갈래 길이 있더라도 같은 count 값이 queue에 들어간다.
  // 원래 있던 칸은 이미 지나온 길이기 때문에 방문했다는 표시를 한다.

  // 동서남북 이동 가능 한곳을 for문으로 찾기 위한 배열
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  const rowLen = maps.length;
  const colLen = maps[0].length;

  const isLoad = (row, col) => {
    if (row < 0 || col < 0 || row >= rowLen || col >= colLen) return false;
    else {
      if (maps[row][col] === 1) {
        return true;
      }
    }
  };

  const queue = [[0, 0, 1]];
  maps[0][0] = 0;

  while (queue.length > 0) {
    let [row, col, count] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const [dirRow, dirCol] = directions[i];
      const nextRow = row + dirRow;
      const nextCol = col + dirCol;
      if (nextRow === rowLen - 1 && nextCol === colLen - 1) {
        return ++count;
      }
      if (isLoad(nextRow, nextCol)) {
        queue.push([nextRow, nextCol, count + 1]);
        maps[row][col] = 0;
      }
    }
  }
  return -1;
}

// 정확성테스트 good, 효율성 테스트 bad
