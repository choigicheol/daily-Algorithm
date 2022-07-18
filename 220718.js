// 거리두기 확인하기
// 문제 설명
// 개발자를 희망하는 죠르디가 카카오에 면접을 보러 왔습니다.

// 코로나 바이러스 감염 예방을 위해 응시자들은 거리를 둬서 대기를 해야하는데 개발 직군 면접인 만큼
// 아래와 같은 규칙으로 대기실에 거리를 두고 앉도록 안내하고 있습니다.

// 대기실은 5개이며, 각 대기실은 5x5 크기입니다.
// 거리두기를 위하여 응시자들 끼리는 맨해튼 거리1가 2 이하로 앉지 말아 주세요.
// 두 테이블 T1, T2가 행렬 (r1, c1), (r2, c2)에 각각 위치하고 있다면, T1, T2 사이의 맨해튼 거리는 |r1 - r2| + |c1 - c2| 입니다.
// 단 응시자가 앉아있는 자리 사이가 파티션으로 막혀 있을 경우에는 허용합니다.

// 제한사항
// places의 행 길이(대기실 개수) = 5
// places의 각 행은 하나의 대기실 구조를 나타냅니다.
// places의 열 길이(대기실 세로 길이) = 5
// places의 원소는 P,O,X로 이루어진 문자열입니다.
// places 원소의 길이(대기실 가로 길이) = 5
// P는 응시자가 앉아있는 자리를 의미합니다.
// O는 빈 테이블을 의미합니다.
// X는 파티션을 의미합니다.
// 입력으로 주어지는 5개 대기실의 크기는 모두 5x5 입니다.
// return 값 형식
// 1차원 정수 배열에 5개의 원소를 담아서 return 합니다.
// places에 담겨 있는 5개 대기실의 순서대로, 거리두기 준수 여부를 차례대로 배열에 담습니다.
// 각 대기실 별로 모든 응시자가 거리두기를 지키고 있으면 1을, 한 명이라도 지키지 않고 있으면 0을 담습니다.

// 입출력 예
// places	result
// [["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"], ["POOPX", "OXPXP", "PXXXO", "OXXXO", "OOOPP"], ["PXOPX", "OXOXP", "OXPOX", "OXXOP", "PXPOX"], ["OOOXX", "XOOOX", "OOOXX", "OXOOX", "OOOOO"], ["PXPXP", "XPXPX", "PXPXP", "XPXPX", "PXPXP"]]	[1, 0, 1, 1, 1]
// 입출력 예 설명
// 입출력 예 #1

// 첫 번째 대기실
//  	0	1	2	3	4
// 0	P	O	O	O	P
// 1	O	X	X	O	X
// 2	O	P	X	P	X
// 3	O	O	X	O	X
// 4	P	O	X	X	P
// 모든 응시자가 거리두기를 지키고 있습니다.

// 두 번째 대기실
//  	0	1	2	3	4
// 0	P	O	O	P	X
// 1	O	X	P	X	P
// 2	P	X	X	X	O
// 3	O	X	X	X	O
// 4	O	O	O	P	P
// (0, 0) 자리의 응시자와 (2, 0) 자리의 응시자가 거리두기를 지키고 있지 않습니다.
// (1, 2) 자리의 응시자와 (0, 3) 자리의 응시자가 거리두기를 지키고 있지 않습니다.
// (4, 3) 자리의 응시자와 (4, 4) 자리의 응시자가 거리두기를 지키고 있지 않습니다.

// 세 번째 대기실
//  	0	1	2	3	4
// 0	P	X	O	P	X
// 1	O	X	O	X	P
// 2	O	X	P	O	X
// 3	O	X	X	O	P
// 4	P	X	P	O	X
// 모든 응시자가 거리두기를 지키고 있습니다.

// 네 번째 대기실
//  	0	1	2	3	4
// 0	O	O	O	X	X
// 1	X	O	O	O	X
// 2	O	O	O	X	X
// 3	O	X	O	O	X
// 4	O	O	O	O	O
// 대기실에 응시자가 없으므로 거리두기를 지키고 있습니다.

// 다섯 번째 대기실
//  	0	1	2	3	4
// 0	P	X	P	X	P
// 1	X	P	X	P	X
// 2	P	X	P	X	P
// 3	X	P	X	P	X
// 4	P	X	P	X	P
// 모든 응시자가 거리두기를 지키고 있습니다.
// 두 번째 대기실을 제외한 모든 대기실에서 거리두기가 지켜지고 있으므로, 배열 [1, 0, 1, 1, 1]을 return 합니다.

// 제한시간 안내
// 정확성 테스트 : 10초

function solution(places) {
  // 대기실에 사람이 한명도 없다면 거리두기는 지켜진것이다.
  // 'O' 또는 'P'를 기준으로 주변을 살핀다.
  // 'O'를 기준으로 상하좌우를 살폈을때 2명이상이 있다면 거리두기는 지켜지지 않았다.
  // 'P'를 기준으로 상하좌우를 살폈을때 1명이상이 있다면 거리두기는 지켜지지 않았다.
  // 'P'가 대각선에 위치해있는 경우 'O'를 기준으로 살필때 걸러진다. 파티션이 존재한다면 검사대상x (맨해튼 거리만큼 지켜진것이다.)
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // 'P'가 하나라도 있다면 isPerson을 true로 반환한다.
  const checkPerson = (place) => {
    let isPerson = false;
    place.map((row) => {
      !isPerson && row.includes("P") ? (isPerson = true) : null;
    });
    return isPerson;
  };

  // 'P'가 하나이상 있다면 대기실을 순회하면서 'O'와 'P'를 기준으로 상하좌우 'P'가 존재하는지 찾는다.
  const checkAroundSeat = (place) => {
    const colLen = place[0].length;
    const rowLen = place.length;
    for (let i = 0; i < place.length; i++) {
      for (let j = 0; j < place[0].length; j++) {
        const findPersons = [];
        const seat = place[i][j];
        if (seat === "O" || seat === "P") {
          directions.map((dir) => {
            const [dY, dX] = dir;
            const nRow = i + dY;
            const nCol = j + dX;
            if (nRow >= 0 && nRow < rowLen && nCol >= 0 && nCol < colLen) {
              const aroundSeat = place[nRow][nCol];
              if (aroundSeat === "P") findPersons.push(aroundSeat);
            }
          });
        }
        if (
          (seat === "O" && findPersons.length > 1) ||
          (seat === "P" && findPersons.length > 0)
        )
          return false;
      }
    }
    return true;
  };

  return places.map((place) => {
    if (!checkPerson(place) || checkAroundSeat(place)) return 1;
    else return 0;
  });
}
