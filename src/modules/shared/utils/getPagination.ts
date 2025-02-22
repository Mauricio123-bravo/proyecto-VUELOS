export const getPagination = (page: number, limit: number) => {
    const offset = (page - 1) * limit;
    return offset
}

export const getTotalPages = <T>(total: number, data: T[], limit: number) => {

    const totalPages = Math.ceil(total / limit)
    return { totalPages, data, total}
}