/* eslint-disable react/prop-types */


const Button = ({children, textOnly,className, ...props}) => {

    let cssClasses = textOnly ? 'font-inherit cursor-pointer bg-transparent border-none text-yellow-400 transition-colors duration-300 ease-in-out hover:text-yellow-500 active:text-yellow-600' : 'font-inherit cursor-pointer bg-yellow-400 border border-yellow-400 text-yellow-900 px-6 py-2 rounded-md transition-colors duration-300 ease-in-out hover:bg-yellow-500 hover:border-yellow-500 hover:text-yellow-900 active:bg-yellow-600 active:border-yellow-600 active:text-yellow-900';
    cssClasses += ' '+className;
  return (
    <button className={cssClasses} {...props}>{children}</button>
  )
}

export default Button;