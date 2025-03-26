
export class ResponseFactory {
    static success(data: any = {}, message: string = 'success',) {
        return {
            status: 'success',
            message,
            data
        };
    }

    static error(message: string, data: any = null) {
        return {
            status: 'error',
            message,
            data
        };
    }
}

export function random(min: number = 0, max: number = 2147483647): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}