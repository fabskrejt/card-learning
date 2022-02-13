
export const resError = (e: any) => {
    const error = e.response
        ? e.response.data.error
        : e.message + ", more details in the console"
    return error
}