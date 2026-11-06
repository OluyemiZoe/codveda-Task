const BACKEND_URL = 'http://localhost:4000/graphql';

window.executeGraphQL = async (query, variables = {}, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(BACKEND_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables })
    });
    const json = await res.json();
    if (json.errors) throw new Error(json.errors[0].message);
    return json.data;
};
