function swap(arr, index1, index2) {
  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

// 버블정렬
// 데이터를 두개씩 묶어서 비교한 후 크기가 큰 쪽이 오른쪽으로 가도록 자리를 바꿔가며 크기가 큰 데이터를 오른쪽으로 민다.
// 1회전이 끝남과 동시에 이 리스트에서 가장 큰 값이 가장 오른쪽에 가기 때문에 맨 오른쪽 자리가 결정난다.
// 즉, n번째 정렬 회차가 끝나면 뒤에서 n번째 자리의 데이터가 확정된다.

function bubbleSort(array) {
  const len = array.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        // 두 원소의 위치를 바꿈
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}

// --------------------------------------------------------------------------------------------

// 선택정렬

// 버블 정렬이 각 회전이 끝날 때마다 맨 마지막 데이터의 위치가 정해졌던 것과 반대로
// 선택 정렬은 n번째 회전이 끝날 때마다 앞에서 n번째 데이터의 위치가 정해진다.

// 먼저 주어진 리스트 중에 최소값을 찾는다.
// 그 값을 맨 앞에 위치한 값과 교환한다.
// 이제 맨 앞을 제외하고 다시 순회하며 최소값을 찾는다.
// 그 값을 맨 앞 위치 바로 다음 위치와 교체한다.
// ... 반복

function selectionSort(array) {
  const len = array.length;
  let min;

  for (let i = 0; i < len; i++) {
    min = i;
    for (let j = i + 1; j < len; j++) {
      if (array[j] < array[min]) {
        min = j;
      }
    }
    if (i !== min) {
      swap(array, i, min);
    }
  }
  return array;
}

console.log(bubbleSort([6, 1, 4, 3, 2, 5, 9, 8, 7]));
console.log(selectionSort([6, 1, 4, 3, 2, 5, 9, 8, 7]));
