import type { ICoreResource } from "@/context/helpers/interface"
import type { IAPIResponse, IPagination } from "@/utils/interfaces.util"

const avatars = [
    { name: 'sandra', avatar: 'https://storage.googleapis.com/pacitude-buckets/sandra.png' },
    { name: 'femi', avatar: 'https://storage.googleapis.com/pacitude-buckets/femi.png' },
    { name: 'vivek', avatar: 'https://storage.googleapis.com/pacitude-buckets/vivek.png' },
    { name: 'zuri', avatar: 'https://storage.googleapis.com/pacitude-buckets/zuri.png' },
    { name: 'minho', avatar: 'https://storage.googleapis.com/pacitude-buckets/Minho.png' },
    { name: 'sophie', avatar: 'https://storage.googleapis.com/pacitude-buckets/sophie.png' },
    { name: 'trab', avatar: 'https://storage.googleapis.com/pacitude-buckets/trab.png' },
]

const pagination: IPagination = {
    next: { page: 1, limit: 25 },
    prev: { page: 1, limit: 25 },
}

const limits: Array<{ label: string, value: number }> = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 },
    { label: '200', value: 200 }
]

const difficulties = [
    { name: 'Random', value: 'random' },
    { name: 'Easy', value: 'easy' },
    { name: 'Normal', value: 'normal' },
    { name: 'Hard', value: 'hard' },
    { name: 'Difficult', value: 'difficult' }
]

const coreResoruce: ICoreResource = {
    forms: [],
    blocks: [],
    questions: [],
    responses: [],
};

const apiresponse: IAPIResponse = {
    error: false,
    errors: [],
    report: {
        format: '',
        csv: '',
        pdf: '',
        xml: '',
    },
    count: 0,
    total: 0,
    pagination: pagination,
    data: null,
    message: '',
    token: '',
    status: 200,
};



export {
    avatars,
    pagination,
    limits,
    difficulties,

    coreResoruce,
    apiresponse,
}