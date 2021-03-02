import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import { Droppable } from "react-beautiful-dnd";
import ExerciseInDayDraggable from "./ExerciseInDayDraggable";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dayPaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const DayEditableContainer = ({
  day,
  changeDayName,
  changeSetOrRepsValue,
  keyProp,
}) => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={classes.dayPaper}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            name={"day" + keyProp + "Name"}
            variant="outlined"
            required
            fullWidth
            id={"day" + keyProp + "Name"}
            label={"Day " + (keyProp + 1) + " Name"}
            autoFocus
            onChange={(e) => changeDayName(keyProp, e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Droppable
            droppableId={keyProp.toString()}
            style={{
              borderStyle: "solid",
              borderWidth: "2px",
              borderColor: "#000",
              height: "100px",
            }}
          >
            {(provided2) => (
              <Grid
                {...provided2.droppableProps}
                ref={provided2.innerRef}
                item
                xs={12}
              >
                {day.exercises.map((exercise, key) => (
                  <ExerciseInDayDraggable
                    exercise={exercise}
                    exKey={key}
                    dayKey={keyProp}
                    key={key}
                    changeSetOrRepsValue={changeSetOrRepsValue}
                  />
                ))}

                {day.exercises.length === 0 ? (
                  <div
                    style={{
                      borderStyle: "dotted",
                      borderWidth: "1px",
                      borderColor: "#000",
                      padding: "8px",
                    }}
                  >
                    <Typography>
                      Search for an exercise and drag them in here!
                    </Typography>
                    {provided2.placeholder}
                  </div>
                ) : (
                  <div>{provided2.placeholder}</div>
                )}
              </Grid>
            )}
          </Droppable>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DayEditableContainer;
