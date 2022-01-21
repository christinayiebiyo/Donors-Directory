import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import 
{ Button,
ButtonGroup,
Grid, 
    Paper,
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    withStyles, 
} from "@material-ui/core";
import DCandidateForm from "./DCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from 'react-toast-notifications';

const styles = theme => ({
    root: { 
        "&. MuiTableCell-head":{
            fontSize: "1.25rem"
        }
    },
    paper : { 
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    }
})


const DCandidates = ({classes, ...props}) => {
    const [currentId, setCurrentId] = useState(0)

    useEffect(() => {
        props.fetchAllDCandidates()
    }, [])
    
    const { addToast } = useToasts();

    const onDelete = (id) => { 
        if(window.confirm('Are you sure you want to delete this record ?'))
        {
            props.deleteDCandidate(id, () => addToast("Record deleted successfully", {appearance: 'info'}))
        }
    } 
    return (
        <Paper className={classes.paper}>
            <Grid container>
                <Grid item xs={6}>
                    <DCandidateForm {...({currentId, setCurrentId})}/>
                </Grid>
                <Grid item xs={6}>
                    <TableContainer>
                        <Table>
                            <TableHead className={classes.root}>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Mobile</TableCell>
                                    <TableCell>Blood Group</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    props.dCandidateList.map((record, index) => { 
                                        return (
                                            <TableRow key={index} hover>
                                                <TableCell>{record.fullName}</TableCell>
                                                <TableCell>{record.mobile}</TableCell>
                                                <TableCell>{record.bloodGroup}</TableCell>
                                                <TableCell>
                                                    <ButtonGroup variant="text">
                                                        <Button>
                                                            <EditIcon 
                                                            color="primary" 
                                                            onClick={() =>{setCurrentId(record.id)}}
                                                            />
                                                        </Button>
                                                        <Button>
                                                            <DeleteIcon 
                                                            color="secondary"
                                                            onClick={() => {onDelete(record.id)}} 
                                                            />
                                                        </Button>
                                                    </ButtonGroup>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <div></div>
                </Grid>
            </Grid>
        </Paper>
      );
}

const mapStateToProps = state => {
    return {
        dCandidateList: state.dCandidate.list
    }
}

const mapActionToProps = {
    fetchAllDCandidates: actions.fetchAll,
    deleteDCandidate: actions.Delete
}


export default connect (mapStateToProps, mapActionToProps)(withStyles(styles)(DCandidates));
