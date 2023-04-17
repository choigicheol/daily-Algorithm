// quickSelect 알고리즘은 배열에서 k번째 작은 값을 찾는 알고리즘이다.
// 이 알고리즘은 QuickSort 알고리즘을 응용한 것이다.

// QuickSelect는 QuickSort와 유사하게 pivot을 이용하지만, k번째 작은 값을 찾기 위해 분할된 배열 중 한쪽만을 재귀적으로 탐색한다.

// QuickSelect의 구현 방식은 다음과 같다.

// 배열에서 임의의 pivot 값을 선택한다.
// 배열을 pivot을 기준으로 두 개의 부분 배열로 분할한다.
// k번째 작은 값이 있는 부분 배열만을 재귀적으로 탐색한다.
// 부분 배열의 크기가 1이면 해당 값을 반환한다.
// 부분 배열의 크기가 1보다 크면, 다시 pivot 값을 선택하여 2단계부터 반복한다.

// 이 알고리즘은 QuickSort와 마찬가지로 평균적으로 O(n)의 시간 복잡도를 가지며, 최악의 경우 O(n^2)의 시간 복잡도를 가진다.
// 하지만 pivot 값을 잘 선택한다면, 최악의 경우가 거의 발생하지 않으므로 일반적으로 빠른 알고리즘으로 알려져 있다.

function partition(array, left, right) {
  let pivot = array[Math.floor((left + right) / 2)];

  while (left <= right) {
    while (pivot > array[left]) {
      left++;
    }
    while (pivot < array[right]) {
      right--;
    }

    if (left <= right) {
      let temp = array[left];
      array[left] = array[right];
      array[right] = temp;
      left++;
      right--;
    }
  }
  return left;
}

function quickSelectInPlace(arr, left, right, k) {
  let pivot = partition(arr, left, right);
  if (pivot === k - 1) {
    return arr[pivot];
  } else if (pivot > k - 1) {
    return quickSelectInPlace(arr, left, pivot - 1, k);
  } else {
    return quickSelectInPlace(arr, pivot + 1, right, k);
  }
}

let array = [1, 3, 3, -2, 3, 14, 7, 8, 1, 2, 2];

// 예를 들면 중간값을 pivot으로 두고 left에 pivot보다 작은값 right에 pivot보다 큰값으로 나눈다
// 찾고자하는 순위의 값(k)이 pivot보다 작은값이면 left에서만 찾으면 되고
// 찾고자하는 순위의 값(k)이 pivot보다 큰값이면 right에서만 찾으면 된다.
// console.log(quickSelectInPlace(array, 0, array.length - 1, 10));

// 중간값 찾기
function medianQuickSelect(array) {
  return quickSelectInPlace(
    array,
    0,
    array.length - 1,
    Math.floor(array.length / 2)
  );
}

// 시간복잡도 O(n)

// ---------------------------------------------------------------------------------------

// mergeSort
// 재귀적으로 배열의 중간인덱스를 구해 left, right 반반 나눈다
// 반반 나누어진 배열을 재귀를 통해 더이상 나눠지지 않을때까지 나눈다
// 배열의 길이가 1이면 항목이 하나 뿐이라서 이미 정렬된 것이라고 볼 수 있다.
// while문을 통해
// left배열과 right배열을 비교한다
// left[0]보다 right[0]이 더 크다면
// result 배열에 left[0]을 push 하고 left의 인덱스를 하나 늘려준다.
// 그 외의 경우에는
// result 배열에 right[0]을 push 하고 right의 인덱스를 하나 늘려준다.
// 모든 비교가 끝나면 각각의 배열을 index만큼 slice 해준다.
// result배열 - 복사한 left 배열 - 복사한 right 배열 순으로 concat 해준다.

function merge(leftArr, rightArr) {
  let results = [],
    leftIndex = 0,
    rightIndex = 0;

  while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
    if (leftArr[leftIndex] < rightArr[rightIndex]) {
      results.push(leftArr[leftIndex++]);
    } else {
      results.push(rightArr[rightIndex++]);
    }
  }

  let leftRemains = leftArr.slice(leftIndex);
  let rightRemains = rightArr.slice(rightIndex);

  return results.concat(leftRemains).concat(rightRemains);
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }
  let midpoint = Math.floor(array.length / 2);
  let leftArray = array.slice(0, midpoint);
  let rightArray = array.slice(midpoint);

  return merge(mergeSort(leftArray), mergeSort(rightArray));
}

console.log(mergeSort([6, 1, 23, 4, 2, 3, 7, 4, 9, 56, 44]));

// 시간복잡도는 O(nLog(n))
// 공간복잡도는 O(n)
