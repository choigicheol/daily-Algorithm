// 주식가격

// 문제 설명
// 초 단위로 기록된 주식가격이 담긴 배열 prices가 매개변수로 주어질 때, 가격이 떨어지지 않은 기간은 몇 초인지를 return 하도록 solution 함수를 완성하세요.

// 제한사항
// prices의 각 가격은 1 이상 10,000 이하인 자연수입니다.
// prices의 길이는 2 이상 100,000 이하입니다.

// 입출력 예
// prices
// [1, 2, 3, 2, 3]

// return
// [4, 3, 1, 1, 0]

// 입출력 예 설명
// 1초 시점의 ₩1은 끝까지 가격이 떨어지지 않았습니다.
// 2초 시점의 ₩2은 끝까지 가격이 떨어지지 않았습니다.
// 3초 시점의 ₩3은 1초뒤에 가격이 떨어집니다. 따라서 1초간 가격이 떨어지지 않은 것으로 봅니다.
// 4초 시점의 ₩2은 1초간 가격이 떨어지지 않았습니다.
// 5초 시점의 ₩3은 0초간 가격이 떨어지지 않았습니다.

// < --------------------------- >

function solution(prices) {
    const result = {};

    const stack = [[prices[0], 0]];
    const len = prices.length;

    for (let i = 1; i < len; i++) {
        const prev = prices[i - 1];
        const cur = prices[i];
        // 하락장 등장
        if (prev > cur) {
            while (!!stack.length && stack[stack.length - 1][0] > cur) {
                const [price, index] = stack.pop();
                result[index] = i - index;
            }
        }
        stack.push([cur, i]);
    }

    stack.map((el) => {
        const [price, index] = el;
        result[index] = len - 1 - index;
    });

    return Object.values(result);
}

solution([1, 2, 3, 2, 3]);

/**
 * 시간복잡도 때문에 효율성 테스트에서 좀 애먹은 문제
 *
 * 주식의 가격과 날짜(index)를 stack에 담아준다.
 * 하락장이 나타난 날 stack에서 이전 주식정보를 하나씩 꺼내 현재 가격보다 낮거나 같은 가격의 주식정보가 나타날때까지 비교한다.
 * stack에 담긴 주식이 하락장을 만나기까지의 기간(cur index - prev index)을 체크한다.
 * 해당 결과를 [기간, 구매날짜] 형태로 array에 담아주게되면 마지막에 sort를 해야 하기 때문에, object에 담아 Object.values를 사용 해 준다.
 */
