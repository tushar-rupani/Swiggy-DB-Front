import React, { useState } from 'react'
import OneToOne from './components/OneToOne'
import OneToMany from './components/OneToMany';
import ManyToMany from './components/ManyToMany';
import OneToManyPolymorphic from './components/OneToManyPolymorphic';
import ManyToManyPolymorphic from './components/ManyToManyPolymorphic';

interface CurrentProps {
    key: string;
    title: string
}
const Home = () => {
    const [current, setCurrent] = useState<CurrentProps>({
        key: "1",
        title: "One to One Relationship"
    })
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let configForCurrent;
        switch (e.target.value) {
            case "1":
                configForCurrent = { key: "1", title: "One to One Relationship" }
                break;
            case "2":
                configForCurrent = { key: "2", title: "One to Many Relationship" }
                break;
            case "3":
                configForCurrent = { key: "3", title: "Many to Many Relationship" }
                break;
            case "4":
                configForCurrent = { key: "4", title: "Polymorphic Relationship" }
                break;
            case "5":
                configForCurrent = { key: "5", title: "Many to Many Polymorphic Relationship" }
                break;
            default:
                configForCurrent = { key: "1", title: "One to One Relationship" }
                break;

        }
        setCurrent(configForCurrent);
    }
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", margin: "10px 30px" }}>
                <select onChange={handleChange} style={{ padding: "10px", width: "40%" }}>
                    <option value="1">One to One</option>
                    <option value="2">One to Many</option>
                    <option value="3">Many to Many</option>
                    <option value="4">Polymorphic</option>
                    <option value="5">Many to Many Polymorphic</option>
                </select>
            </div>
            <h2 style={{ textAlign: "center" }}>{current.title}</h2>
            {current.key === "1" ? <OneToOne /> : current.key === "2" ? <OneToMany /> : current.key === "3" ? <ManyToMany /> : current.key === "4" ? <OneToManyPolymorphic /> : current.key === "5" ? <ManyToManyPolymorphic /> : ""}

        </>

    )
}

export default Home
