function solution(numbers, hand) {
  const keyPad = {
    1: 0,
    2: 0,
    3: 0,
    4: 1,
    5: 1,
    6: 1,
    7: 2,
    8: 2,
    9: 2,
    "*": 3,
    0: 3,
    "#": 3,
  };

  // 현재위치를 알아야한다.
  let fingerL = [3, 0];
  let fingerR = [3, 2];

  let result = numbers.map((num) => {
    const target = keyPad[num];
    if (num === 1 || num === 4 || num === 7) {
      fingerL = [target, 0];
      return "L";
    } else if (num === 3 || num === 6 || num === 9) {
      fingerR = [target, 2];
      return "R";
    } else {
      // 2,5,8,0 눌렀을때 현재 왼손가락과 오른손가락 위치까지의 거리를 구한다.
      const distanceR =
        Math.abs(fingerR[0] - target) + Math.abs(fingerR[1] - 1);
      const distanceL =
        Math.abs(fingerL[0] - target) + Math.abs(fingerL[1] - 1);
      if (distanceR < distanceL) {
        fingerR = [target, 1];
        return "R";
      } else if (distanceR > distanceL) {
        fingerL = [target, 1];
        return "L";
      } else {
        if (hand === "right") {
          fingerR = [target, 1];
          return "R";
        } else {
          fingerL = [target, 1];
          return "L";
        }
      }
    }
  });
  return result.join("");
}
