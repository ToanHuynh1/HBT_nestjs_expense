const data: Data = {
    reports: []
}

interface Data {
    reports: {
        id:string
        source: string
        amount: string
        create_at:Date
        updated_at:Date
        type:ReportType
    }[]
}

enum ReportType {
    INCOME = "income",
    EXPENSE = "expense"
}