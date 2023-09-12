import { useEffect } from "react"

const useTitle=title=>{
    useEffect(()=>{
        document.title=`${title}-Chocolate Gallary `
    },[title])
}
export default useTitle;