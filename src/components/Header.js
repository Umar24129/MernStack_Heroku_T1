//Upper case H as it is just a convention for components // could be a class or a function
//import PropTypes from 'prop-types'

import Button from './Button'

// const Header = (props) => {
//     return (
//       <header>
//           <h1>
//               {props.title} 
//               {/* we can do that props.title by {title} only here if we write
//                {title}  including curly braces instead of props */}
//           </h1>
//       </header>
//     )
// }
const Header = ({ title,onAdd, showAdd,Logout}) => {
 
    // const onClick=()=>{    // we can add onsubmit/ double click etc as well
    //     console.log("clicked from header onclick")    
    // }
    return (
        <header className='header'>
            {/* <h1 style={headingstyle}>  // inline style css */}  
            <h1 >
                {title}
            </h1>
            <Button color= {showAdd?'red':'green'}text={showAdd?'Close':'Add'}
             onClick={onAdd}></Button>
            <Button color= 'green' text='Logout'
             onClick={Logout}></Button>
           

            
        </header>
    )
}

Header.defaultProps = {
    title: "Task tracker ",
}
// Header.defaultProps={
//     title: PropTypes.string.isRequired,
// }

//CSS inline
// const headingstyle = { color: 'red', 
// backgroundColor: 'black', }


// we can do header.Proptype for setting type of props such as string number etc
// we can set it .isRequired that will set the page to not take in props if not the type required


export default Header
