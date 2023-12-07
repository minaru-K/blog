export class Validators {
    static required(value) {
        return value?.trim()
    }

    static minLength(length) {
        return value => {
            return value && value.length >= length
        }
    }
}