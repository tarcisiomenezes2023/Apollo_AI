import "./NewPrompt.css"

const NewPrompt = () => {
  return (
    <div className="newPrompt">
      <form className="newForm">
      <label htmlFor="file">
        <img src="/" alt="" />
      </label>
      <input id="file" type="file" multiple={false} hidden/>
      <input type="text" placeholder="Ask anything..." />
      </form>
    </div>
  )
}

export default NewPrompt
