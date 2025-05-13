export const formaterTime = (timestamp) => {
    const date = new Date(timestamp)
    const formattedTime = date.toLocaleTimeString('es-ES', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    })
    return formattedTime
}