import {useSelector} from 'react-redux'
import { useRef } from 'react'

const Profile = () => {
       const currentUser = useSelector(state => state.user)

       const fileRef = useRef(null)


    return(
        <>
        <div style={styles.container}>
          <h1>Profile</h1>
          <form style={styles.form}>
            <input type="file" accept='images/*'  ref={fileRef} hidden/>
             <img onClick={() => fileRef.current.click()} src={currentUser.img} alt="profile" style={styles.img} />
             <input type="text" id='username' placeholder='username' style={styles.user}/>
             <input type="password" id='password' placeholder='password' style={styles.user}/>            
          </form>
        </div>
        </>
    )
}


const styles = {
    container: {
        paddingTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
       
    
    },
    form: { 
        paddingTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',

       
    
    },
    img: {
        borderRadius: '50%',
        height: '50px',
        width: '50x',
        objectFit: 'cover',
        marginTop: '2px',
        textAlign: 'center',
    },
    user: {
        border: 'none',
        padding: '10px',
        marginTop: '10px',
        objectFit: 'cover',
        borderRadius: '5px',
        width: '100%',
    }
}

export default Profile