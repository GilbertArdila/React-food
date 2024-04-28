/* eslint-disable react/prop-types */


const Input = ({id,label,...props}) => {
  return (
    <p className='flex  flex-col my-1 mx-auto '>
        <label className="font-bold mb-1" htmlFor={id}>{label}</label>
        <input className="w-full max-w-80 p-1 font-inherit rounded-md border border-gray-300" id={id} name={id} required {...props} />
    </p>
  )
}

export default Input;