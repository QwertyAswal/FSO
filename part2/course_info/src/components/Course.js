import React from 'react'


const Header = (props) => {
    return (
        <h2>{props.course}</h2>
    )
}

const Part = (props) => {
    return (
        <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Content = ({ parts }) => {
    const content = parts.map(part => <Part key={part.id} part={part} />)
    return (
        <>
            {content}
        </>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <p><b>Total of {total} exercises</b></p>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course