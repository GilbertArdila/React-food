/* eslint-disable react/prop-types */


const Error = ({title, message}) => {
  return (
    <div className='w-60 mx-auto max-w-25rem p-4 bg-red-200 text-red-800 rounded-lg'>
        <h2 className="m-0">{title}</h2>
        <p className="m-0">{message}</p>
    </div>
  )
}

export default Error;