import Vue from 'vue'
import Modal from './src/modal'

const ModalProgrammatic = {
  open(params) {
    let content
    let parent

    if (typeof params === 'string') content = params

    const defaultParam = {
      programmatic: true,
      content,
    }

    if (params.parent) {
      parent = params.parent
      delete params.parent
    }

    const propsData = Object.assign(defaultParam, params)

    const vm = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue

    const ModalComponent = vm.extend(Modal)

    return new ModalComponent({
      parent,
      el: document.createElement('div'),
      propsData,
    })
  },
}

Vue.prototype.$modal = ModalProgrammatic
Vue.component('Modal', Modal)
