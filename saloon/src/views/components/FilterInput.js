import React from 'react';

const style = {
    border: 0,
    textAlign: 'center',
    marginLeft: '1em'
}

export default class FilterInput extends React.Component {
    render(){
        return(
            <input style={style}
                   type="text"
                   placeholder="Filtruj"
                   onChange={this.props.onChange}
                   value={this.props.value}
                   autoComplete="new-password"/>
        )
    };
}