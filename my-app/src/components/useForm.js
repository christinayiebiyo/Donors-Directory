import React, {useState, useEffect} from 'react'; 

const useForm = (initialValues, validate, setCurrentId) => {

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target 
        const fieldValue = { [name]: value}
        setValues({
          ...values, 
          ...fieldValue,
        })
        validate(fieldValue)
      }
      
    const resetForm = () => { 
      setValues({...initialValues})
      setErrors({})
      setCurrentId(0)
    }
    return {
        values, 
        setValues, 
        errors, 
        setErrors,
        handleChange,
        resetForm
    };
}
 
export default useForm;