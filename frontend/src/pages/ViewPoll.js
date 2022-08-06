import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loader from "react-loader-spinner"

import Button from '../components/Button'
import APIGateway from '../utils/APIGateway.js'

export default function ViewPoll({ match }) {
    const [poll, setPoll] = useState(null)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        APIGateway.getPoll(match.params.poll).then(pollData=> {
            setPoll(pollData)
        })
    }, [match.params.poll])

    const vote = async (choice) => {
        setLoading(true)
        APIGateway.castVote(match.params.poll, [choice])
        setTimeout(() => {
            setLoading(false)
            history.push(`/polls/${match.params.poll}/r`)
        }, process.env.REACT_APP_API_POST_WAIT || 3000)
    }

    return (
        <div className="container mx-auto mt-16 px-5">
            {poll ? (
                <div className="w-full max-w-3xl mx-auto bg-white shadow">
                    <header className="px-5 py-4 flex justify-between items-center">
                        {poll.title}
                        <Link className="cursor-pointer hover:text-blue-600 text-blue-500" to={`/polls/${match.params.poll}/r`}>View Results</Link>
                    </header>
                    {poll.answers.map(answer => {
                        return (
                            <div className="px-5 py-4 border-t border-gray-400 flex justify-between items-center" key={answer.id}>
                                {answer.text}
                                {!loading ? (
                                    <Button onClick={() => vote(answer.id)}>Vote</Button>
                                ): null}
                            </div>
                        )
                    })}
                </div>
            ) : null}
            {loading ? (
                <Loader className="flex justify-center py-5" type="Oval" color="#00BFFF" height={40} width={40} />
            ) : null}
            <p className="text-center my-10">
                <Link className="cursor-pointer text-center hover:text-blue-600 text-blue-500" to={''}>Back to List</Link>
            </p>
        </div>
    )
}
