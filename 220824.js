function solution(info, query) {
  info = info.map((str) => str.split(" "));
  // info = info.sort((a,b) => a[a.length-1] - b[b.length-1]);

  const lang = ["java", "python", "cpp"];
  const role = ["frontend", "backend"];
  const career = ["junior", "senior"];
  const food = ["chicken", "pizza"];
  // const SCORE = "score"
  // const searchTable = {};

  lang.map((langEl) => {
    searchTable[langEl] = {};
  });

  role.map((roleEl) => {
    lang.map((langEl) => {
      searchTable[langEl][SCORE] = [];
      searchTable[langEl][roleEl] = {};
    });
  });

  career.map((careerEl) => {
    role.map((roleEl) => {
      lang.map((langEl) => {
        searchTable[langEl][roleEl][SCORE] = [];
        searchTable[langEl][roleEl][careerEl] = {};
      });
    });
  });

  food.map((foodEl) => {
    career.map((careerEl) => {
      role.map((roleEl) => {
        lang.map((langEl) => {
          searchTable[langEl][roleEl][careerEl][SCORE] = [];
          searchTable[langEl][roleEl][careerEl][foodEl] = { score: [] };
        });
      });
    });
  });

  for (let i = 0; i < info.length; i++) {
    const infoLang = info[i][0];
    const infoRole = info[i][1];
    const infoCareer = info[i][2];
    const infoFood = info[i][3];
    const score = info[i][4];

    searchTable[infoLang][SCORE].push(score);
    searchTable[infoLang][infoRole][SCORE].push(score);
    searchTable[infoLang][infoRole][infoCareer][SCORE].push(score);
    searchTable[infoLang][infoRole][infoCareer][infoFood][SCORE].push(score);
  }
  console.log(searchTable);

  // 효율성을 고려하지않고 짠 코드 당연히 효율성 테스트에서는 시간초과다.
  const result = query.map((str) => {
    const arrQuery = str.split(" ");
    return info
      .filter((el) => {
        if (arrQuery[0] === "-") {
          return lang.map((langEl) => {
            if (el[0] === langEl) return true;
          });
        } else return el[0] === arrQuery[0];
      })
      .filter((el) => {
        if (arrQuery[2] === "-") {
          return role.map((roleEl) => {
            if (el[1] === roleEl) return true;
          });
        } else return el[1] === arrQuery[2];
      })
      .filter((el) => {
        if (arrQuery[4] === "-") {
          return career.map((careerEl) => {
            if (el[2] === careerEl) return true;
          });
        } else return el[2] === arrQuery[4];
      })
      .filter((el) => {
        if (arrQuery[6] === "-") {
          return food.map((foodEl) => {
            if (el[3] === foodEl) return true;
          });
        } else return el[3] === arrQuery[6];
      })
      .filter((el) => Number(el[4]) >= Number(arrQuery[7])).length;
  });
  return result;
}
