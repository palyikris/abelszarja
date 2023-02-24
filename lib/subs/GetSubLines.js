export function getSubLines(pageData) {
  let data = [...pageData];

  for (let i = 0; i < data.length; i++) {
    if (
      (data[i] === " " || data[i] === "" || data[i] === ",") &&
      (data[i + 1] === "" || data[i + 1] === " ")
    ) {
      delete data[i];
    }
  }

  data = data.join("").split("\n");

  let lines = [];
  let line = [];

  for (let k = 0; k < data.length; k++) {
    if (
      (data[k] === "" || data[k] === " ") &&
      (data[k + 1] === "" || data[k + 1] === " ") &&
      (data[k - 1] === "" || data[k - 1] === " ")
    ) {
      lines.push(line);
      line = [];
    } else {
      line.push(data[k].trim());
    }
  }

  for (let l = 0; l < lines.length; l++) {
    if (lines[l].length === 0 || lines[l].length === 1) {
      delete lines[l];
    }
  }

  let nums = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13"
  ];

  lines.map((line) => {
    if (line[line.length - 2][0].toUpperCase() !== line[line.length - 2][0]) {
      line.pop();
    }
    if (!nums.includes(line[1])) {
      line.shift();
    }
  });

  let dicts = [];

  lines.map((line) => {
    let lineDict = {};
    lineDict.class = line[2];
    lineDict.classNumber = line[1];
    lineDict.note = line[6];
    lineDict.roomNumber = line[4];
    lineDict.subject = line[3];
    lineDict.substituteTeacher = line[0];
    lineDict.substitutedTeacher = line[5];
    dicts.push(lineDict);
  });

  dicts.map((dict) => {
    if (dict.note === "") {
      dict.note = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (dict.roomNumber === "") {
      dict.roomNumber = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
    if (dict.substituteTeacher === "") {
      dict.substituteTeacher = (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  });

  return dicts;
}
