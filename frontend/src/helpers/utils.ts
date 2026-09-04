
export function deepMerge(newObj:Record<string,unknown>, prevObj:Record<string,unknown>){

    const mergedObj:Record<string,unknown> = {}

    for (const key of Object.keys(prevObj)){
        if (newObj[key] !== undefined){
            if (isRecord(newObj[key]) && isRecord(prevObj[key])){
                mergedObj[key] = deepMerge(newObj[key],prevObj[key]);
            } else {
                mergedObj[key] = newObj[key];
            }
        } else {
            mergedObj[key] = prevObj[key];
        }
    }

    return mergedObj;
}

function isRecord(value: unknown): value is Record<string,unknown>{
    return typeof value==='object' && value !== null && !Array.isArray(value);
}
