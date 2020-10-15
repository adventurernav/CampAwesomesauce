import { TextField } from "@material-ui/core";
import React, { Component } from "react";

type bmState ={
year: string
}

class BMAPI extends Component {
state={
    year: '',
}

handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({ year: e.target.value });
}

    render() {
        return (
            <div>
                <TextField
                autoFocus
                label='Year'
                type='text'
                fullWidth
                variant="outlined"
                value={this.state.year}
                onChange={(e) => {
                    this.handleChange(e);
                }}
            />
            </div>
        )
    }
}
export default BMAPI;