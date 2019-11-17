import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import ResultService from '../services/ResultService'

function ListResults() {
  const [results, setResults] = useState([]);

  const formatDatetime = (date) => {
      return moment(date).format('MM/DD/YYYY HH:mm'); 
  }

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    
    const getResults =  async () => {
      try {
        const response = await ResultService.getResults(source.token);
        setResults(response)            
      } 
      catch (err) {
        if (axios.isCancel(err)) {
          console.log("cancelled");
        } else {
          console.log(err)
        }
      }
    }

    getResults();
    
    return () => {
      source.cancel();
    };
  }, []);
  
  const renderResult = result => {
        return (
            <div key={result.id} className="carbonads columnStyle">
                <dl>
                    <dt>Repository name</dt>
                    <dd>{result.repositoryName}</dd>
                    <dt>Status</dt>
                    <dd>{result.status}</dd>
                    <dt>Queued at</dt>
                    <dd>{formatDatetime(result.queuedAt)}</dd>
                    <dt>Scanning at</dt>
                    <dd>{formatDatetime(result.scanningAt)}</dd>
                    <dt>Finishied at </dt>
                    <dd>{formatDatetime(result.finishiedAt)}</dd>
                </dl>
                {
                  result.findings.length > 0 &&
                  <Link className="btn" to={`/detail/${result.id}`}>Findings <span className="badge">{result.findings.length}</span></Link>
                }
            </div>
        );
      };

  return (
      <div>          
        <h1>List Scan Result</h1>
        {(
          results.sort((a, b) => a.queuedAt < b.queuedAt).map(result => renderResult(result))
        )}
      </div>
  );
}

export default ListResults;
