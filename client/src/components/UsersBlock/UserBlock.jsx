import "./UserBlock.css"

function UserBlock({users, createModal, deleteUser}) {


    const removeUser= (id) => {
        deleteUser(id);
    }

    return(
        <div className="userBlock">
        {users.map((item, counter) => {
            return(
            <div className="user" >
            <div className="user_content"
                key={counter} 
                onClick={() => createModal(item)}
            >
                <span className="userText">{item.name}</span>
                <span className="userText">{item.mobilePhone}</span> 
                <span className="userText">{item.birthDate}</span>
                <span className="userText">{item.jobTitle}</span>
            </div>
                <button 
                className="remove_button"
                onClick={() => removeUser(item.id)}
                >
                    Delete
                </button>
            </div>
        )
      })}
      </div>
    )
}

export default UserBlock;