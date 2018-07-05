// Import the mount() method from the test utils
// and the component you want to test
import { mount } from '@vue/test-utils' // 引入test-utils中加载组件的方法
import Counter from './counter' // 需要测试的组件

describe('Counter', () => {
  // Now mount the component and you have the wrapper
  // 加载组件，被挂载的组件会返回到一个包裹器（wrapper）内，而包裹器会暴露很多封装、遍历和查询其内部的 Vue 组件实例的便捷的方法。
  // 现在挂载组件，你便得到了这个包裹器
  const wrapper = mount(Counter)

  // 你可以通过 `wrapper.vm` 访问实际的 Vue 实例
  const vm = wrapper.vm

  // 在控制台将其记录下来即可深度审阅包裹器
  // 我们对 Vue Test Utils 的探索也由此开始
  // console.log(wrapper)

  // 渲染正确的标记
  it('renders the correct markup', () => {
    expect(wrapper.html()).toContain('<span class="count">0</span>')
  })

  // 判断html是否正确渲染，检查是否包含button
  // it's also easy to check for the existence of elements
  it('has a button', () => {
    expect(wrapper.contains('button')).toBe(true) // 断言
  })

  // 模拟用户交互 
  // 当用户点击按钮的时候，我们的计数器应该递增
  it('button should increment the count', () => {
    expect(wrapper.vm.count).toBe(0)
    const button = wrapper.find('button')
    button.trigger('click')
    expect(wrapper.vm.count).toBe(1)
  })

  // 关于nexttick的使用，后续理解！！
  // 这不会被捕获
  it('will time out', (done) => {
    Vue.nextTick(() => {
      expect(true).toBe(false)
      done()
    })
  })

// 接下来的两项测试都会如预期工作
  it('will catch the error using done', (done) => {
    Vue.config.errorHandler = done
    Vue.nextTick(() => {
      expect(true).toBe(false)
      done()
    })
  })

  it('will catch the error using a promise', () => {
    return Vue.nextTick()
      .then(function () {
        expect(true).toBe(false)
      })
  })
})
