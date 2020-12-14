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

    useEffect(() => {
        (async () => {
            setLoading(true) 

            const byDate = await axios.get('/fcc/by-date');
            setChallengesByDates(byDate.data);

            setLoading(false)            
        })()
    }, [])

    // let history = useHistory();

    return (
        <>
            { loading ?
                <h2>Loading ...</h2>
            : 

                    <div className="dashboard">
                        {/* <div className="firstLine">
                            <div className="chart">
                                <h2>Links Statistics</h2>
                                <BarChart
                                width={700}
                                height={300}
                                data={links}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="purple" />
                                    <Brush startIndex={0} endIndex={4}/>
                                </BarChart>
                            </div>
                            <div className="chart authorChart">
                                <h2 className="authorsChartH2">Authors Statistics</h2>
                                <BarChart
                                width={700}
                                height={300}
                                data={linksByAuthors}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="count" fill="green" />
                                    <Brush startIndex={0} endIndex={5}/>
                                </BarChart>
                            </div>
                        </div> */}
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
                    </div>        
            }
            
        
    </>
    )
}

export default Dashboard
