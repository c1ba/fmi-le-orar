export const verifyIfCourseIsNow = (subject: any, nowDate: Date , beginningHour: number, timeDuration: number) => 
(!subject.onceEveryTwoWeeks || 
    (subject.onceEveryTwoWeeks && (Boolean(nowDate.getDate() / 7 % 2) === subject.isOdd))) && 
(beginningHour <= nowDate.getHours() && beginningHour + timeDuration > nowDate.getHours())

export const courseIsInTheFuture = (subject: any, nowDate: Date, beginningHour: number, timeDuration: number) => 
(!subject.onceEveryTwoWeeks || 
    (subject.onceEveryTwoWeeks && 
        (Boolean(nowDate.getDate() / 7 % 2) === subject.isOdd))) && 
        ((beginningHour + timeDuration) > nowDate.getHours())