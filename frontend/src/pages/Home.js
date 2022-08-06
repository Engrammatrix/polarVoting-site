import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import APIGateway from '../utils/APIGateway.js'

export default function Home() {
    const [polls, setPolls] = useState([])

    useEffect(() => {
        APIGateway.getPollsList().then(pollsData => {
            let sortedPollsData = pollsData.sort((a, b) => {
                return new Date(b.date_created) - new Date(a.date_created);
            })
            setPolls(sortedPollsData)
        })
    }, [])

    const getDaysAgoCreatedString = (poll) => {
        let today = new Date()
        let createdOn = new Date(poll.date_created)
        let msInDay = 24 * 60 * 60 * 1000;
        createdOn.setHours(0,0,0,0);
        today.setHours(0,0,0,0)
        let diff = Math.floor((+today - +createdOn)/msInDay)
        return diff === 0 ? "today" : diff > 30 ? "over 30 days ago" : `${diff} days ago`
    }

    return (
        <div className="container mx-auto px-5">
            <h1 className="text-5xl text-center my-10">Polar Voting</h1>
            <div className="w-full max-w-3xl mx-auto bg-white shadow">
                    {polls.map(poll => (
                        <div key={poll.id} className="w-full px-4 py-4 border-b border-gray-400 flex justify-between">
                            <div>
                            {poll.title}
                            <p className="text-sm text-left text-gray-500">{getDaysAgoCreatedString(poll)}</p>
                            </div>
                            <Link className="cursor-pointer hover:text-blue-600 text-blue-500" to={`/polls/${poll.id}`}>View poll</Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}
