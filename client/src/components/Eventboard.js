import React,{Component} from 'react';
import EventItem from './Eventitem';
import "../css/Dashboard.css";
import { INSPECT_MAX_BYTES } from 'buffer';
import { SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER } from 'constants';
import bg from './bg.jpg';
import tree from './tree.jpeg';
import th from './th.jpg';
import swag from './swag.jpg';
import calendar from './calendar.jpeg';

export default class Eventboard extends Component{
    constructor(props){
        super(props);
        
    }

    renderYear(year,items){
        const events = Object.keys(items).map(key=> {
            return this.renderMonth(key,year,items[key]);
        }); // iterate an object
        return events;
    }

    monthName = {
        1:"January",
        2:"February",
        3:"March",
        4:"April",
        5:"May",
        6:"June",
        7:"July",
        8:"August",
        9:"September",
        10:"October",
        11:"November",
        12:"December"
    }

    renderMonth(month,year,items){
        const events = items.map(item => {
            return this.renderItem(item.name,item.time,item.picture);
        }); // iterate an array
        return (
            <div>
                <div style={{marginLeft:'50px',marginBottom:'10px'}}>
                    <text ><b>{this.monthName[month]} {year}</b></text>
                </div>
                {events}
            </div>
        );
    }

    renderItem(name,time,picture){
        return (
            <EventItem name={name} time={time} picture = {picture} key={name}/>
        );
    }

    render(){
        const data = {
            2018: {
                10: [
                    {
                        "name": "CS Contest",
                        "time": "1pm - 3pm",
                        "location": "Los Angeles",
                        "picture": th,
                        "description": null 
                    },
                    {
                        "name": "Onsite Interview",
                        "time": "3pm - 5pm",
                        "location": "Menlo Park",
                        "picture": bg,
                        "description": null 
                    }
                ],
                12: [
                    {
                        "name": "Swag Dispense",
                        "time": "10am - 12pm",
                        "location": "Westwood",
                        "picture": swag,
                        "description": null
                    },
                    {
                        "name": "Birthday Party",
                        "time": "6pm",
                        "location": "Midvale Avenue",
                        "picture": tree,
                        "description": null
                    }
                ],
            },
            2019: {

            }
        };
        const events = Object.keys(data).map(key => {
            return this.renderYear(key,data[key]);
        });
        return (
            <div className="split-right right">  
            <div className="events">          
                <h2 style = {{marginTop:'40px', marginLeft:'50px', color:"green"}}>Events Calendar
                <img style = {{marginLeft:'5px'}} src={calendar} width="30" height="26" />
                </h2>
                {events}
           </div>
                <div className="footer">
                    <a href="dashboard"><i className="fa fa-plus add" ></i></a>   
                </div>
        
            </div>
        );
    }
}