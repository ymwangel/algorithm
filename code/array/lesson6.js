/**
 * 给定一个数组[-2,1,-3,4,-1,2,1,-5,4],找出一个子数组，子数组内的元素的和为最大值
 * 假定一个输入只有一组输出，
 * 例如：
 * 输入：var arr = [2，7，11，15],target=9
 * 输出：res=[0,1]
 * 例如：var arr = [3,2,4] target = 6
 * 输出：res = [1,2]
 * 例如：var arr = [0,3,2,4,0] target = 0
 * 输出：res = [0,4]
 */

// The Best Answer
var twoSum = function(nums, target) {
    let map=new Map();
    for(let [ind,item] of nums.entries()){
        if(map.has(target-item)){
            return [map.get(target-item),ind];
        }
        map.set(item,ind);
    }
    return [];
};

const twoSum = (nums, target) => {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
      const another = target - nums[i];
      if (another in map) {
        return [map[another], i];
      }
      map[nums[i]] = i;
    }
    return null;
  };

export default (nums,target)=>{
    let result = []
    for(let i=0;i<nums.length;i++){
        let difference = target - (nums[i])
        let res = filterIndex(nums,(item,idx)=>{
            return item == difference && idx > i 
        })
        if(res.length > 0){
            result.push(i,res[0])
            break;
         }
    }
    return result
    function filterIndex(arr,fn){
        let res = []
        for(let i=0;i<arr.length;i++){
            if(fn(arr[i],i)) res.push(i)
        }
        return res
    }
}