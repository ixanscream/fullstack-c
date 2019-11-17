# Full Stack Engineer Challenge

> This repo is the completion of the full stack engineer challenge.

- [Devops Exercise](#devops-exercise)
- [Backend Exercise](#backend-exercise)
- [Frontend Exercise](#frontend-exercise)

> **Full Stack MERN with Docker*: [MongoDB](https://www.mongodb.com/), [Express.js](https://expressjs.com/), [React.js](https://reactjs.org/), [Node.js](https://github.com/nodejs/node), [Docker](https://www.docker.com/)



```bash
├── ...
├── api
│   ├── models                      # Directory of models
│   │   └── results.js              # Model of result and rest api services
│   ├── app.js                      # Routes and default file backend api
│   ├── Dockerfile                  # Docker file for backend api
│   ├── package-lock.json
│   └── package.json                # Dependencies, scripts and information for backend api
├── dashboard
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src                         # Source codes of fashboard
│   │   ├── components              # Components dashboard
│   │   │   ├── ListFindings.js     # List of  findings (selected security scan)
│   │   │   ├── ListResults.js      # List of security scan results
│   │   │   ├── ResultForm.js       # Form for submitting a scan result
│   ├   ├── services                # Directory service
│   ├   │   └── ResultService.js    # Services or clean state retrieve data (json) from backend api
│   │   ├── App.css                 # Css style of this dashboard
│   │   ├── App.js                  # Routes and default file dashboard
│   │   ├── App.test.js
│   │   ├── index.css
│   │   └── index.js
│   ├── Dockerfile                  # Docker file for dashboard api
│   ├── package-lock.json
│   ├── package.json                # Dependencies, scripts and information of dashboard
│   └── README.md                   # Default readme react
├── docker-compose.yml
└── README.md                       # Documentation for this repo
```


## Devops Exercise

Before you run this app, please make sure that ports 3000 (dashboard), 3001 (api), 27017 (mongodb) not in used.


```
git clone https://github.com/ixanscream/fullstack-c.git
```


- For MacOS and Ubuntu
    - Install Docker
    - Clone the repo  git clone 
    - Run `docker-compose up`
    - Stop containers and removes volumes:  Run `docker-compose down -v` 

- For Windows
    - Install Docker or DockerToolbox
    - If DockerToolbox, then clone the repo in C:/Users/[username], eg. C:/Users/user
    - Change port-forward settings in Virtualbox
    (https://photos.app.goo.gl/Cic7cYvmEH9Txeve9)
    - Run `docker-compose up`
    - Stop containers and removes volumes:  Run `docker-compose down -v`

Now you can test [localhost:3000](http://localhost:3000)

## Backend Exercise

This completion is  written with node.js, express.js for the framework Rest API and mongodb for database, the file of Rest API [app.js](api/app.js) contains Routes and rest of json.

- Routes of `api`
    - [Retrieve the data of Security Scan Results from database](http://localhost:3001/api/results) `http get /api/results` see the method in [api/models/result.js](api/models/result.js)
    - [Retrieve the data of a Security Scan Result  from database](http://localhost:3001/api/result/id) `http get /api/result/:id` see the method in [api/models/result.js](api/models/result.js)
    - Submit the data of Security Scan Result `http post /api/result/:{data}` and save to database, see the method in [api/models/result.js](api/models/result.js)


## Frontend Exercise

- Screens
    - Form that allow submitting of a Security Scan Result [dashboard/components/ResultForm.js](dashboard/src/components/ResultForm.js)
    - List of Security Scan Results [dashboard/components/ResultForm.js](dashboard/src/components/ListResults.js)
    - List of findings for a selected Security Scan Results [dashboard/components/ResultForm.js](dashboard/src/components/ListFindings.js)

- Routes of `dashboard` [dashboard/App.js](dashboard/src/App.js)
    - `/` default route which display Security Scan Result Form
    - `/list` display list of Security Scan Results
    - `/detail/:id` display list findings of Security Scan Result  
    
And state management is located inside file [dashboard/services/ResultService.js](dashboard/src/services/ResultService.js)