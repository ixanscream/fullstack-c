import React, { useState } from 'react';
import moment from 'moment';
import DatePicker  from 'react-datepicker';
import ResultService from '../services/ResultService'

function ResultForm() {
       //initial Result
    const initialResult = {
        repositoryName: '',
        status: '',
        findings: [],
        queuedAt:moment().valueOf(),
        scanningAt:moment().valueOf(),
        finishedAt:moment().valueOf()
    }

    //state of a Security Scan Result
    const [result, setResult] = useState(initialResult);    

    //state of Findings
    const [findings, setFindings] = useState([]);

    // submit a Security Scan Result
    const handleSubmit = async () => {
        try {
            await ResultService.addResult({...result, findings: findings});
            setFindings([]);
            setResult(initialResult);
        } catch (err) {
            console.log(err)
        }
    }

     // add a finding for a Security Scan Result
    const addFinding = () => {
        setFindings(
            [
                ...findings, 
                {
                    type: '',
                    ruleId: '',
                    location: {
                        path: '',
                        positions: {
                            begin: {
                                line: 0
                            }
                        }
                    },
                    metadata: {
                        descriptions: '',
                        severity : ''
                    }
                }
            ]);
    }

    //delete a finding before submitting Security Scan Result 
    const delFinding = (index) => {
        setFindings([...findings.filter((finding, i) => i !== index)])
    }

    //handle change finding form see ResultForm.js
    const handleChangeFinding = (index, event) => {        
        let target = event.target.name;
        let value = event.target.value;

        let _updatedFinding = findings.map((o, i) => {
            if (index === i){
                if(target === 'type' || target === 'ruleId')  return {...o, [target]:  value}

                if(target === 'metadata.descriptions')  return {...o, metadata: { descriptions : value, severity: o.metadata.severity }}

                if(target === 'metadata.severity')  return {...o, metadata: { descriptions : o.metadata.descriptions, severity: value }}

                if(target === 'location.path') return {
                    ...o, 
                    location: 
                    { 
                        path: value, 
                        positions: 
                        { 
                            begin: 
                            { 
                                line: o.location.positions.begin.line 
                            }
                        }
                    }
                }

                if(target === 'location.positions.begin.line') return {
                    ...o, 
                    location: 
                    { 
                        path: o.location.path, 
                        positions: 
                        { 
                            begin: 
                            { 
                                line:  parseInt(value) 
                            }
                        }
                    }
                }
            }  
            return o
        })
        setFindings(_updatedFinding)
    }     

    const renderFindings = (finding, i) => {
        return (
          <div key={i} className="carbonads columnStyle">
              <input 
                className="formStyle blockStyle" 
                type="text" 
                placeholder="type" 
                name="type" 
                onChange={(event) => handleChangeFinding(i, event)} 
                value={finding.type} />

              <input 
                className="formStyle blockStyle" 
                type="text" 
                placeholder="rule id" 
                name="ruleId" 
                onChange={(event) => handleChangeFinding(i, event)} 
                value={finding.ruleId} />

              <input 
                className="formStyle blockStyle" 
                type="text" 
                placeholder="location path" 
                name="location.path" 
                onChange={(event) => handleChangeFinding(i, event)} 
                value={finding.location.path}  />

              <input 
                className="formStyle blockStyle" 
                type="number" 
                placeholder="location positions line" 
                name="location.positions.begin.line" 
                onChange={(event) => handleChangeFinding(i, event)} 
                value={finding.location.positions.begin.line}  />

              <input 
                className="formStyle blockStyle" 
                type="text" 
                placeholder="metadata severity" 
                name="metadata.severity" 
                onChange={(event) => handleChangeFinding(i, event)}  
                value={finding.metadata.severity} />
              
              <textarea 
                className="formStyle blockStyle" 
                type="text" 
                placeholder="metadata descriptions" 
                name="metadata.descriptions" 
                onChange={(event) => handleChangeFinding(i, event)} 
                value={finding.metadata.descriptions}/>

              <button type="button" className="btn" onClick={(event) => delFinding(i)} >Delete</button>
          </div>
        );
    };

    return (      
        <form onSubmit={handleSubmit}>
            <div className="carbonads">
                <div className="columnStyle-2">
                    <dl>
                        <dt>Repository name</dt>
                        <dd>
                            <input 
                                type="text" 
                                className="formStyle" 
                                placeholder="repository name" 
                                name="repositoryName" 
                                onChange={event  => setResult({...result, repositoryName : event.target.value })} 
                                value={result.repositoryName} />
                        </dd>
                        <dt>Status</dt>
                        <dd>
                            <select 
                                className="formStyle"
                                name="status"
                                value={result.status} 
                                onChange={event => setResult({...result, status: event.nativeEvent.target[event.nativeEvent.target.selectedIndex].value})}>
                                <option value=''>select status</option>
                                <option>Queued</option>
                                <option>In Progress</option>
                                <option>Success</option>
                                <option>Failure</option>
                            </select> 
                        </dd>
                    </dl>
                </div>
                <div className="columnStyle-2">
                    <dl>
                        <dt>Queued</dt>
                        <dd>
                        <DatePicker
                            selected={result.queuedAt}
                            className="formStyle"
                            value={result.queuedAt}
                            onChange={date => setResult({...result, queuedAt: moment(date).valueOf()})}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="time"
                            dateFormat="MM/dd/yyyy HH:mm" />
                        </dd> 
                        <dt>Scanning</dt>
                        <dd>
                        <DatePicker
                            selected={result.scanningAt}
                            className="formStyle"
                            value={result.scanningAt}
                            onChange={date => setResult({...result, scanningAt: moment(date).valueOf()})}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="time"
                            dateFormat="MM/dd/yyyy HH:mm" />
                        </dd> 
                        <dt>Finished</dt>
                        <dd>
                        <DatePicker
                            selected={result.finishedAt}
                            className="formStyle"
                            value={result.finishedAt}
                            onChange={date => setResult({...result, finishedAt: moment(date).valueOf()})}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={30}
                            timeCaption="time"
                            dateFormat="MM/dd/yyyy HH:mm" />
                        </dd>                        
                    </dl>
                </div>
            </div>
            <div className="navStyle padderTop">
                <button type="button" className="btn" onClick={addFinding}>Add Finding</button>&nbsp;
                <button type="button" className="btn" onClick={handleSubmit}>Submit</button>               
            </div>
            {(findings.map((finding, i) => renderFindings(finding, i)))}                
      </form>
    );
}

export default ResultForm;
