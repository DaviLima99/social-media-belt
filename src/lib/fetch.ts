
interface Props {
    url: string
    data?: any
}

export const post = async ({ url, data} : Props) => {
    const res = await fetch(url, {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST'
    })
    
    return res.json(); 
}

export const delet = async ({ url } : Props) => {
    const res =  await fetch(url, {
        method: 'DELETE'
    })

    return res.json();
}
