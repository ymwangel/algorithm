/**
 * 1. 题目要求：实现一个具有并发数量限制的异步任务调度器，可以规定最大同时运行的任务
 * 实现一个 Scheduler类，使得下面的代码能正确输出
 * 
 */

// 延迟函数
const sleep = (time) => new Promise(resolve => setTimeout(resolve, time))

class Scheduler {
  constructor(max) {
    this.max = max
    this.count = 0
    this.queue = []
  }
  async add(fn) {
    if (this.count >= this.max) {
      await new Promise(resolve => this.queue.push(resolve))
    }
    this.count++
    const res = await fn()
    this.count--
    this.queue.length && this.queue.shift()()
    return res
  }
}

// 同时进行的任务最多2个
const scheduler = new Scheduler(2)

// 添加异步任务
const addTask = (time, val) => {
  scheduler.add(() => {
    return sleep(time).then(() => {
      console.log(val)
    })
  })
}

addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')