import React, {useEffect, useState} from 'react'
import * as actions from "../actions/dCandidate";
import 
{ 
  Button, 
  FormControl, 
  FormHelperText, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField, 
  withStyles 
} from '@material-ui/core';
import useForm from './useForm';
import { connect } from "react-redux";
import { useToasts } from 'react-toast-notifications';


const styles = theme => ({
  root:{  
      '& .MuiTextField-root': { 
      margin: theme.spacing(1),
      minWidth: 230, 
    }
  },
  formControl: { 
    margin: theme.spacing(1),
    minWidth: 230, 
  },
  smallMargin: { 
    margin: theme.spacing(1),
  }
})
const initialValues = {
  fullName: '',
  mobile: '',
  email: '', 
  age: '', 
  address: '', 
  bloodGroup: '',
}

const DCandidateForm = ({classes, ...props}) => {
  
  const { addToast } = useToasts()

  const validate = (fieldValues = values) => { 
    let temp = {...errors}
    if('fullName' in fieldValues)
    {
      temp.fullName = fieldValues.fullName ? "" : "This field is required!"
    }
     
    if('mobile' in fieldValues)
    {  
      temp.mobile = fieldValues.mobile ? "" : "This field is required!"
    }

    if('bloodGroup' in fieldValues)
    {
      temp.bloodGroup = fieldValues.bloodGroup ? "" : "This field is required!"
    }

    if('email' in fieldValues)
    {
      temp.email = (/^$|.+@.+..+/).test(fieldValues.email) ? "" : "Email is not in valid format"
    }

    setErrors({
      ...temp
    })

    if(fieldValues==values)
    {
      return Object.values(temp).every( x => x == "")
    }
  }

  const {
    values, 
    setValues, 
    errors, 
    setErrors,
    handleChange, 
    resetForm
  } = useForm(initialValues, validate, props.setCurrentId)

  //material-uis selectDown options
  const inputLabel = React.useRef(null); 
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => { 
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = e => { 
    e.preventDefault()

    if(validate()) { 

      const onSuccess = () => {
        resetForm()
        addToast("Submitted successfully", {appearance: 'success'})
      }

      if(props.currentId ==0) { 
        props.createDCandidate(values,onSuccess)
      }
      else { 
        props.updateDCandidate(props.currentId, values, onSuccess)
      }
       
    }
   
  }

  useEffect(() => { 
      if(props.currentId != 0 ) 
      {
        setValues({...props.dCandidateList.find(x => x.id == props.currentId)})
        setErrors({})
      }
  }, [props.currentId])

    return (
      <form autoComplete='off' noValidate className={classes.root} onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={6} >
            <TextField 
              name ="fullName" 
              variant="outlined" 
              label="Full Name" 
              value={values.fullName}
              onChange={handleChange}
              {...(errors.fullName && {error: true, helperText: errors.fullName})}
            />
            <TextField 
              name ="email" 
              variant="outlined" 
              label="Email" 
              value={values.email}
              onChange={handleChange}
              {...(errors.email && {error: true, helperText: errors.email})}
            />

            <FormControl 
            variant= "outlined" 
            className={classes.formControl}
            {...(errors.bloodGroup && {error: true})}
            >
              <InputLabel ref={inputLabel}>Blood Group</InputLabel>
              <Select
                name="bloodGroup"
                value={values.bloodGroup}
                onChange={handleChange}
                labelWidth={labelWidth}
              >
                <MenuItem value="">Select Blood Group</MenuItem>
                <MenuItem value="A+">A+</MenuItem>
                <MenuItem value="A-">A-</MenuItem>
                <MenuItem value="B+">B+</MenuItem>
                <MenuItem value="B-">B-</MenuItem>
                <MenuItem value="AB+">AB+</MenuItem>
                <MenuItem value="AB-">AB+</MenuItem>
                <MenuItem value="O+">O+</MenuItem>
                <MenuItem value="O-">O-</MenuItem>
              </Select>
              {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
            </FormControl>

          </Grid>
          <Grid item xs={6}>
            <TextField 
              name ="mobile" 
              variant="outlined" 
              label="Mobile" 
              value={values.mobile}
              onChange={handleChange}
              {...(errors.mobile && {error: true, helperText: errors.mobile})}
            />
             <TextField 
              name ="age" 
              variant="outlined" 
              label="Age" 
              value={values.age}
              onChange={handleChange}
            />
             <TextField 
              name ="address" 
              variant="outlined" 
              label="Address" 
              value={values.address}
              onChange={handleChange}
            />

            <div>
              <Button variant="contained" color="primary" type="submit" className={classes.smallMargin}>
                Submit
              </Button>
              <Button variant="contained" className={classes.smallMargin} onClick={resetForm}>
                Reset
              </Button>
            </div>

          </Grid>
        </Grid>
      </form>
      );
}


const mapStateToProps = state => {
  return {
      dCandidateList: state.dCandidate.list
  }
}

const mapActionToProps = {
  createDCandidate: actions.create,
  updateDCandidate: actions.update, 

}

 
export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidateForm));