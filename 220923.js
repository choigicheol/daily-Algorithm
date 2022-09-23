// [1차] 프렌즈4블록
// 문제 설명
// 프렌즈4블록
// 블라인드 공채를 통과한 신입 사원 라이언은 신규 게임 개발 업무를 맡게 되었다. 이번에 출시할 게임 제목은 "프렌즈4블록".
// 같은 모양의 카카오프렌즈 블록이 2×2 형태로 4개가 붙어있을 경우 사라지면서 점수를 얻는 게임이다.

// TTTANT
// RRFACC
// RRRFCC
// TRRRAA
// TTMMMF
// TMMTTJ
// 각 문자는 라이언(R), 무지(M), 어피치(A), 프로도(F), 네오(N), 튜브(T), 제이지(J), 콘(C)을 의미한다

// 만약 판이 위와 같이 주어질 경우,
// 라이언이 2×2로 배치된 7개 블록과 콘이 2×2로 배치된 4개 블록이 지워진다.
// 같은 블록은 여러 2×2에 포함될 수 있으며, 지워지는 조건에 만족하는 2×2 모양이 여러 개 있다면 한꺼번에 지워진다.
// 블록이 지워진 후에 위에 있는 블록이 아래로 떨어져 빈 공간을 채우게 된다.
// 만약 빈 공간을 채운 후에 다시 2×2 형태로 같은 모양의 블록이 모이면 다시 지워지고 떨어지고를 반복하게 된다.

// 입력으로 블록의 첫 배치가 주어졌을 때, 지워지는 블록은 모두 몇 개인지 판단하는 프로그램을 제작하라.

// 입력 형식
// 입력으로 판의 높이 m, 폭 n과 판의 배치 정보 board가 들어온다.
// 2 ≦ n, m ≦ 30
// board는 길이 n인 문자열 m개의 배열로 주어진다. 블록을 나타내는 문자는 대문자 A에서 Z가 사용된다.

// 출력 형식
// 입력으로 주어진 판 정보를 가지고 몇 개의 블록이 지워질지 출력하라.

// 입출력 예제
// m	n	board	answer
// 4	5	["CCBDE", "AAADE", "AAABF", "CCBBF"]	14
// 6	6	["TTTANT", "RRFACC", "RRRFCC", "TRRRAA", "TTMMMF", "TMMTTJ"]	15

// ---------------------------------------------------------------------------------------------------- //

// board[m-1], board[n-1]까지 각 문자열마다
// 아래[0,1] 옆[1,0] 대각선[1,1] 확인
// 제거할 곳이있다. 밑으로 내려오는걸 배열로 어떻게 다시 만들까
// [MMMM]
// [TTTT]
// [CCCC]
// [LLLL]
// [LLFF]
// 라고 했을때 [3,0], [3,1], [4,0], [4,1] 이 사라짐
// [0,0], [0,1], [1,0], [1,1], [2,0], [2,1]을 이동시켜야 한다 어떻게?

/*
굳이 이동을 시키지않고 제거됐다는 표시만 해놓고 다음 제거 될 블록을 찾는 알고리즘을 구현했지만
한개의 테스트 케이스를 통과하지 못했다.

이유) 제거된 블록만큼 위의 블록을 내리지 않으면 그 다음 제거되는 블록을 체크하기 어려운 케이스
(빈공간은 이전에 제거된 블록)
["HGN  HU",
 "CRS  HV",
 "UKH  VL",
 "MJH  QB",
 "GSH  OT",
 "MQM  JJ",
 "AGJ    ",
 "QUL    "]

다음 제거될 블록 = [2,2], [3,2], [0,3], [1,3] (H 블록)

*/

function solution(m, n, board) {
  let queue = [];
  let count = 0;
  let preCount = -1;
  const dir = [
    [0, 0],
    [1, 0],
    [0, 1],
    [1, 1],
  ];
  board = board.map((el) => el.split(""));

  // 하나의 블록을 기준으로 아래, 오른쪽대각선, 오른쪽 블록이 같은 블록이면 해당 블록들의 좌표를 반환
  const getPosition = (i, j) => {
    const blocks = [];
    const positions = [];
    dir.map((el) => {
      const [ny, nx] = el;
      blocks.push(board[i + ny][j + nx]);
      positions.push([i + ny, j + nx]);
    });
    const firstBlock = blocks[0];
    if (blocks.filter((el) => el === firstBlock).length === 4) return positions;
    return [];
  };

  // 블록의 제거가 발생하지 않으면 while문 중단
  while (count !== preCount) {
    preCount = count;

    // board 전체를 확인하여 같은 블록 4개가 있다면 해당 좌표를 queue에 넣는다.
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (board[i][j]) {
          queue.push(...getPosition(i, j));
        }
      }
    }

    // queue에 담긴 블록을 제거하고 queue 초기화 (이미 제거된 블록이라면 카운트 하지 않는다)
    queue.map((el) => {
      const [y, x] = el;
      if (board[y][x]) {
        board[y][x] = false;
        count++;
      }
    });
    queue = [];

    // 보드판을 90도 회전시킨다.
    let newBoard = new Array(n).fill(0).map((el) => new Array(m).fill(0));
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        newBoard[i][j] = board[j][i];
      }
    }

    // 제거된 블록의 공간을 왼쪽으로 전부 옮긴다.
    newBoard = newBoard.map((el) => {
      const restBlock = el.filter((block) => block !== false);
      for (let i = restBlock.length; i < m; i++) {
        restBlock.unshift(false);
      }
      return restBlock;
    });

    // 보드판을 다시 되돌린다.
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        board[i][j] = newBoard[j][i];
      }
    }
  }

  return count;
}
