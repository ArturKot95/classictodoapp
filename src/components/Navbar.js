export default function Navbar (props) {
  return <div className="navbar navbar-expand lg bg-dark navbar-dark">
    <div className="container-fluid">
      <h1 className="navbar-brand mb-0">ArtuTodoIto</h1>
      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newTodoModal">New</button>
    </div>
  </div>
}