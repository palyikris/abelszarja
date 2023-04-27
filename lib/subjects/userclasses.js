export default function userClasses(list) {
  let size = list.length;
  if (size > 1) {
    let mid = parseInt(size / 2);

    let left_list = [];
    let right_list = [];

    for (let i = 0; i < mid; i++) {
      const element = list[i];
      left_list.push(element);
    }

    for (let j = mid; j < list.length; j++) {
      const element = list[j];
      right_list.push(element);
    }

    userClasses(left_list);
    userClasses(right_list);

    let p = 0;
    let q = 0;
    let r = 0;
    let leftSize = left_list.length;
    let rightSize = right_list.length;

    while (p < leftSize && q < rightSize) {
      if (
        parseInt(left_list[p].id.split()[0]) <
        parseInt(right_list[q].id.split()[0])
      ) {
        list[r] = left_list[p];
        p += 1;
      } else {
        list[r] = right_list[q];
        q += 1;
      }

      r += 1;
    }

    while (p < leftSize) {
      list[r] = left_list[p];
      p += 1;
      r += 1;
    }
    while (q < rightSize) {
      list[r] = right_list[q];
      q += 1;
      r += 1;
    }
  }

  return list;
}
