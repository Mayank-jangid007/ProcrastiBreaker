import React from 'react';

class ErrorBoundary extends React.Component{
    state ={
        error: ''
    }

    static getDerivedtateFromError(error){
        return{
            error: error
        }
    }
    componentDidCatch(error, info) {
        console.log('error is: ', error);
        console.log('info is: ', info);
    }

    render(){
        if(this.state.error){
            return(
                <div>
                    <h2>Some Error Occured...</h2> 
                    <p>Here is what happened: {this.state.error}</p>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;