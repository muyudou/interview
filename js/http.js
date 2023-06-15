class HttpUtil {
    async get(url) {
        const res = await fetch(url);
        const data = res.json();
        return data;
    }
    async post(url, data) {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const result = await res.json()
        return result
    }
    async put(url, data) {
        const res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        });
        const result = await res.json();
        return result;
    }
    async delete(url, data) {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        })
        const result = await res.json();
        return result;
    }
}