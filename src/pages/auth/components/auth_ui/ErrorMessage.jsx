import React from 'react';

export default function ErrorMessage(props) {
    const errors = props.errors;
    const errorItems = errors.map((error) =>
      <div  key={error}>
        {error}
      </div>
    );
    return (
        <div className="alert alert-danger text-left">
            {errorItems}     
        </div>
    );
}