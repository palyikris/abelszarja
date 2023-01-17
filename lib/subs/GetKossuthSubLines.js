export function GetKossuthSubLines(pageData) {
  let lines = [];
  let line = [];
  let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let months = [
    "Január",
    "Február",
    "Március",
    "Április",
    "Május",
    "Június",
    "Július",
    "Augusztus",
    "Szeptember",
    "Október",
    "November",
    "December"
  ];
  let data = pageData.replace(/\s+/g, " ").split(" ");
  data.map((element, i) => {
    if (element === "" || element === " ") {
      data.splice(i, 1);
    }
    element = element.trim();
    element = element.replace(".", "");
    element = element.replace(",", "");
  });
  for (let i = 0; i < data.length; i++) {
    if (months.includes(data[i]) && i != 0) {
      lines.push(line);
      line = [];
      line.push(data[i]);
    } else {
      line.push(data[i]);
    }
  }
  lines.push(line);
  lines.map((line, i) => {
    let isDetailedSub = false;
    for (let k = 0; k < line.length; k++) {
      const element = line[k];
      if (k === 6 && isNaN(element) === false) {
        isDetailedSub = true;
      }
    }
    if (isDetailedSub) {
      const month = line[0];
      const date = `${month} ${line[1].replace(",", "")}`;
      const day = line[2];
      const substitutedTeacher = `${line[3]} ${line[4]}`;
      let lineInLine = [];
      let linesInLine = [];
      for (let l = 0; l < line.length; l++) {
        const element = line[l];
        if (l >= 6) {
          if (!isNaN(element.replace(".", "")) && l > 6) {
            linesInLine.push(lineInLine);
            lineInLine = [];
            lineInLine.push(element);
          } else {
            lineInLine.push(element);
          }
        }
      }
      linesInLine.map((line) => {
        let lineDict = {};
        if (!isNaN(line[2][0])) {
          lineDict.month = month;
          lineDict.date = date;
          lineDict.day = day;
          lineDict.substitutedTeacher = substitutedTeacher;
          lineDict.classNumber = line[0].trim();
          lineDict.class = line[2].trim().replace(":", "");
          lineDict.substituteTeacher = `${line[3]} ${line[4]}`;
          lineDict.subject = line[5].replace(",", "");
          lineDict.room = line[6];
          for (let h = 0; h < line.length; h++) {
            const element = line[h];
            if (element != "terem" && h > 6) {
              lineDict.room += ` ${line[h]}`;
            }
          }
          lines.push(lineDict);
        } else {
          lineDict.month = month;
          lineDict.date = date.replace(",", "");
          lineDict.day = day;
          lineDict.substitutedTeacher = substitutedTeacher;
          lineDict.classNumber = line[0].trim();
          lineDict.class = line[2].trim().replace(":", "");
          for (let f = 0; f < line.length; f++) {
            const element = line[f];
            if (f === 3) {
              lineDict.note = element;
            }
            if (f > 3) {
              lineDict.note += ` ${element}`;
            }
          }
          lines.push(lineDict);
        }
      });
    } else {
      let lineDict = {};
      for (let j = 0; j < line.length; j++) {
        const element = line[j];
        if (j === 0) {
          lineDict.month = element;
        } else if (j === 1) {
          lineDict.date = `${lineDict.month} ${element.replace(",", "")}`;
        } else if (j === 2) {
          lineDict.day = element;
        } else if (j === 3) {
          lineDict.substitutedTeacher = element;
        } else if (j === 4) {
          lineDict.substitutedTeacher += ` ${element}`;
        } else if (j === 5) {
          if (element[0].toUpperCase() === element[0]) {
            lineDict.substitutedTeacher += ` ${element}`;
          } else {
            lineDict.note = element;
          }
        } else if (j === 6) {
          lineDict.note += ` ${element}`;
        } else if (j === 7) {
          lineDict.note += ` ${element}`;
        } else if (j === 8) {
          lineDict.note += ` ${element}`;
        }
      }
      lines[i] = lineDict;
    }
  });
  lines.map(line => {
    if (!line.class) {
      console.log(line);
      line.class = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
      console.log(line);
    }
    if (!line.classNumber) {
      line.classNumber = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }
    if (!line.substituteTeacher) {
      line.substituteTeacher = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }
    if (!line.subject) {
      line.subject = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }
    if (!line.room) {
      line.room = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }
    if (!line.note) {
      line.note = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      );
    }
  })
  lines.map((line, i) => {
    if (Array.isArray(line)) {
      lines.splice(i, 1);
    }
  });
  return lines;
}