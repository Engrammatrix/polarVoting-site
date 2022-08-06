import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import APIGateway from '../utils/APIGateway.js'

export default function ViewPoll({ match }) {
    const [pollResult, setPollResult] = useState(null)

    useEffect(() => {
        APIGateway.getPollResults(match.params.poll).then(pollResultData=> {
            setPollResult(pollResultData)
        })
    }, [match.params.poll])

    const getChoiceResultString = (choiceVotes) => {
        let totalVotes = pollResult.results.total_votes
        if (choiceVotes === undefined) {
            choiceVotes = 0
        }
        return totalVotes === 0 ? 
            "0% (0 votes)" : 
            `${Math.round((choiceVotes / totalVotes) * 100)}% (${choiceVotes} ${choiceVotes === 1 ? "vote" : "votes"})`
    }

    return (
        <div className="container mx-auto mt-16 px-5">
            {pollResult ? (
                <div className="w-full max-w-3xl mx-auto bg-white shadow">
                    <header className="px-5 py-4 flex justify-between items-center">
                        {pollResult.title}
                        <span>Total Votes: {pollResult.results.total_votes}</span>
                    </header>
                    {pollResult.results.answers.map(answer => {
                        return (
                            <div className="px-5 py-4 border-t border-gray-400 flex justify-between items-center" key={answer.id}>
                                {answer.text}
                                <span className="text-blue-500">{getChoiceResultString(answer.votes)}</span>
                            </div>
                        )
                    })}
                </div>
            ) : null}
            <p className="text-center my-10">
                <Link className="cursor-pointer text-center hover:text-blue-600 text-blue-500" to={`/polls/${match.params.poll}`}>Back to Poll</Link>
            </p>
        </div>
    )
}
