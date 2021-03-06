/**
 * 在未排序的数组中 找到第K个 最大第元素。
 * 请注意，你需要找第是数组排序后的 第K个 最大第元素，而不是第 K 个不同的元素
 * 示例：
 * 输入：[3,2,1,5,6,4] ， K=2
 * 输出：5
 * 
 * 输入：[3,2,3,1,2,4,5,5,6], K = 4
 * 输出：4
 */

export default (arr,k)=>{
    return arr.sort((a,b)=>b-a)[k-1]
}