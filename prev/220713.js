// 일반적인 프린터는 인쇄 요청이 들어온 순서대로 인쇄합니다. 그렇기 때문에 중요한 문서가 나중에 인쇄될 수 있습니다. 이런 문제를 보완하기 위해 중요도가 높은 문서를 먼저 인쇄하는 프린터를 개발했습니다. 이 새롭게 개발한 프린터는 아래와 같은 방식으로 인쇄 작업을 수행합니다.

// 1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
// 2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
// 3. 그렇지 않으면 J를 인쇄합니다.
// 예를 들어, 4개의 문서(A, B, C, D)가 순서대로 인쇄 대기목록에 있고 중요도가 2 1 3 2 라면 C D A B 순으로 인쇄하게 됩니다.

// 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 알고 싶습니다. 위의 예에서 C는 1번째로, A는 3번째로 인쇄됩니다.

// 현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 매개변수로 주어질 때, 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return 하도록 solution 함수를 작성해주세요.

// 제한사항
// 현재 대기목록에는 1개 이상 100개 이하의 문서가 있습니다.
// 인쇄 작업의 중요도는 1~9로 표현하며 숫자가 클수록 중요하다는 뜻입니다.
// location은 0 이상 (현재 대기목록에 있는 작업 수 - 1) 이하의 값을 가지며 대기목록의 가장 앞에 있으면 0, 두 번째에 있으면 1로 표현합니다.

// 입출력 예
// priorities	location	return
// [2, 1, 3, 2]	2	1
// [1, 1, 9, 1, 1, 1]	0	5

// 입출력 예 설명
// 예제 #1
// 문제에 나온 예와 같습니다.

// 예제 #2
// 6개의 문서(A, B, C, D, E, F)가 인쇄 대기목록에 있고 중요도가 1 1 9 1 1 1 이므로 C D E F A B 순으로 인쇄합니다.

function solution(priorities, location) {
  //  1. priorities 배열안에 첫번째 target 보다 높은 우선순위를 가진 값이 포함되어있다면 뒤로 밀려난다.
  //  2. 해당 location의 값이 최우선순위가 아니라면 뒤로밀려나면서 location값이 바뀌어야한다.
  //  3. 우선순위 값에 중복이 있기때문에 해당 priorities에서 뒤로 밀려나는경우 어떻게 처음 location에 해당하는 값을 찾을 수 있을끼?
  //  4. priorities 값에 각기 다른 key 값을 지정해준다면?
  //  5. 우선순위가 뒤로 밀려나더라도 처음 location 값으로 찾을 수 있다.

  let count = 0;
  const objPriorities = {};

  // index : 우선순위값으로 objPriorities객체를 생성 및 index를 element로 가진 새로운 배열을 만든다.
  const arrKeys = priorities.map((el, idx) => {
    objPriorities[idx] = el;
    return idx;
  });

  // target = arrKeys의 0번째 인덱스 value의 우선순위값, arr = arrKeys의 0번째 인덱스를 제외한 배열
  // 배열의 element를 key로 objPriorities 객체를 순회하며 더 높은 우선순위가 있는지 찾아보며 boolean을 리턴한다.
  // true = 프린트를 해도된다, false = 더 높은우선순위가 있는 경우(현재 프린트 불가)
  const checkPriorities = (arr, target) => {
    for (let key of arr) {
      if (objPriorities[key] > target) return false;
    }
    return true;
  };

  while (true) {
    const valueKey = arrKeys.shift();
    const isPrint = checkPriorities(arrKeys, objPriorities[valueKey]);

    if (!isPrint) {
      arrKeys.push(valueKey);
    } else if (isPrint) {
      count++;
      if (valueKey === location) return count;
    }
  }
}
