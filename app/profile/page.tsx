'use client';

import { useState } from "react";

export default function ProfilePage() {
    const [item, setItem ] = useState({
        title: "",
        description: "",
        target_amount: 0.00,
        category: "",
        deadline: "", // Might have to convert string to date
    });

    const [loading, setLoading ] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try{
            const res = fetch('/api/goals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });
        } catch (err: any){
            alert(err.message) // Change to a red message under form
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>Welcome to your profile!</h1>
            
            <h2>Add a Goal:</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="Title"
                    value={item.title}
                    onChange={(e) => setItem({ ...item, title: e.target.value })}
                />
                <input 
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => setItem({ ...item, description: e.target.value })}
                />
                <input 
                    placeholder="Target Amount"
                    type="number"
                    min={0}
                    max={100}
                    value={item.target_amount}
                    onChange={(e) => setItem({ ...item, target_amount: Number(e.target.value) })}
                />
                <input 
                    placeholder="Category"
                    value={item.category}
                    onChange={(e) => setItem({ ...item, category: e.target.value })}
                />
                <input 
                    type="date"
                    value={item.deadline}
                    onChange={(e) => setItem({ ...item, deadline: e.target.value })}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Goal"}
                </button>
            </form>
        </div>
    );
}
