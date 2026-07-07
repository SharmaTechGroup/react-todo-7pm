import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    appointments: [],
    appointmentsCount: 0
}

const TaskSlicer = createSlice({
    name: 'Task Slicer',
    initialState,
    reducers: {
        "addToShare": (state, action)=>{
            state.appointments.push(action.payload);
            state.appointmentsCount = state.appointments.length;
        }
    }
})

export const {addToShare} = TaskSlicer.actions;
export default TaskSlicer.reducer;