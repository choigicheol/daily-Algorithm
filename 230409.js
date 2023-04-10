// 디펜스 게임
// 문제 설명
// 준호는 요즘 디펜스 게임에 푹 빠져 있습니다. 디펜스 게임은 준호가 보유한 병사 n명으로 연속되는 적의 공격을 순서대로 막는 게임입니다. 디펜스 게임은 다음과 같은 규칙으로 진행됩니다.

// 준호는 처음에 병사 n명을 가지고 있습니다.
// 매 라운드마다 enemy[i]마리의 적이 등장합니다.
// 남은 병사 중 enemy[i]명 만큼 소모하여 enemy[i]마리의 적을 막을 수 있습니다.
// 예를 들어 남은 병사가 7명이고, 적의 수가 2마리인 경우, 현재 라운드를 막으면 7 - 2 = 5명의 병사가 남습니다.
// 남은 병사의 수보다 현재 라운드의 적의 수가 더 많으면 게임이 종료됩니다.
// 게임에는 무적권이라는 스킬이 있으며, 무적권을 사용하면 병사의 소모없이 한 라운드의 공격을 막을 수 있습니다.
// 무적권은 최대 k번 사용할 수 있습니다.
// 준호는 무적권을 적절한 시기에 사용하여 최대한 많은 라운드를 진행하고 싶습니다.

// 준호가 처음 가지고 있는 병사의 수 n, 사용 가능한 무적권의 횟수 k, 매 라운드마다 공격해오는 적의 수가 순서대로 담긴 정수 배열 enemy가 매개변수로 주어집니다. 준호가 몇 라운드까지 막을 수 있는지 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// 1 ≤ n ≤ 1,000,000,000
// 1 ≤ k ≤ 500,000
// 1 ≤ enemy의 길이 ≤ 1,000,000
// 1 ≤ enemy[i] ≤ 1,000,000
// enemy[i]에는 i + 1 라운드에서 공격해오는 적의 수가 담겨있습니다.
// 모든 라운드를 막을 수 있는 경우에는 enemy[i]의 길이를 return 해주세요.
// 입출력 예
// n	k	enemy	result
// 7	3	[4, 2, 4, 5, 3, 3, 1]	5
// 2	4	[3, 3, 3, 3]	4
// 입출력 예 설명
// 입출력 예#1

// 1, 3, 5 라운드의 공격을 무적권으로 막아내고, 2, 4 라운드에 각각 병사를 2명, 5명 소모하면 5라운드까지 공격을 막을 수 있습니다. 또, 1, 3, 4번째 공격을 무적권으로 막아내고, 2, 5 번째 공격에 각각 병사를 2명, 3명 소모하여 5라운드까지 공격을 막을 수 있습니다. 그보다 많은 라운드를 막는 방법은 없으므로 5를 return 합니다.
// 입출력 예#2

// 준호는 모든 공격에 무적권을 사용하여 4라운드까지 막을 수 있습니다.

function solution(n, k, enemy) {
  let answer = 0;
  if (enemy.length <= k) return enemy.length;

  // 최대 힙을 이용해 배열에서 최대값을 빨리 찾을 수 있다.
  class MaxHeap {
    constructor() {
      this.heap = [null];
    }

    swap(a, b) {
      [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    size() {
      return this.heap.length - 1;
    }

    empty() {
      return this.size() === 0;
    }

    push(value) {
      this.heap.push(value);
      let cur = this.heap.length - 1;
      let par = Math.floor(cur / 2);

      while (par > 0 && this.heap[par] < value) {
        this.swap(cur, par);
        cur = par;
        par = Math.floor(cur / 2);
      }
    }

    pop() {
      if (this.empty()) {
        return 0;
      }
      if (this.size() === 1) {
        return this.heap.pop();
      }
      let returnValue = this.heap[1];
      this.heap[1] = this.heap.pop();

      let cur = 1;
      let left = 2;
      let right = 3;

      while (
        this.heap[cur] < this.heap[left] ||
        this.heap[cur] < this.heap[right]
      ) {
        if (this.heap[left] < this.heap[right]) {
          this.swap(cur, right);
          cur = right;
        } else {
          this.swap(cur, left);
          cur = left;
        }
        left = cur * 2;
        right = cur * 2 + 1;
      }

      return returnValue;
    }
  }

  const heap = new MaxHeap();

  for (let i = 0; i < enemy.length; i++) {
    n -= enemy[i];
    heap.push(enemy[i]);
    // 병사가 부족할 때
    if (n < 0) {
      // 방어권이 없으면 게임오버
      if (k === 0) return answer;
      // 방어권이 있다면
      else {
        // 방어권을 쓴다
        k--;
        // 모든 턴 중에 제일 큰 적에서 방어권을 썼다고하고 그만큼 n(내 병사)을 회복시켜준다.
        const bigEnemy = heap.pop();
        n += bigEnemy;
      }
    }

    // 병사가 부족하지않다면 라운드를 이어나간다.
    answer++;
  }
  return answer;
}

// 최소 힙
// class MinHeap {
//   constructor() {
//     this.heap = [null];
//   }

//   size() {
//     return this.heap.length - 1;
//   }

//   getMin() {
//     return this.heap[1] ? this.heap[1] : null;
//   }

//   swap(a, b) {
//     [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
//   }

//   push(value) {
//     this.heap.push(value);
//     let curIdx = this.heap.length - 1;
//     let parIdx = (curIdx / 2) >> 0;

//     while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
//       this.swap(parIdx, curIdx);
//       curIdx = parIdx;
//       parIdx = (curIdx / 2) >> 0;
//     }
//   }

//   pop() {
//     const returnValue = this.heap[1];
//     if (this.heap.length <= 2) this.heap = [null];
//     else this.heap[1] = this.heap.pop();

//     let cur = 1;
//     let left = cur * 2;
//     let right = cur * 2 + 1;

//     if (!this.heap[left]) return returnValue;
//     if (!this.heap[right]) {
//       if (this.heap[left] < this.heap[cur]) {
//         this.swap(left, cur);
//       }
//       return returnValue;
//     }

//     while (
//       this.heap[left] < this.heap[cur] ||
//       this.heap[right] < this.heap[cur]
//     ) {
//       const minIdx =
//         this.heap[left] > this.heap[right] ? right : left;
//       this.swap(minIdx, cur);
//       cur = minIdx;
//       left = cur * 2;
//       right = cur * 2 + 1;
//     }

//     return returnValue;
//   }
// }
