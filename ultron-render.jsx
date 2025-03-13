import { createStore } from 'hox'
import { useState, useEffect } from 'react'

class Utlron {
    constructor() {
        this.data = data
        this.store = createStore(this.stateCreator)
        this.asyncPromise  = new Promise((resolve, reject) => {
            this.resolve = resolve
            this.reject = reject
        })
    }

    getChildren(id) {
        return this.data?.hierarchy?.structure?.[id]
    }

    stateCreator() {
        const [state, setState] = useState({
            data: this.data,
            loading: !this.data,
        })

        const setData = () => {
            setState({
                loading: false,
                data: {...this.data }
            })
        }

        useEffect(() => {
            this.asyncPromise.then(() => {
                setData()
            })
        }  ,[])

        return {
            ...state,
            setData
        }
    }

    // 更新指定组件的数据
    getFieldsModel(id) {
        return {
            id,
            data: this.getFields(id),
            setData: (data) => {
                // 监听的时候
                const d = this.getData(id)
                if(!d) {
                    return
                }
                // 更新fields
                d.fields = {
                    ...d.fields,
                    ...data
                }
                this.store.data?.setData() // 触发更新
            }
        }
    }

}