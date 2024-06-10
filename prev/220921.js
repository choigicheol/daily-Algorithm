// 1차] 캐시
// 문제 설명
// 캐시
// 지도개발팀에서 근무하는 제이지는 지도에서 도시 이름을 검색하면 해당 도시와 관련된 맛집 게시물들을 데이터베이스에서 읽어 보여주는 서비스를 개발하고 있다.
// 이 프로그램의 테스팅 업무를 담당하고 있는 어피치는 서비스를 오픈하기 전 각 로직에 대한 성능 측정을 수행하였는데,
// 제이지가 작성한 부분 중 데이터베이스에서 게시물을 가져오는 부분의 실행시간이 너무 오래 걸린다는 것을 알게 되었다.
// 어피치는 제이지에게 해당 로직을 개선하라고 닦달하기 시작하였고, 제이지는 DB 캐시를 적용하여 성능 개선을 시도하고 있지만
// 캐시 크기를 얼마로 해야 효율적인지 몰라 난감한 상황이다.

// 어피치에게 시달리는 제이지를 도와, DB 캐시를 적용할 때 캐시 크기에 따른 실행시간 측정 프로그램을 작성하시오.

// 입력 형식
// 캐시 크기(cacheSize)와 도시이름 배열(cities)을 입력받는다.
// cacheSize는 정수이며, 범위는 0 ≦ cacheSize ≦ 30 이다.
// cities는 도시 이름으로 이뤄진 문자열 배열로, 최대 도시 수는 100,000개이다.
// 각 도시 이름은 공백, 숫자, 특수문자 등이 없는 영문자로 구성되며, 대소문자 구분을 하지 않는다. 도시 이름은 최대 20자로 이루어져 있다.

// 출력 형식
// 입력된 도시이름 배열을 순서대로 처리할 때, "총 실행시간"을 출력한다.

// 조건
// 캐시 교체 알고리즘은 LRU(Least Recently Used)를 사용한다.
// cache hit일 경우 실행시간은 1이다.
// cache miss일 경우 실행시간은 5이다.

// 입출력 예제
// 캐시크기(cacheSize)	도시이름(cities)	실행시간
// 3	["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"]	50
// 3	["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"]	21
// 2	["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]	60
// 5	["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"]	52
// 2	["Jeju", "Pangyo", "NewYork", "newyork"]	16
// 0	["Jeju", "Pangyo", "Seoul", "NewYork", "LA"]	25

// ---------------------------------------------------------------------------------------------------- //

/*
처음엔 
1. cache 배열을 만든다.
2. cities를 map으로 돌면서 
3. city가 cache에 존재하면 time += 1 을 해준다.
4. city가 cache 존재하지 않으면 time += 5 을 해준다.
5. city를 cache에 push해준다.
6. cache.length 가 cacheSize보다 크면 cache.shift() 해준다.

로 풀었었다. 테스트 케이스에는 통과했지만 전체 검사에서 절반 이상이 통과가 안됐다.

문제가 발생하는 부분을 찾다가 "캐시 교체 알고리즘은 LRU(Least Recently Used)를 사용한다." 라는 것을 다시 확인해보고
LRU알고리즘에 대해 알아보니 가장 오랫동안 참조되지 않은 요소를 교체하는 알고리즘이라고 나온다.
즉, 캐시에 들어있는 요소를 재참조하면 해당 요소를 캐시의 제일 마지막으로 옮겨준다.
캐시가 꽉 차면 제일 오래 참조되지 않았던 캐시의 0번째 요소를 제거한다.

1. cache 배열을 만든다.
2. cities를 map으로 돌면서 
3. cache에 city가 존재하면 해당 city를 cache의 제일 마지막으로 옮겨준다. (cache hit의 경우 위치만 옮기기 때문에 캐시의 크기는 변하지 않는다)
4. cache hit 이기 때문에 time += 1을 해준다.
5. cache에 city가 존재하지 않으면 cache 에 city를 push 해주고 cache miss이기 때문에 time += 5 를 해준다.
6. cache.length 가 cacheSize보다 크면 cache.shift() 해준다.

*/

function solution(cacheSize, cities) {
  let time = 0;
  const cache = [];

  cities.map((city) => {
    const lowerCity = city.toLowerCase();

    if (cache.some((data) => data === lowerCity)) {
      for (let i = 0; i < cache.length; i++) {
        if (cache[i] === lowerCity) {
          const reRefer = cache.splice(i, 1);
          cache.push(reRefer[0]);
          time++;
          break;
        }
      }
    } else {
      cache.push(lowerCity);
      time += 5;
    }
    if (cache.length > cacheSize) cache.shift();
  });

  return time;
}
