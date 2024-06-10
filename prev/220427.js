// 2차원 행렬 arr1과 arr2를 입력받아, arr1에 arr2를 곱한 결과를 반환하는 함수, solution을 완성해주세요.

// 제한 조건
// 행렬 arr1, arr2의 행과 열의 길이는 2 이상 100 이하입니다.
// 행렬 arr1, arr2의 원소는 -10 이상 20 이하인 자연수입니다.
// 곱할 수 있는 배열만 주어집니다.
// 입출력 예
// arr1	arr2	return
// [[1, 4], [3, 2], [4, 1]]	[[3, 3], [3, 3]]	[[15, 15], [15, 15], [15, 15]]
// [[2, 3, 2], [4, 2, 4], [3, 1, 4]]	[[5, 4, 3], [2, 4, 1], [3, 1, 1]]	[[22, 22, 11], [36, 28, 18], [29, 20, 14]]

function solution(arr1, arr2) {
  /*
    [       [
    a,b     e,f
    c,d     g,h
    ]       ] 
    가 있을때 [[(a*e)+(b*g), (a*f)+(b*h)],[(c*e)+(d*g), (c*f)+(d*h)]] 가 return 되면 된다.
    */

  // value가 0인 2차원 결과 배열을 만들어준다
  let result = Array(arr1.length)
    .fill(0)
    .map((el) => Array(arr2[0].length).fill(0));

  // result 배열의 [row, col]위치에 맞는 값을 더해 넣는다
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2[0].length; j++) {
      for (let k = 0; k < arr2.length; k++) {
        result[i][j] += arr1[i][k] * arr2[k][j];
      }
    }
  }
  return result;
}
