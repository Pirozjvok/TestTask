import { useState } from "react"

export const useLoading = (callback, onError) => {
    const [isLoading, setIsLoading] = useState(false)

    const loading = async (...args) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } 
        catch (e) {
            onError(e)
        } finally {
            setIsLoading(false)
        }
    }

    return [isLoading, loading]
}