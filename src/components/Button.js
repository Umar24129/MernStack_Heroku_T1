//rafce  is the shortcut for the template u can say or pre maid function
import PropTypes from 'prop-types'   //type impt for proptype shortcut

const Button = ({ color, text, onClick }) => {
    // const onClick=(e)=>{
    //     console.log(e)    // u can pass in e in onClick which is event object and also in console log (e)
    //                               //to acces all of things like postion
    // }    // but since this is a component then it is better to add Onlick function where the component is called
    //    // and pass this onlcik in as a prop

    return (

        <button onClick={onClick}
         style={{ backgroundColor: color }} 
        className='btn'>{text}</button>

    )
}
Button.defaultProps={
    color: 'steelblue',
    text: 'Add',
    
}
Button.propTypes={           //propstype   first p small letter not capital
text: PropTypes.string,
color: PropTypes.string,
onClick: PropTypes.func,

}   


export default Button
