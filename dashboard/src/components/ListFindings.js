import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import ResultService from '../services/ResultService'

function ListFindings(props) {
    const [ findings, setFindings ] = useState([]);
    
    const getResult =  async () => {            
        try {
            const response = await ResultService.getResult(props.id);
            setFindings(response.findings)   
            console.log(response)    
        } 
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (findings.length === 0) getResult();
    })  

    const renderFindings = (finding, i) => {
        return (
        <div key={i} className="carbonads columnStyle">
            <dl>
                <dt>Rule id</dt>
                <dd>{finding.ruleId}</dd>
                <dt>Description</dt>
                <dd>{finding.metadata.descriptions}</dd>
                <dt>Severity</dt>
                <dd>{finding.metadata.severity}</dd>
                <dt>Path</dt>
                <dd>{finding.location.path}</dd>
                <dt>Line of code</dt>
                <dd>{finding.location.positions.begin.line}</dd>
            </dl>
        </div>
        );
    };

    return (
        <div>      
            <h1>List Findings</h1>
            <p> <Link className="btn" to="/list">Back To List Scan Result </Link> </p>    
            {(findings.map((finding, i) => renderFindings(finding, i)))}
        </div>    
    );
}
   

export default ListFindings;
