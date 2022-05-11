// 주차 요금 계산
// 문제 설명
// 주차장의 요금표와 차량이 들어오고(입차) 나간(출차) 기록이 주어졌을 때, 차량별로 주차 요금을 계산하려고 합니다. 아래는 하나의 예시를 나타냅니다.

// 요금표
// 기본시간(분)	기본요금(원)	단위시간(분)	단위요금(원)
// 180	5000	10	600

// 입/출차 기록
// 시각(시:분)	차량 번호	내역
// 05:34	5961	입차
// 06:00	0000	입차
// 06:34	0000	출차
// 07:59	5961	출차
// 07:59	0148	입차
// 18:59	0000	입차
// 19:09	0148	출차
// 22:59	5961	입차
// 23:00	5961	출차

// 자동차별 주차 요금
// 차량번호	누적주차시간(분)	주차요금(원)
// 0000 /	34 + 300 = 334 /	5000 + ⌈(334 - 180) / 10⌉ x 600 = 14600
// 0148 /	670            /	5000 +⌈(670 - 180) / 10⌉x 600 = 34400
// 5961 /	145 + 1  = 146 /	5000

// 어떤 차량이 입차된 후에 출차된 내역이 없다면, 23:59에 출차된 것으로 간주합니다.
// 누적 주차 시간이 기본 시간이하라면, 기본 요금을 청구합니다.
// 누적 주차 시간이 기본 시간을 초과하면, 기본 요금에 더해서, 초과한 시간에 대해서 단위 시간 마다 단위 요금을 청구합니다.
// 초과한 시간이 단위 시간으로 나누어 떨어지지 않으면, 올림합니다.

// 1 ≤ records의 길이 ≤ 1,000

// records의 각 원소는 "시각 차량번호 내역" 형식의 문자열입니다.
// 시각, 차량번호, 내역은 하나의 공백으로 구분되어 있습니다.
// 시각은 차량이 입차되거나 출차된 시각을 나타내며, HH:MM 형식의 길이 5인 문자열입니다.
// HH:MM은 00:00부터 23:59까지 주어집니다.
// 잘못된 시각("25:22", "09:65" 등)은 입력으로 주어지지 않습니다.
// 차량번호는 자동차를 구분하기 위한, `0'~'9'로 구성된 길이 4인 문자열입니다.
// 내역은 길이 2 또는 3인 문자열로, IN 또는 OUT입니다. IN은 입차를, OUT은 출차를 의미합니다.
// records의 원소들은 시각을 기준으로 오름차순으로 정렬되어 주어집니다.
// records는 하루 동안의 입/출차된 기록만 담고 있으며, 입차된 차량이 다음날 출차되는 경우는 입력으로 주어지지 않습니다.
// 같은 시각에, 같은 차량번호의 내역이 2번 이상 나타내지 않습니다.
// 마지막 시각(23:59)에 입차되는 경우는 입력으로 주어지지 않습니다.
// 아래의 예를 포함하여, 잘못된 입력은 주어지지 않습니다.
// 주차장에 없는 차량이 출차되는 경우
// 주차장에 이미 있는 차량(차량번호가 같은 차량)이 다시 입차되는 경우

// 입출력 예
// fees	records	result
// [180, 5000, 10, 600]	["05:34 5961 IN", "06:00 0000 IN", "06:34 0000 OUT", "07:59 5961 OUT", "07:59 0148 IN", "18:59 0000 IN", "19:09 0148 OUT", "22:59 5961 IN", "23:00 5961 OUT"]	[14600, 34400, 5000]
// [120, 0, 60, 591]	["16:00 3961 IN","16:00 0202 IN","18:00 3961 OUT","18:00 0202 OUT","23:58 3961 IN"]	[0, 591]
// [1, 461, 1, 10]	["00:00 1234 IN"]	[14841]

// 제한시간 안내
// 정확성 테스트 : 10초

function solution(fees, records) {
  var answer = [];
  let recordsInfo = {};
  const maxOutTime = 1439;

  records.map((record) => {
    // record의 정보를 split하여 h, m, carNum, type 변수에  각각 할당해준다
    const [time, carNum, type] = record.split(" ");
    const [h, m] = time.split(":");
    /* 
    recordsInfo 객체에 carNum을 key값으로 min값이 존재하지않으면 0으로 초기값 할당
    존재한다면 IN, OUT 일때의 minute값을 maxOutTime을 기준으로 계산하여 +,- 해준다.
    */
    if (!recordsInfo[carNum]) recordsInfo[carNum] = 0;
    if (type === "IN") recordsInfo[carNum] += maxOutTime - (Number(h) * 60 + Number(m));
    else if (type === "OUT") recordsInfo[carNum] -= maxOutTime - (Number(h) * 60 + Number(m));
  });

  // 결과 요금값을 차량번호 기준 오름차순으로 return해야하기때문에 2중배열로 담아 차번호를 기준으로 sort해준다
  for (let key in recordsInfo) {
    answer.push([Number(key), recordsInfo[key]]);
  }

  answer.sort((a, b) => a[0] - b[0]);

  // 주차시간에 따른 주차요금 계산
  answer = answer.map((parkInfo) => {
    if (parkInfo[1] <= fees[0]) return fees[1];
    return fees[1] + Math.ceil((parkInfo[1] - fees[0]) / fees[2]) * fees[3];
  });

  return answer;
}
