import { useHistory } from 'react-router-dom';
import React, { useState, useEffect, Fragment } from 'react'
import Loader from "react-loader-spinner"

import Button from '../components/Button'
import APIGateway from '../utils/APIGateway.js'

export default function CreatePoll() {
    const [title, setTitle] = useState('')
    const [answers, setAnswers] = useState([''])
    const [error, setError] = useState("Fill in all fields")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const removeAnswer = (index) => {
        setAnswers(answers.filter((_choice, choiceIndex) => index !== choiceIndex))
    }
    const onAnswerChange = (index, value) => {
        setAnswers(answers.map((choice, choiceIndex) => index === choiceIndex ? value : choice))
    }

    const checkForErrors = () => {
        if (!title) {
            setError("A title value must be specified")
            return
        }
        let filteredAnswers = answers.filter(v => v !== "")
        if (filteredAnswers.length < 1) {
            setError("Atleast one answer value must be specified")
            return
        }
        setError(null)
    }

    useEffect(() => {
        // Errors are updated when the user tries to create the poll.
        // If no errors, we create the poll, then navigate home.
        if (!error) {
            setLoading(true)
            let filteredAnswers = answers.filter(v => v !== "")
            console.log(filteredAnswers)
            APIGateway.createPoll(title, filteredAnswers)
            setTimeout(() => {
                setLoading(false)
                history.push('')
            }, process.env.REACT_APP_API_POST_WAIT || 3000)
        }
    }, [error, answers, history, title]);

    return (
        <div className="container mx-auto mt-16 px-5">
            <div className="w-full max-w-3xl mx-auto rounded shadow-md bg-white">
                <header className="border-b border-gray-400 px-8 py-5 text-gray-800">
                    Create Poll
                </header>
                <div className="py-5 px-8">
                    {error ? (
                        <Fragment>
                            <p className="w-full mb-2 bg-red-500 text-white py-3 px-2 rounded">{error}</p>
                        </Fragment>
                    ): null}
                    <div className="mb-6">
                        <label htmlFor="title" className="text-sm mb-2 inline-block">Poll Title:</label>
                        <input
                            onChange={(event) => setTitle(event.target.value)}
                            value={title}
                            name="title"
                            id="title"
                            type="text"
                            className="w-full py-2 border border-gray-400 rounded px-4"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="text-sm mb-2 inline-block">Poll Answers:</label>
                        {answers.map((choice, index) => (
                            <div key={index} className="w-full flex items-center mb-2">
                                <input
                                    onChange={(event) => onAnswerChange(index, event.target.value)}
                                    value={choice}
                                    key={index}
                                    type="text"
                                    className="w-full py-2 border border-gray-400 rounded px-4"
                                />
                                <Button variant="danger" onClick={() => removeAnswer(index)}>Remove</Button>
                            </div>
                        ))}
                    </div>
                    <Button onClick={() =>  setAnswers([...answers, ''])}>Add Choice</Button>
                    <div className="mt-12 mb-6 text-center">
                        {loading ? (
                            <Loader className="flex justify-center" type="Oval" color="#00BFFF" height={40} width={40} />
                        ): (
                            <Button onClick={checkForErrors}>Create Poll</Button>
                        )}
                    </div>
                </div>
            </div>
       </div>
    )
}
