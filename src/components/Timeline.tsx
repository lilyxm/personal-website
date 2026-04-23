import React from "react";
import { Link } from 'react-router-dom';
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../assets/styles/Timeline.scss'

function Timeline() {
  return (
    <div id="history">
      <div className="items-container">
        <h1>Career History</h1>
        <VerticalTimeline>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: 'white', color: 'rgb(39, 40, 34)' }}
            contentArrowStyle={{ borderRight: '7px solid  white' }}
            date="Jan 2026 - Present"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Web Developer Co-Op</h3>
            <h4 className="vertical-timeline-element-subtitle">Survalent</h4>
            <p>
              Test Automation, DevOps, Frontend Development
            </p>
            <div className="timeline-project-links">
              <Link to="/project/survalent" className="timeline-link">Artifacts</Link>
            </div>
          </VerticalTimelineElement>
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date="May 2024 - Dec 2024"
            iconStyle={{ background: '#5000ca', color: 'rgb(39, 40, 34)' }}
            icon={<FontAwesomeIcon icon={faBriefcase} />}
          >
            <h3 className="vertical-timeline-element-title">Application Developer - Co-Op</h3>
            <h4 className="vertical-timeline-element-subtitle">University of Toronto FAS IIT</h4>
            <p>
              Frontend Development, Backend Development, User Experience, Team Leading
            </p>
            <div className="timeline-project-links">
            </div>
          </VerticalTimelineElement>
         
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default Timeline;