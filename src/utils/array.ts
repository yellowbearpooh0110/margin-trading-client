export const mergeTwoSortedArray2OneSorted = (
  array1: Array<number>,
  array2: Array<number>
) => {
  const result: Array<number> = [];
  let index = 0;
  for (const one of array1) {
    do {
      if (array2[index] > one) break;
      else if (array2[index] < one) result.push(array2[index]);
    } while (index++ < array2.length);
    result.push(one);
  }

  result.push(...array2.splice(index));
  return result;
};
