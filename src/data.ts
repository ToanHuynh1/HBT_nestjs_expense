export enum ReportType {
    INCOME = "income",
    EXPENSE = "expense"
}


export const data: Data = {
    reports: [
    {
        id: 'uuid1',
        source: 'Salary',
        amount: 7500,
        created_at: new Date(),
        updated_at: new Date(),
        type: ReportType.INCOME
    },
    {
        id: 'uuid2',
        source: 'Youtube',
        amount: 2500,
        created_at: new Date(),
        updated_at: new Date(),
        type: ReportType.INCOME
    },
    {
        id: 'uuid3',
        source: 'Food',
        amount: 4500,
        created_at: new Date(),
        updated_at: new Date(),
        type: ReportType.EXPENSE
    },
    ]
}

interface Data {
    reports: {
        id:string
        source: string
        amount: number
        created_at:Date
        updated_at:Date
        type:ReportType
    }[]
}


