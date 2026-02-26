const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          <Header  name={course.name} />
          <Content parts={course.parts} />
        </div>
    ))}
    </div>
  )
}

const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Content = ({parts}) => {
  const total = parts.reduce((s, p) => s + p.exercises, 0)
  return (
  <div>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    <b>total of {total} exercises </b>
  </div>
  )
}

const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>
}

export default Courses
