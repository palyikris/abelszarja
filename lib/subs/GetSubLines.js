export function getSubLines(pageData) {
  let lines = [];
  let line = [];
  let nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  pageData = pageData.replace(/\s+/g, " ");
  for (let i = 0; i < pageData.length; i++) {
    if (pageData[i - 1] === " " && pageData[i + 1] === " " && i != 1) {
      line = line.join("").split(" ");
      let lineDict = {};
      for (let j = 0; j < line.length; j++) {
        if (line[j] === " " || line[j] === "") {
          line.splice(j, 1);
        }
      }
      for (let k = 0; k < line.length; k++) {
        if (k === 0) {
          lineDict.classNumber = line[k];
        } else if (k === 1) {
          lineDict.class = line[k];
        } else if (k === 2) {
          lineDict.subject = line[k];
        } else if (k === 3) {
          if (nums.includes(line[k][0])) {
            lineDict.roomNumber = line[k];
          } else {
            lineDict.substitutedTeacher = line[k];
          }
        } else if (k === 4) {
          lineDict.substitutedTeacher += ` ${line[k]}`;
        } else if (k === 5) {
          if (line[k][0] === line[k][0].toUpperCase()) {
            lineDict.substitutedTeacher += ` ${line[k]}`;
          } else {
            lineDict.note = line[k];
          }
        } else if (k === 6) {
          if (
            line[k][0] === line[k][0].toUpperCase() &&
            !nums.includes(line[k][0])
          ) {
            lineDict.substitutedTeacher += ` ${line[k]}`;
          } else {
            lineDict.note += ` ${line[k]}`;
          }
        } else if (k === 7) {
          if (
            line[k][0] === line[k][0].toUpperCase() &&
            !nums.includes(line[k][0])
          ) {
            lineDict.substituteTeacher += ` ${line[k]}`;
          } else {
            lineDict.note += ` ${line[k]}`;
          }
        } else if (k === 8) {
          if (
            line[k][0] === line[k][0].toUpperCase() &&
            !nums.includes(line[k][0])
          ) {
            lineDict.substituteTeacher += ` ${line[k]}`;
          } else {
            lineDict.note += ` ${line[k]}`;
          }
        } else if (k === 9) {
          if (
            line[k][0] === line[k][0].toUpperCase() &&
            !nums.includes(line[k][0])
          ) {
            lineDict.substituteTeacher += ` ${line[k]}`;
          } else {
            lineDict.note += ` ${line[k]}`;
          }
        } else if (k === 10) {
          if (
            line[k][0] === line[k][0].toUpperCase() &&
            !nums.includes(line[k][0])
          ) {
            lineDict.substituteTeacher += ` ${line[k]}`;
          } else {
            lineDict.note += ` ${line[k]}`;
          }
        }
      }
      if (lineDict.note) {
        lineDict.note = lineDict.note
          .split(" ")
          .filter((element) => element != "undefined")
          .join(" ");
      }
      if (lineDict.substituteTeacher) {
        lineDict.substituteTeacher = lineDict.substituteTeacher
          .split(" ")
          .filter((element) => element != "undefined")
          .join(" ");
      }
      if (lineDict.substitutedTeacher) {
        lineDict.substitutedTeacher = lineDict.substitutedTeacher
          .split(" ")
          .filter((element) => element != "undefined")
          .join(" ");
      }
      if (!lineDict.substituteTeacher) {
        lineDict.substituteTeacher = "";
      }
      if (!lineDict.roomNumber) {
        lineDict.roomNumber = "";
      }
      if (!lineDict.note) {
        lineDict.note = "";
      }
      line = lineDict;
      lines.push(line);
      line = [];
      line.push(pageData[i]);
    } else {
      line.push(pageData[i]);
    }
  }
  return lines;
}
