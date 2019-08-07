export default {
    methods: {
        getYYR(time) {
            return `${time.getFullYear()}-${this.add(time.getMonth() + 1)}-${this.add(time.getDate())}`
        },
        add(i) {
            let t = i < 10 ? '0' + i : i
            return t
        }
    }
}
