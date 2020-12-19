import React, { useState, useEffect } from 'react';
import './Dashboard.css';

import axios from 'axios';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush,
} from 'recharts';
//   import { useHistory } from 'react-router-dom';

function Dashboard() {

    const [loading, setLoading] = useState(true);
    const [challengesByDates, setChallengesByDates] = useState([]);
    const [challengesByBlockName, setChallengesByBlockName] = useState([]);
    const [challengesByName, setChallengesByName] = useState([]);
    const [usersCount, setUsersCount] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true) 

            const { data } = await axios.get('/fcc/dashboard');
            setChallengesByBlockName(data[0])
            setChallengesByName(data[1])
            setChallengesByDates(data[2])
            setUsersCount(data[3])

            setLoading(false)            
        })()
    }, [])

    return (
        <>
            { loading ?
                <h2>Loading ...</h2>
            : 
                <div className="dashboard">                    
                    <div className="firstLine">
                        <div className="chart">
                            <h2>Challenges Statistics</h2>
                            <BarChart
                            width={700}
                            height={300}
                            data={challengesByBlockName}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#2C3A47" />
                                <Brush startIndex={0} endIndex={3}/>
                            </BarChart>
                        </div>
                        <div className="chart">
                            <h2>Sub Challenges Statistics</h2>
                            <BarChart
                            width={700}
                            height={300}
                            data={challengesByName}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#2C3A47" />
                                <Brush startIndex={0} endIndex={10}/>
                            </BarChart>
                        </div>
                    </div>
                    <div className="chart">
                        <h2>Date Statistics</h2>
                        <LineChart
                            width={1500}
                            height={300}
                            data={challengesByDates}
                            syncId="anyId"
                            margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                            }}
                        >           
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#2C3A47" fill="#2C3A47" strokeWidth={4}/>
                            <Brush />
                        </LineChart>
                    </div> 
                    <div className="chart">
                        <h2>Users Statistics</h2>
                        <BarChart
                        width={1500}
                        height={300}
                        data={usersCount}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="username" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#2C3A47" />
                            <Brush />
                        </BarChart>
                    </div>
                </div>        
            }        
    </>
    )
}

export default Dashboard
