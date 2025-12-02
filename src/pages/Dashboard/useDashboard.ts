import { useEffect, useState } from 'react';


type User = {
id: number;
name: string;
username: string;
role: string;
expires_at?: string | null;
};


export function useDashboard() {
const [user, setUser] = useState<User>({ id: 0, name: 'Levi', username: '', role: '' });
const [loading, setLoading] = useState(true);
const [remaining, setRemaining] = useState('');


useEffect(() => {
const token = localStorage.getItem('token');
if (!token) {
setLoading(false);
return;
}


fetch('http://localhost:5000/me', {
headers: { Authorization: `Bearer ${token}` },
})
.then((res) => {
if (!res.ok) throw new Error('not authorized');
return res.json();
})
.then((data: User) => {
setUser(data);
if (data.expires_at) {
const r = calcRemaining(data.expires_at);
setRemaining(r);
}
})
.catch(() => {
// fallback: try to read stored user
const stored = localStorage.getItem('user');
if (stored) setUser(JSON.parse(stored));
})
.finally(() => setLoading(false));
}, []);


function calcRemaining(expires_at?: string | null) {
if (!expires_at) return 'Sem expiração';
const exp = new Date(expires_at).getTime();
const now = Date.now();
if (exp <= now) return 'Expirado';
const diff = exp - now;
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
return `${days}d ${hours}h restantes`;
}


}