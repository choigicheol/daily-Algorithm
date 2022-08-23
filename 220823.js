function solution(queue1, queue2) {
  let count = 0;
  let start = 0;
  let end = queue1.length;

  const concatQueue = [...queue1, ...queue2];
  const queueLen = queue1.length;

  const getSum = (arr) => arr.reduce((acc, cur) => acc + cur);

  const sumQueue1 = getSum(queue1);
  const sumQueue2 = getSum(queue2);

  // 예외사항 처음부터 합이 같거나 두 합이 홀수인경우
  if (sumQueue1 === sumQueue2) return count;
  if ((sumQueue1 + sumQueue2) % 2 !== 0) return -1;

  const target = (sumQueue1 + sumQueue2) / 2;

  let totalSum = getSum(concatQueue.slice(start, end));

  for (let i = 0; i < (queueLen - 1) * 3 + 1; i++) {
    if (target < totalSum) {
      totalSum -= concatQueue[start];
      start++;
    } else if (target > totalSum) {
      totalSum += concatQueue[end];
      end++;
    } else if (target === totalSum) {
      return count;
    }
    count++;
  }
  return -1;
}
