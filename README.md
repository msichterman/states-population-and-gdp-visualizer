# Build Web-based Interactive Visualization Data Models Using D3.js vs. Vanilla JavaScript
***Disclaimer: This repository is public to showcase skills developed from this assignment. I am in no way reponsible for any academic integrity issues should any code be re-used or copied from any part of this assignment.**

See this repository in action [here](https://msichterman.github.io/CSCE411-Assignment3-D3/)!

## Motivation
This site was created to satisfy the requirements of an assignment in my `CSCE 411: Data Modeling for Systems Development` class at the University of Nebraska-Lincoln. The assignment was intended to help build the following skills:

* Building web-based interactive visualization data models using D3
* Understand the efficiency of using D3 by comparing it with vanilla JavaScript

The assignment presented us with a tsv dataset containing GDP and poplulation numbers for the U.S. states, and we had to visualize that information based on the requirements. This assigment helped teach how to build web-based interactive visualization data models by introducing aspects such as mouseover actions as well as informative tooltips to help display more specific information for each data point.

## Technologies
* HTML
* CSS
* JavaScript
  * [D3.js](https://d3js.org/)

## Getting Started
In order to use the application locally, you'll need to do a few things first.

1. Clone this repository and `cd` into the repository's directory
```
git clone https://github.com/msichterman/CSCE411-Assignment3-D3.git && cd ./CSCE411-Assignment3-D3
```

2. Install `http-server` which will allow us to create a local web server for the project. Depending on your computer's configuration, you may need to prefix this command with a `sudo`.
```
npm i http-server -g
```
or
```
sudo npm i http-server -g
```

3. Lastly, run the following command to get the project off the ground. This command will start up the local web server. Make changes and simply reload the page to see those changes in action. 

```
http-server -a localhost -p 8080 -c-1
```

4. Head over to [http://localhost:8080](http://localhost:8080) to see the application live!

## Get In Touch
* Follow me on [Twitter](https://twitter.com/mattsichterman)
* Connect with me on [LinkedIn](https://www.linkedin.com/in/msichterman/)
