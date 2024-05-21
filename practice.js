const nums = [1, 2, 3, 4, 5, 6, 7];
const k = 3;

function rotate(nums, k) {
  let arr = [];
  let size = nums.length;

  for (let i = size - k; i < size; i++) {
    arr.push(nums[i]);
  }
  arr.push((nums.slice(0, size - k)));
  console.log(arr.flat());
  return arr;
}

rotate(nums, k);
    