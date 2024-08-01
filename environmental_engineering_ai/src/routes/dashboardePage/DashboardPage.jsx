import "./DashboardPage.css"

const DashboardPage = () => {
  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo2.png" alt="logo" />
          <h1>Apollo</h1>
        </div>
        <div className="options">
          <img src="/chat.png" alt="" />
          <span>Create a New Chat</span>
        </div>
        <div className="options">
          <img src="/image.png" alt="" />
          <span>Analyze Images</span>
        </div>
        <div className="options">
          <img src="/code.png" alt="" />
          <span>Help me with my Code</span>
        </div>
      </div>
      <div className="formContainer">
        <input type="text" placeholder="Ask me anything..." />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
        <form />
      </div>
    </div>
  )
}

export default DashboardPage