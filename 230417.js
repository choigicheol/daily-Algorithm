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
console.log(quickSelectInPlace(array, 0, array.length - 1, 10));

// 중간값 찾기
function medianQuickSelect(array) {
  return quickSelectInPlace(
    array,
    0,
    array.length - 1,
    Math.floor(array.length / 2)
  );
}

// ---------------------------------------------------------------------------------------
