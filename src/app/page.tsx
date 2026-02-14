'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';

// ============================================================================
// IMAGE CONFIGURATION
// ============================================================================
// Photos from your collection - organized by category

const imageConfig = {
  profile: {
    src: '/photos/profile/profile.jpg',
    alt: 'Anne Rose Sankar Raj - Profile Photo',
    placeholder: false, // Profile photo is now set
  },
  projects: {
    'smart-glove': {
      src: '/photos/projects/exhibition.jpg',
      alt: 'Smart Glove - ASL Gesture Recognition Wearable',
    },
    'parrot-mambo-ble-autonomy-stack': {
      src: '/photos/projects/project1.png',
      alt: 'Parrot Mambo Simulink Control System',
    },
    'swarm-robotics-for-assistive-navigation': {
      src: '/photos/projects/project2.png',
      alt: 'Swarm Robotics - ESP32 Ground Robots',
    },
  },
  boschLogo: '/photos/projects/bosch-logo.png',
  innovations: [
    { src: '/photos/innovations/regenerative-medicine.png', alt: 'Regenerative Medicine Research' },
    { src: '/photos/innovations/swafia.png', alt: 'SWAFIA - Software Warning Fixer' },
    { src: '/photos/innovations/fitfest.png', alt: 'FIT.FEST Technical Presentation' },
    { src: '/photos/innovations/bocse.png', alt: 'BoCSE Asia Pacific Conference' },
    { src: '/photos/innovations/datathon.png', alt: 'Datathon Winner' },
    { src: '/photos/innovations/hackathon.png', alt: 'Automation Hackathon' },
  ],
  awards: [
    { src: '/photos/awards/5-year-service.jpg', alt: '5-Year Service Certificate', caption: 'Bosch - 5 Years of Service (2024)' },
    { src: '/photos/awards/bravo-dec23.jpg', alt: 'Bravo Award Dec 2023', caption: 'Bravo Award - Flexibility & Project Support' },
    { src: '/photos/awards/kudos-dec23.jpg', alt: 'Kudos Award', caption: 'Kudos Award - Social Connect Initiatives' },
    { src: '/photos/awards/bravo-dec22.jpg', alt: 'Bravo Award Dec 2022', caption: 'Bravo Award - Toyota Hybrid System Projects' },
    { src: '/photos/awards/bravo-jun22.jpg', alt: 'Bravo Award June 2022', caption: 'Bravo Award - Team Building Activities' },
    { src: '/photos/awards/datathon-winner.png', alt: 'Datathon Winner Announcement', caption: 'NE1-PS DataHack Winner' },
    { src: '/photos/awards/bosch-award.jpg', alt: 'Bosch Award Ceremony', caption: 'Bosch Recognition Event' },
    { src: '/photos/awards/fitfest-award1.jpg', alt: 'FIT.Fest 2023 Award', caption: 'FIT.Fest 2023 - Runner Up' },
    { src: '/photos/awards/fitfest-award2.jpg', alt: 'FIT.Fest 2023 Award Ceremony', caption: 'FIT.Fest 2023 Award Ceremony' },
  ],
  gallery: [
    { src: '/photos/gallery/event1.jpg', alt: 'Corporate Event', caption: 'Professional Networking Event' },
    { src: '/photos/gallery/workshop.jpg', alt: 'Workshop Session', caption: 'Team Workshop & Collaboration' },
    { src: '/photos/gallery/team-collaboration.jpg', alt: 'Team Collaboration', caption: 'Team Collaboration & Hackathon' },
    { src: '/photos/gallery/presentation1.png', alt: 'Project Presentation', caption: 'Live Project Presentation' },
    { src: '/photos/gallery/presentation2.png', alt: 'Conference Presentation', caption: 'Conference Talk' },
  ],
};

// ============================================================================
// SOURCE TEXT - RESUME (verbatim)
// ============================================================================
const RESUME_RAW_TEXT = `ANNE ROSE SANKAR RAJ
+1 (929) 793-2559 | annerosesankarraj@gmail.com | linkedin.com/in/anne-rose-sankar-raj | New York, NY
PROFESSIONAL SUMMARY
Electrical Engineer with 5+ years in automotive ECU software integration and SIL/HIL validation, building R&D tools to improve software 
quality/efficiency and serving on Bosch's Engineering Elite task force supporting escalations under tight deadlines for Toyota, Jaguar Land Rover, 
Renault, Nissan, Isuzu and Mahindra. I then brought that production-grade integration and validation mindset into robotics and autonomy during 
my Columbia M.S., spanning sensor hardware integration and software architectures.
EDUCATION
Columbia University: Master of Science in Electrical Engineering, New York, NY Dec 2025
TECHNICAL SKILLS
Robotics Software: ROS 2, MAVROS, Gazebo simulation, real-time control systems, autonomous navigation, ArduPilot sensor integration | 
Embedded Systems: UART/SPI/I2C serial protocols, real-time telemetry logging, firmware development (ESP32, STM32), Pixhawk/ArduPilot | 
Programming & Systems: C++, Python, C, CAPL; Linux, Docker, Azure DevOps, Git/GitHub, MATLAB/Simulink | Validation & Testing: HIL/SIL 
testing, CANalyzer, ETAS toolchain, LibFuzzer fuzz testing, regression testing, data logging analysis | AI/ML Frameworks: TensorFlow, PyTorch, 
CUDA, reinforcement learning 
EXPERIENCE
UAV Autonomy and Systems Integration Engineer - Nonlinear Controls Lab (Founding Member) | Columbia University, NY Jan 2025 - Dec2025
• Led application specific requirements analysis for a GPS denied autonomous quadrotor, with rigorous comparisons of 7 platform options and 
documenting payload and sensor tradeoffs. Produced a complete bill of materials with about 50+ line items, reducing build ambiguity and 
preventing late-stage integration rework by 20%.
• Designed the drone electrical system architecture for electrical safety, external sensor integration and battery power distribution. Built and soldered 
the wiring harness and power layout supporting 9 sensors and peripherals, cutting bench bring up failures and power related resets by 78%
during early testing.
• Integrated Raspberry Pi 5 as the companion computer for autonomy workflows. Set up ROS 2 with MAVROS and MAVLink, configured radio 
telemetry and brought up OAK D Lite RGB and depth visualization in RViz2, improving developer debug throughput by enabling real time 
perception and telemetry inspection.
• Implemented multi sensor navigation inputs for state estimation and obstacle avoidance. Integrated ultrasonic sensors for obstacle avoidance in 
ArduPilot and ROS and integrated MatekSys optical flow 3901-L0X, barometer and TF Luna ToF LiDAR for altitude aiding, improving EKF3 
stability to 43% fewer estimator dropouts across indoor and low light trials.
• Executed structured field experiments across 8 lighting conditions and collected about 750+ hours of logged flight data for sensor output analysis, 
accelerating tuning cycles and enabling repeatable validation evidence for stable EKF3 performance.
Senior Software Engineer - Embedded Systems Integration & Validation | Robert Bosch, Coimbatore, India Feb 2019 - Jul 2024
• Delivered 100+ ECU software baselines on MDG1 multicore and Mx17 single core platforms across diesel, gasoline and hybrid EV projects, 
owning V cycle integration plus system validation and customer ready build packaging.
• Led production release discipline with 200+ regression and safety checks per release, including freeze and green release readiness, reprogramming, 
OTA flashing validation, DID testing and EEPROM driving cycle verification for Renault, Volkswagen, Jaguar Land Rover, Toyota, Nissan and
others, earning multiple Bravo awards, customer appreciation notes and the "We Truly Appreciate" award for catching a safety critical sleeping 
bug before escalation plus selection for a CEO dine and dialog cohort of 16 employees.
• Owned encrypted communication validation using CAPL and CANalyzer, replicated CAN master slave ECU behavior for HIL and bench testing, 
increased bus level fault coverage by 35% and reduced integration debug time by 50%, while serving as Lab HIL owner for ETAS LabCar with 
uptime above 98% and delivering sign off evidence packs, recognized with collaborator, Kudos and Bravo awards.
• Built Python based robustness tooling using LibFuzzer style fuzz workflows and automated pipelines in Linux and Docker, integrated with Azure 
DevOps CI, reducing escaped edge case failures by 30% and improving test throughput by 2x, gaining direct visibility in an innovation program 
and repeated responsibility as quality reviewer.
• Drove innovation wins from 2019 to ongoing: Top 10 finalist out of 200+ ideas for TutorBot Automation Hackathon, winner of 2021 Datathon 
building a CAN safety chatbot, Top 15 finalist out of 600 + registrations at BoCSE Asia Pacific 2022 exploring NXP S32G2 and LLCE behavior, 
runner up at FIT FEST 2023 and secured Bosch Centre of Excellence funded incubation for SWAFIA 2023 ongoing with a working proof of 
concept achieving 96% analysis accuracy and CoE collaboration.
SELECTED PROJECTS 
• Smart Glove: Built an ESP32 wearable that captures ASL gestures using flex sensors and an MPU6050 6 axis IMU, streams data to a Raspberry 
Pi over an internet socket and runs an ML inference pipeline to output real time text plus speech for inclusive communication.
• Parrot Mambo BLE Autonomy Stack: Implemented an SE3 geometric tracking controller in Simulink with a 200 Hz control loop and a 5 Hz
notch filter, achieving 15% lower RMSE and 57% faster settling on circular tracking plus 5.6x lower RMSE on high pitch maneuvers versus PID.
• Swarm Robotics for Assistive Navigation (2025): Built 2 ESP32 ground robots running HC SR04 obstacle avoidance at 20 Hz plus a Raspberry 
Pi 4B node running a quantized YOLO model in ONNX Runtime at 10 to 12 FPS with 90% mAP, validated in a 10 m by 3 m indoor setup with 
n equals 20 static and n equals 20 dynamic trials and up to 96% avoidance success.`;

// ============================================================================
// SOURCE TEXT - CV (verbatim)
// ============================================================================
const CV_RAW_TEXT = `ANNE ROSE SANKAR RAJ
Shanthi Nilayam, No:11, 11th cross street,
Balaji Nagar, Kattur, Tiruchirappalli,Tamil Nadu, India -620019
Email: annerose710@gmail.com | Phone: +91 8300161938
LinkedIn: www.linkedin.com/in/anne-rose-sankar-raj
PERSONAL PROFILE:
Self-taught and highly motivated individual looking forward to pursuing Master of Science degree in Electrical 
Engineering with specialization in Integrated Circuits and Systems. Software Product Developer with 5 years of
experience in the automotive domain. Tech enthusiast fascinated by new technologies and innovations. Quick 
learner and always ready to learn something new. Passionate and dedicated towards work. Organized and 
meticulous with all my endeavors. Experienced in academic research and entrepreneurial product research.
EDUCATION:
• Amrita Vishwa Vidyapeetham, Amrita University Coimbatore
Bachelor of Technology: Electrical and Electronics Engineering June 2015- April 2019
CGPA 8.05/10 [First class with Distinction]
• Senior-Secondary Education: CBSE mark % :85.4% Kanchipuram, May 2015
• Secondary Education: CBSE CGPA:10/10 Tiruchirappalli, May 2013
EMPLOYMENT EXPERIENCE [5 years]:
Robert Bosch Engineering and Business Solutions, Coimbatore, Tamil Nadu, India 2019-present
• June 2023 - Present
Senior Software Engineer: Innovation projects
o Software Developer: Innovation Projects – R&D Germany
o SW Fuzzing tool development with LibFuzzer, Automation with Python in Visual Studio code, 
Development in Linux Environment with Docker, End-to-End development in Azure DevOps, Analysis 
in ISOLAR-A tool for AUTOSAR Software Components, Repository in GitHub
• July 2022 - May 2023
Senior Software Engineer: Engine ECU [Electronic Control Unit] Software development
Promoted to next level.
• July 2019- June 2022
Associate Software Engineer: Engine ECU Software development
o Software Integration and System validation for development and series ECUs (MDG1: multicore and 
Mx17: single core)/VCU/DCU, for Diesel, Gasoline and Hybrid EV projects in different SWSH[Software 
Sharing] models
o SWSH CIL [Customer Interface Layer] adapter development (AUTOSAR/other architectures), Ehooks 
for enabling validation of when software and hardware are combined
o Software Freeze activities and Delivery Testing (Function Testing, Resource Measurement,
Reprogramming, Input/Output Car System testing, Flashing Over The Air testing, DID testing) and series 
testing (Car Function Testing, EEPROM driving cycle testing, Regression Testing, Viva testing)
OEMs: Renault, Nissan, Volkswagen, Jaguar and Land Rover, Isuzu and Toyota
• Feb 2019 – May 2019
Internship Trainee – Engine ECU Communication Software Validation 
o Developed the entire cyber security testing module for validating encrypted communication using CAPL
[Communication Access Programming Language]
o Replicated Master and Slave ECU - CAN communication for HIL testing with CANalyzer
o Lab HIL [Hardware In Loop] responsible for team. OEM: Mahindra
EMPLOYMENT SKILLS:
Software Sharing models (SWSH) | SWSH Adapter CIL Layer Development | AUTOSAR | Automation with 
Python | Chatbot development using Natural Language Processing | AI/ML Model development | Quality and 
Automotive process expert | Labcar Setup for HIL and SIL testing | Testing with UDE, INCA, CANalyzer, 
GLIWA, TPT, ETAS tools, ECUTest and TensorFlow | Software warning analysis (including MISRA, Procman,
Compiler) and fixing.
PROGRAMMING LANGUAGES:
Python, C, C++, CAPL, Perl
INNOVATIONS, RESEARCH AND EVENTS:
• Research on Exploring Applications in Regenerative Medicine [2024 ongoing]
Aided by performing conductivity studies for Dr. Michael Shanthi, Woman Scientist, DST, for her
funded work on "Cetrimide Templated Fine Nano β-TCP/Hap Biphasic Rods: Synthesis and 
Characterization". Poster presentation done and publication in process.
• SWAFIA- Funded Entrepreneurial Research [2023 - ongoing]
My entrepreneurial idea pitch-in "SWAFIA – Software WArning Fixer And Analyzer" won funded research from 
the Centre of Excellence in Bosch, India. I was offered collaboration with their team. The idea is currently under 
incubation and the preliminary Proof of concept is successfully exhibited with tool analysis accuracy of 96%
• Pick and Sell – FIT.FEST [2023]
Runner-up of On-spot technical presentation contest - add innovations to an existing product and 
successfully sell it to the judges, in Bosch India's biggest technical fest
• BoCSE – Asia and Pacific Chapter [2022]
"Bosch Conference on Systems and Software Engineering", In the hackathon event, my team was in the 
top 15 finalists from 600+ registrations of teams across Asia Pacific chapter (India, Vietnam, Mexico 
etc..) in Bosch in the track "Finding flaws in SoC NXP S32G2". We explored the new System on Chip 
and its components and checked properties of Linear Latency CAN Engine
• Datathon [2021]
Winner, During Covid-19 lockdown in 2021, I had participated in a section level virtual Datathon where 
I won the contest along with my team for automation coding creating "CAN safety chatbot" 
• Automation Hackathon [2019]
In my very first year of joining the professional world, as a fresher my idea of "TutorBot – one stop 
shop learning companion" made it to the top 10 finalists amongst 200+ ideas in the Automation 
Hackathon conducted in Bosch, India. 
• Live-in-Labs Community Service with Research [2017]
A group of 5 inter-disciplinary students (including me) resided in Kalinagar, a remote village in West 
Bengal, India for 6 days. We researched various ways to improve livelihood by suggesting technical 
methods to be implemented to generate income for the villagers. Published a paper on the work where 
the first authoring is shared between all equally.
ACADEMIC HONORS AND FELLOWSHIPS:
1. Paid Internship at Robert Bosch and Engineering solutions for 4 months in final semester of UG
(₹15000/month) [2019]
2. Distinction in B.Tech for securing Internship [2019]
3. Scholarship of ₹6000 for High rank in A certificate exam – National Cadet Corps Army wing from 
Government of India [2012]
4. INSPIRE award with ₹5000 seed money from Department of Science and Technology [DST] New 
Delhi, India [2010]
5. Special Highest rank and award in Olympiad Exam from Tamil Nadu Science Forum, India [2010]
6. General Proficiency award recipient each year for all years of schooling [2001-2013]
VOLUNTEER/COMMUNITY SERVICE
• Volunteering for tutoring for underprivileged kids in Govt school of Keeranatham village, Old age 
homes restoration, Waterbodies cleaning, Women sensitization initiatives etc., as part of Corporate 
Social Responsibility, Robert Bosch, Coimbatore [2019-present]
• Live in Labs - Income Generation initiative for Kalinagar village, West Bengal, India – [2017]
• Amrita SeRVe – Livelihood upliftment for Saadivayal – a tribal village in Coimbatore, Tamil Nadu,
India [2015-2019]
• AmalaBharatham – Government school cleaning and restoration drive in Saadivayal – a tribal village in 
Coimbatore, Tamil Nadu, India [2016]
• National Service in Army through National Cadet Corps [Junior wing]- [2011-2012]
• Volunteered at the Ecology Club and served as President, Montfort School, Tiruchirappalli [2011-2012]
• Donated at Hair Donation Drive for Cancer Foundation [2017]
• Active Blood Donation Member [2016-present]
LANGUAGE PROFICIENCY:
Tamil (Native), English (Educational and Professional)
EXTRA-CURRICULAR ACTIVITIES
• Professional Bharatanatyam Dancer [India Classical Dance form] for past 21 years
• State Level Award Winning Dancer – Indian traditional Folk Style
• Leader for Jhalak – Indian Freestyle dance team in college
• Orator [English and Tamil languages] – Won Multiple Awards
• Poetry writing – Won Multiple Awards
• Artist - "The Hindu – Young world" Newspaper Contest finalist
• Owning 150 certificates approximately and prizes for winning curricular and extra-curricular 
competitions
AWARDS FOR SERVICE AND LEADERSHIP EXPERIENCES
• Awards received at workplace and its purpose:
o Bravo award (₹500)- Appreciating flexibility in taking-up the new topics and supporting the 
projects[2023]
o Customer team appreciation (₹1000)- Thanks for your contribution towards THS project. 
Your support in CIL development area in meeting the T11A milestone is highly 
appreciated[2023]
o Kudos award (₹750)- Thanks for driving the social connect initiatives within ESS-PS[2022]
o Bravo award (₹500)- Efforts towards the Toyota Hybrid System projects and supporting the 
team building[2022]
o Bravo award (₹500)- Efforts towards improving associate connect and team building resulted in 
a more inclusive workplace[2022]
o "The collaborator" recognition- For redefining teamwork with dedication and hard work[2021]
o "We truly Appreciate" recognition- Thank you for finding out issue in safety integration on 
Nissan and Renault SW, which was a sleeping bug[2021]
o Spot award (₹500)- Renault customer Satisfaction and delivery landmark[2020]
o Customer team appreciation – Thank You for back-to-back on-time customer software 
deliveries in Renault projects[2020]
• Invited to" Dine and Dialog with Datta" event with Bosch India CEO Mr.Dattatri in a group of 16 
chosen employees for face to face discussion on Company topics[2023]
• Regional leader for technical and non-technical event organization in Robert Bosch, Coimbatore [2019-
present]. I have organized multiple events both technical and non-technical and have been awarded for 
the same.
• Mentor of 16 colleagues on various project activities in Robert Bosch, Coimbatore [2019-present]
• Student Head for Dept of EEE – Lead my department in an Inter-departmental Competition and Won the 
Overall Trophy[2018]
• Class Representative – all 4 years of UG and took responsibilities in and out of class hours [2015-2019]
• Ecology Club president, Montfort School, Tiruchirappalli - Lead Eco-preservation rallies and awareness 
drives [2011-2012]
PUBLICATIONS
• "Exploration of technology driven Income sources for an Agricultural community in West Bengal, 
India."
o Published 
o IOT with smart systems, Smart Innovation, Systems and Technologies, vol251, Springer,
Singapore – 2022
• "Cetrimide Templated Fine Nano β-TCP/Hap Biphasic Rods: Synthesis and Characterization."
o Presented as Poster. Publication under process
o International Conference on Advanced Functional Materials and Devices (AFMD-2024)`;

// ============================================================================
// STRUCTURED DATA OBJECTS
// ============================================================================

// Resume Data
const resumeData = {
  contact: {
    name: "Anne Rose Sankar Raj",
    phone: "+1 (929) 793-2559",
    email: "annerosesankarraj@gmail.com",
    linkedin: "linkedin.com/in/anne-rose-sankar-raj",
    location: "New York, NY"
  },
  summary: `Electrical Engineer with 5+ years in automotive ECU software integration and SIL/HIL validation, building R&D tools to improve software quality/efficiency and serving on Bosch's Engineering Elite task force supporting escalations under tight deadlines for Toyota, Jaguar Land Rover, Renault, Nissan, Isuzu and Mahindra. I then brought that production-grade integration and validation mindset into robotics and autonomy during my Columbia M.S., spanning sensor hardware integration and software architectures.`,
  education: [
    {
      institution: "Columbia University",
      degree: "Master of Science in Electrical Engineering",
      location: "New York, NY",
      date: "Dec 2025"
    }
  ],
  skills: {
    "Robotics Software": ["ROS 2", "MAVROS", "Gazebo simulation", "real-time control systems", "autonomous navigation", "ArduPilot sensor integration"],
    "Embedded Systems": ["UART/SPI/I2C serial protocols", "real-time telemetry logging", "firmware development (ESP32, STM32)", "Pixhawk/ArduPilot"],
    "Programming & Systems": ["C++", "Python", "C", "CAPL", "Linux", "Docker", "Azure DevOps", "Git/GitHub", "MATLAB/Simulink"],
    "Validation & Testing": ["HIL/SIL testing", "CANalyzer", "ETAS toolchain", "LibFuzzer fuzz testing", "regression testing", "data logging analysis"],
    "AI/ML Frameworks": ["TensorFlow", "PyTorch", "CUDA", "reinforcement learning"]
  },
  experience: [
    {
      title: "UAV Autonomy and Systems Integration Engineer",
      company: "Nonlinear Controls Lab (Founding Member)",
      location: "Columbia University, NY",
      period: "Jan 2025 - Dec 2025",
      category: "Robotics/Autonomy",
      bullets: [
        "Led application specific requirements analysis for a GPS denied autonomous quadrotor, with rigorous comparisons of 7 platform options and documenting payload and sensor tradeoffs. Produced a complete bill of materials with about 50+ line items, reducing build ambiguity and preventing late-stage integration rework by 20%.",
        "Designed the drone electrical system architecture for electrical safety, external sensor integration and battery power distribution. Built and soldered the wiring harness and power layout supporting 9 sensors and peripherals, cutting bench bring up failures and power related resets by 78% during early testing.",
        "Integrated Raspberry Pi 5 as the companion computer for autonomy workflows. Set up ROS 2 with MAVROS and MAVLink, configured radio telemetry and brought up OAK D Lite RGB and depth visualization in RViz2, improving developer debug throughput by enabling real time perception and telemetry inspection.",
        "Implemented multi sensor navigation inputs for state estimation and obstacle avoidance. Integrated ultrasonic sensors for obstacle avoidance in ArduPilot and ROS and integrated MatekSys optical flow 3901-L0X, barometer and TF Luna ToF LiDAR for altitude aiding, improving EKF3 stability to 43% fewer estimator dropouts across indoor and low light trials.",
        "Executed structured field experiments across 8 lighting conditions and collected about 750+ hours of logged flight data for sensor output analysis, accelerating tuning cycles and enabling repeatable validation evidence for stable EKF3 performance."
      ]
    },
    {
      title: "Senior Software Engineer - Embedded Systems Integration & Validation",
      company: "Robert Bosch",
      location: "Coimbatore, India",
      period: "Feb 2019 - Jul 2024",
      category: "Automotive ECU",
      bullets: [
        "Delivered 100+ ECU software baselines on MDG1 multicore and Mx17 single core platforms across diesel, gasoline and hybrid EV projects, owning V cycle integration plus system validation and customer ready build packaging.",
        "Led production release discipline with 200+ regression and safety checks per release, including freeze and green release readiness, reprogramming, OTA flashing validation, DID testing and EEPROM driving cycle verification for Renault, Volkswagen, Jaguar Land Rover, Toyota, Nissan and others, earning multiple Bravo awards, customer appreciation notes and the \"We Truly Appreciate\" award for catching a safety critical sleeping bug before escalation plus selection for a CEO dine and dialog cohort of 16 employees.",
        "Owned encrypted communication validation using CAPL and CANalyzer, replicated CAN master slave ECU behavior for HIL and bench testing, increased bus level fault coverage by 35% and reduced integration debug time by 50%, while serving as Lab HIL owner for ETAS LabCar with uptime above 98% and delivering sign off evidence packs, recognized with collaborator, Kudos and Bravo awards.",
        "Built Python based robustness tooling using LibFuzzer style fuzz workflows and automated pipelines in Linux and Docker, integrated with Azure DevOps CI, reducing escaped edge case failures by 30% and improving test throughput by 2x, gaining direct visibility in an innovation program and repeated responsibility as quality reviewer.",
        "Drove innovation wins from 2019 to ongoing: Top 10 finalist out of 200+ ideas for TutorBot Automation Hackathon, winner of 2021 Datathon building a CAN safety chatbot, Top 15 finalist out of 600 + registrations at BoCSE Asia Pacific 2022 exploring NXP S32G2 and LLCE behavior, runner up at FIT FEST 2023 and secured Bosch Centre of Excellence funded incubation for SWAFIA 2023 ongoing with a working proof of concept achieving 96% analysis accuracy and CoE collaboration."
      ]
    }
  ],
  projects: [
    {
      name: "Smart Glove",
      description: "Built an ESP32 wearable that captures ASL gestures using flex sensors and an MPU6050 6 axis IMU, streams data to a Raspberry Pi over an internet socket and runs an ML inference pipeline to output real time text plus speech for inclusive communication.",
      year: "2024",
      tags: ["ESP32", "ML", "Raspberry Pi", "Wearable", "Accessibility"]
    },
    {
      name: "Parrot Mambo BLE Autonomy Stack",
      description: "Implemented an SE3 geometric tracking controller in Simulink with a 200 Hz control loop and a 5 Hz notch filter, achieving 15% lower RMSE and 57% faster settling on circular tracking plus 5.6x lower RMSE on high pitch maneuvers versus PID.",
      year: "2024",
      tags: ["Simulink", "Control Systems", "Robotics", "Autonomy"]
    },
    {
      name: "Swarm Robotics for Assistive Navigation",
      description: "Built 2 ESP32 ground robots running HC SR04 obstacle avoidance at 20 Hz plus a Raspberry Pi 4B node running a quantized YOLO model in ONNX Runtime at 10 to 12 FPS with 90% mAP, validated in a 10 m by 3 m indoor setup with n equals 20 static and n equals 20 dynamic trials and up to 96% avoidance success.",
      year: "2025",
      tags: ["ESP32", "YOLO", "Robotics", "ONNX", "Swarm"]
    }
  ]
};

// CV Data
const cvData = {
  contact: {
    name: "Anne Rose Sankar Raj",
    address: "Shanthi Nilayam, No:11, 11th cross street, Balaji Nagar, Kattur, Tiruchirappalli, Tamil Nadu, India -620019",
    email: "annerose710@gmail.com",
    phone: "+91 8300161938",
    linkedin: "www.linkedin.com/in/anne-rose-sankar-raj"
  },
  personalProfile: `Self-taught and highly motivated individual looking forward to pursuing Master of Science degree in Electrical Engineering with specialization in Integrated Circuits and Systems. Software Product Developer with 5 years of experience in the automotive domain. Tech enthusiast fascinated by new technologies and innovations. Quick learner and always ready to learn something new. Passionate and dedicated towards work. Organized and meticulous with all my endeavors. Experienced in academic research and entrepreneurial product research.`,
  education: [
    {
      institution: "Amrita Vishwa Vidyapeetham, Amrita University Coimbatore",
      degree: "Bachelor of Technology: Electrical and Electronics Engineering",
      period: "June 2015- April 2019",
      details: "CGPA 8.05/10 [First class with Distinction]"
    },
    {
      institution: "Senior-Secondary Education",
      degree: "CBSE",
      period: "May 2015",
      details: "mark % :85.4% Kanchipuram"
    },
    {
      institution: "Secondary Education",
      degree: "CBSE",
      period: "May 2013",
      details: "CGPA:10/10 Tiruchirappalli"
    }
  ],
  employment: {
    company: "Robert Bosch Engineering and Business Solutions",
    location: "Coimbatore, Tamil Nadu, India",
    period: "2019-present",
    roles: [
      {
        title: "Senior Software Engineer: Innovation projects",
        period: "June 2023 - Present",
        details: [
          "Software Developer: Innovation Projects – R&D Germany",
          "SW Fuzzing tool development with LibFuzzer, Automation with Python in Visual Studio code, Development in Linux Environment with Docker, End-to-End development in Azure DevOps, Analysis in ISOLAR-A tool for AUTOSAR Software Components, Repository in GitHub"
        ]
      },
      {
        title: "Senior Software Engineer: Engine ECU [Electronic Control Unit] Software development",
        period: "July 2022 - May 2023",
        details: ["Promoted to next level."]
      },
      {
        title: "Associate Software Engineer: Engine ECU Software development",
        period: "July 2019- June 2022",
        details: [
          "Software Integration and System validation for development and series ECUs (MDG1: multicore and Mx17: single core)/VCU/DCU, for Diesel, Gasoline and Hybrid EV projects in different SWSH[Software Sharing] models",
          "SWSH CIL [Customer Interface Layer] adapter development (AUTOSAR/other architectures), Ehooks for enabling validation of when software and hardware are combined",
          "Software Freeze activities and Delivery Testing (Function Testing, Resource Measurement, Reprogramming, Input/Output Car System testing, Flashing Over The Air testing, DID testing) and series testing (Car Function Testing, EEPROM driving cycle testing, Regression Testing, Viva testing)",
          "OEMs: Renault, Nissan, Volkswagen, Jaguar and Land Rover, Isuzu and Toyota"
        ]
      },
      {
        title: "Internship Trainee – Engine ECU Communication Software Validation",
        period: "Feb 2019 – May 2019",
        details: [
          "Developed the entire cyber security testing module for validating encrypted communication using CAPL [Communication Access Programming Language]",
          "Replicated Master and Slave ECU - CAN communication for HIL testing with CANalyzer",
          "Lab HIL [Hardware In Loop] responsible for team. OEM: Mahindra"
        ]
      }
    ]
  },
  skills: [
    "Software Sharing models (SWSH)",
    "SWSH Adapter CIL Layer Development",
    "AUTOSAR",
    "Automation with Python",
    "Chatbot development using Natural Language Processing",
    "AI/ML Model development",
    "Quality and Automotive process expert",
    "Labcar Setup for HIL and SIL testing",
    "Testing with UDE, INCA, CANalyzer, GLIWA, TPT, ETAS tools, ECUTest and TensorFlow",
    "Software warning analysis (including MISRA, Procman, Compiler) and fixing"
  ],
  programmingLanguages: ["Python", "C", "C++", "CAPL", "Perl"],
  innovations: [
    {
      title: "Research on Exploring Applications in Regenerative Medicine",
      year: "2024 ongoing",
      description: "Aided by performing conductivity studies for Dr. Michael Shanthi, Woman Scientist, DST, for her funded work on \"Cetrimide Templated Fine Nano β-TCP/Hap Biphasic Rods: Synthesis and Characterization\". Poster presentation done and publication in process."
    },
    {
      title: "SWAFIA- Funded Entrepreneurial Research",
      year: "2023 - ongoing",
      description: "My entrepreneurial idea pitch-in \"SWAFIA – Software WArning Fixer And Analyzer\" won funded research from the Centre of Excellence in Bosch, India. I was offered collaboration with their team. The idea is currently under incubation and the preliminary Proof of concept is successfully exhibited with tool analysis accuracy of 96%"
    },
    {
      title: "Pick and Sell – FIT.FEST",
      year: "2023",
      description: "Runner-up of On-spot technical presentation contest - add innovations to an existing product and successfully sell it to the judges, in Bosch India's biggest technical fest"
    },
    {
      title: "BoCSE – Asia and Pacific Chapter",
      year: "2022",
      description: "\"Bosch Conference on Systems and Software Engineering\", In the hackathon event, my team was in the top 15 finalists from 600+ registrations of teams across Asia Pacific chapter (India, Vietnam, Mexico etc..) in Bosch in the track \"Finding flaws in SoC NXP S32G2\". We explored the new System on Chip and its components and checked properties of Linear Latency CAN Engine"
    },
    {
      title: "Datathon",
      year: "2021",
      description: "Winner, During Covid-19 lockdown in 2021, I had participated in a section level virtual Datathon where I won the contest along with my team for automation coding creating \"CAN safety chatbot\""
    },
    {
      title: "Automation Hackathon",
      year: "2019",
      description: "In my very first year of joining the professional world, as a fresher my idea of \"TutorBot – one stop shop learning companion\" made it to the top 10 finalists amongst 200+ ideas in the Automation Hackathon conducted in Bosch, India."
    },
    {
      title: "Live-in-Labs Community Service with Research",
      year: "2017",
      description: "A group of 5 inter-disciplinary students (including me) resided in Kalinagar, a remote village in West Bengal, India for 6 days. We researched various ways to improve livelihood by suggesting technical methods to be implemented to generate income for the villagers. Published a paper on the work where the first authoring is shared between all equally."
    }
  ],
  honors: [
    { text: "Paid Internship at Robert Bosch and Engineering solutions for 4 months in final semester of UG (₹15000/month)", year: 2019 },
    { text: "Distinction in B.Tech for securing Internship", year: 2019 },
    { text: "Scholarship of ₹6000 for High rank in A certificate exam – National Cadet Corps Army wing from Government of India", year: 2012 },
    { text: "INSPIRE award with ₹5000 seed money from Department of Science and Technology [DST] New Delhi, India", year: 2010 },
    { text: "Special Highest rank and award in Olympiad Exam from Tamil Nadu Science Forum, India", year: 2010 },
    { text: "General Proficiency award recipient each year for all years of schooling", year: 2001 }
  ],
  volunteering: [
    { activity: "Volunteering for tutoring for underprivileged kids in Govt school of Keeranatham village, Old age homes restoration, Waterbodies cleaning, Women sensitization initiatives etc., as part of Corporate Social Responsibility, Robert Bosch, Coimbatore", period: "2019-present" },
    { activity: "Live in Labs - Income Generation initiative for Kalinagar village, West Bengal, India", period: "2017" },
    { activity: "Amrita SeRVe – Livelihood upliftment for Saadivayal – a tribal village in Coimbatore, Tamil Nadu, India", period: "2015-2019" },
    { activity: "AmalaBharatham – Government school cleaning and restoration drive in Saadivayal – a tribal village in Coimbatore, Tamil Nadu, India", period: "2016" },
    { activity: "National Service in Army through National Cadet Corps [Junior wing]", period: "2011-2012" },
    { activity: "Volunteered at the Ecology Club and served as President, Montfort School, Tiruchirappalli", period: "2011-2012" },
    { activity: "Donated at Hair Donation Drive for Cancer Foundation", period: "2017" },
    { activity: "Active Blood Donation Member", period: "2016-present" }
  ],
  languages: ["Tamil (Native)", "English (Educational and Professional)"],
  extracurricular: [
    "Professional Bharatanatyam Dancer [India Classical Dance form] for past 21 years",
    "State Level Award Winning Dancer – Indian traditional Folk Style",
    "Leader for Jhalak – Indian Freestyle dance team in college",
    "Orator [English and Tamil languages] – Won Multiple Awards",
    "Poetry writing – Won Multiple Awards",
    "Artist - \"The Hindu – Young world\" Newspaper Contest finalist",
    "Owning 150 certificates approximately and prizes for winning curricular and extra-curricular competitions"
  ],
  awards: [
    { award: "Bravo award (₹500)", reason: "Appreciating flexibility in taking-up the new topics and supporting the projects", year: 2023, type: "workplace" },
    { award: "Customer team appreciation (₹1000)", reason: "Thanks for your contribution towards THS project. Your support in CIL development area in meeting the T11A milestone is highly appreciated", year: 2023, type: "workplace" },
    { award: "Kudos award (₹750)", reason: "Thanks for driving the social connect initiatives within ESS-PS", year: 2022, type: "workplace" },
    { award: "Bravo award (₹500)", reason: "Efforts towards the Toyota Hybrid System projects and supporting the team building", year: 2022, type: "workplace" },
    { award: "Bravo award (₹500)", reason: "Efforts towards improving associate connect and team building resulted in a more inclusive workplace", year: 2022, type: "workplace" },
    { award: "\"The collaborator\" recognition", reason: "For redefining teamwork with dedication and hard work", year: 2021, type: "workplace" },
    { award: "\"We truly Appreciate\" recognition", reason: "Thank you for finding out issue in safety integration on Nissan and Renault SW, which was a sleeping bug", year: 2021, type: "workplace" },
    { award: "Spot award (₹500)", reason: "Renault customer Satisfaction and delivery landmark", year: 2020, type: "workplace" },
    { award: "Customer team appreciation", reason: "Thank You for back-to-back on-time customer software deliveries in Renault projects", year: 2020, type: "workplace" },
    { award: "Invited to \"Dine and Dialog with Datta\" event with Bosch India CEO Mr.Dattatri in a group of 16 chosen employees for face to face discussion on Company topics", year: 2023, type: "leadership" },
    { award: "Regional leader for technical and non-technical event organization in Robert Bosch, Coimbatore", year: 2019, type: "leadership" },
    { award: "Mentor of 16 colleagues on various project activities in Robert Bosch, Coimbatore", year: 2019, type: "leadership" },
    { award: "Student Head for Dept of EEE – Lead my department in an Inter-departmental Competition and Won the Overall Trophy", year: 2018, type: "academic" },
    { award: "Class Representative – all 4 years of UG and took responsibilities in and out of class hours", year: 2015, type: "academic" },
    { award: "Ecology Club president, Montfort School, Tiruchirappalli - Lead Eco-preservation rallies and awareness drives", year: 2011, type: "academic" }
  ],
  publications: [
    {
      title: "\"Exploration of technology driven Income sources for an Agricultural community in West Bengal, India.\"",
      status: "Published",
      venue: "IOT with smart systems, Smart Innovation, Systems and Technologies, vol251, Springer, Singapore – 2022"
    },
    {
      title: "\"Cetrimide Templated Fine Nano β-TCP/Hap Biphasic Rods: Synthesis and Characterization.\"",
      status: "Presented as Poster. Publication under process",
      venue: "International Conference on Advanced Functional Materials and Devices (AFMD-2024)"
    }
  ]
};

// Computed stats
const quickStats = {
  yearsExp: 5,
  companies: 2,
  oems: 7,
  awards: 14,
  projects: 3,
  publications: 2
};

// ============================================================================
// SVG ICONS
// ============================================================================
const Icons = {
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  ),
  chevronDown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  chevronRight: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  ),
  copy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
    </svg>
  ),
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  lightbulb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>
    </svg>
  ),
  graduationCap: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  keyboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="M6 8h.001"/><path d="M10 8h.001"/><path d="M14 8h.001"/><path d="M18 8h.001"/><path d="M8 12h.001"/><path d="M12 12h.001"/><path d="M16 12h.001"/><path d="M7 16h10"/>
    </svg>
  ),
  fileText: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  image: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  zoomIn: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  ),
  zoomOut: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
    </svg>
  )
};

// ============================================================================
// SECTION CONFIG
// ============================================================================
const sections = [
  { id: 'hero', label: 'About', icon: Icons.star },
  { id: 'stats', label: 'Stats', icon: Icons.code },
  { id: 'experience', label: 'Experience', icon: Icons.briefcase },
  { id: 'skills', label: 'Skills', icon: Icons.code },
  { id: 'projects', label: 'Projects', icon: Icons.folder },
  { id: 'gallery', label: 'Gallery', icon: Icons.image },
  { id: 'innovations', label: 'Innovations', icon: Icons.lightbulb },
  { id: 'honors', label: 'Honors', icon: Icons.award },
  { id: 'volunteering', label: 'Volunteering', icon: Icons.heart },
  { id: 'extracurricular', label: 'Extra-curricular', icon: Icons.users },
  { id: 'awards', label: 'Awards', icon: Icons.award },
  { id: 'publications', label: 'Publications', icon: Icons.book },
  { id: 'contact', label: 'Contact', icon: Icons.email },
  { id: 'raw', label: 'Raw Docs', icon: Icons.fileText }
];

const experienceFilters = [
  { id: 'all', label: 'All' },
  { id: 'Automotive ECU', label: 'Automotive ECU' },
  { id: 'Robotics/Autonomy', label: 'Robotics/Autonomy' },
  { id: 'Testing/HIL/SIL', label: 'Testing/HIL/SIL' },
  { id: 'Tools/Automation', label: 'Tools/Automation' },
  { id: 'AI/ML', label: 'AI/ML' }
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Portfolio() {
  // State
  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'recruiter' | 'full'>('recruiter');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [expandedExperiences, setExpandedExperiences] = useState<Set<number>>(new Set([0]));
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [contactSource, setContactSource] = useState<'resume' | 'cv'>('resume');
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedBullet, setCopiedBullet] = useState<number | null>(null);
  const [expandedRawDocs, setExpandedRawDocs] = useState<Set<string>>(new Set());
  const [awardYearFilter, setAwardYearFilter] = useState<string>('all');
  const [awardTypeFilter, setAwardTypeFilter] = useState<string>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // Effects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // '?' key for keyboard help
      if (e.key === '?' && !searchOpen) {
        e.preventDefault();
        setShowKeyboardHelp(prev => !prev);
      }
      // '/' key for search
      if (e.key === '/' && !searchOpen) {
        e.preventDefault();
        setSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      // Escape to close modals
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setShowKeyboardHelp(false);
        setMobileMenuOpen(false);
        setSelectedSkill(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Compute search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const query = searchQuery.toLowerCase();
    const results: { section: string; matches: { text: string; context: string }[] }[] = [];

    // Search in skills
    const skillMatches: { text: string; context: string }[] = [];
    Object.entries(resumeData.skills).forEach(([category, skills]) => {
      if (category.toLowerCase().includes(query)) {
        skillMatches.push({ text: category, context: 'Skill Category' });
      }
      skills.forEach(skill => {
        if (skill.toLowerCase().includes(query)) {
          skillMatches.push({ text: skill, context: `${category}` });
        }
      });
    });
    cvData.skills.forEach(skill => {
      if (skill.toLowerCase().includes(query)) {
        skillMatches.push({ text: skill, context: 'CV Skills' });
      }
    });
    if (skillMatches.length > 0) {
      results.push({ section: 'Skills', matches: skillMatches });
    }

    // Search in experience
    const expMatches: { text: string; context: string }[] = [];
    resumeData.experience.forEach(exp => {
      if (exp.company.toLowerCase().includes(query) || exp.title.toLowerCase().includes(query)) {
        expMatches.push({ text: `${exp.title} at ${exp.company}`, context: exp.period });
      }
      exp.bullets.forEach(bullet => {
        if (bullet.toLowerCase().includes(query)) {
          expMatches.push({ text: bullet.substring(0, 100) + '...', context: exp.company });
        }
      });
    });
    cvData.employment.roles.forEach(role => {
      if (role.title.toLowerCase().includes(query)) {
        expMatches.push({ text: role.title, context: 'CV: ' + role.period });
      }
      role.details.forEach(detail => {
        if (detail.toLowerCase().includes(query)) {
          expMatches.push({ text: detail.substring(0, 100) + '...', context: 'CV: ' + role.title });
        }
      });
    });
    if (expMatches.length > 0) {
      results.push({ section: 'Experience', matches: expMatches });
    }

    // Search in projects
    const projMatches: { text: string; context: string }[] = [];
    resumeData.projects.forEach(proj => {
      if (proj.name.toLowerCase().includes(query) || proj.description.toLowerCase().includes(query)) {
        projMatches.push({ text: proj.name, context: proj.year });
      }
    });
    if (projMatches.length > 0) {
      results.push({ section: 'Projects', matches: projMatches });
    }

    // Search in innovations
    const innovMatches: { text: string; context: string }[] = [];
    cvData.innovations.forEach(innov => {
      if (innov.title.toLowerCase().includes(query) || innov.description.toLowerCase().includes(query)) {
        innovMatches.push({ text: innov.title, context: innov.year });
      }
    });
    if (innovMatches.length > 0) {
      results.push({ section: 'Innovations', matches: innovMatches });
    }

    // Search in awards
    const awardMatches: { text: string; context: string }[] = [];
    cvData.awards.forEach(award => {
      if (award.award.toLowerCase().includes(query) || award.reason.toLowerCase().includes(query)) {
        awardMatches.push({ text: award.award, context: `${award.year}` });
      }
    });
    if (awardMatches.length > 0) {
      results.push({ section: 'Awards', matches: awardMatches });
    }

    return results;
  }, [searchQuery]);

  // Highlight text function
  const highlightText = useCallback((text: string, query: string) => {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: 'var(--highlight-bg, #fef08a)', color: 'var(--highlight-text, #854d0e)', padding: '0 2px', borderRadius: '2px' }}>{part}</mark>
      ) : (
        part
      )
    );
  }, []);

  // Copy bullet function
  const copyBullet = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text);
    setCopiedBullet(index);
    setTimeout(() => setCopiedBullet(null), 2000);
  };

  // Filter experiences
  const filteredExperiences = useMemo(() => {
    if (experienceFilter === 'all') return resumeData.experience;
    return resumeData.experience.filter(exp => {
      if (experienceFilter === 'Automotive ECU' && exp.category === 'Automotive ECU') return true;
      if (experienceFilter === 'Robotics/Autonomy' && exp.category === 'Robotics/Autonomy') return true;
      if (experienceFilter === 'Testing/HIL/SIL') {
        return exp.bullets.some(b => 
          b.toLowerCase().includes('hil') || 
          b.toLowerCase().includes('sil') || 
          b.toLowerCase().includes('testing') ||
          b.toLowerCase().includes('validation')
        );
      }
      if (experienceFilter === 'Tools/Automation') {
        return exp.bullets.some(b => 
          b.toLowerCase().includes('python') || 
          b.toLowerCase().includes('tool') || 
          b.toLowerCase().includes('automation')
        );
      }
      if (experienceFilter === 'AI/ML') {
        return exp.bullets.some(b => 
          b.toLowerCase().includes('ml') || 
          b.toLowerCase().includes('ai') || 
          b.toLowerCase().includes('tensorflow') ||
          b.toLowerCase().includes('machine learning')
        );
      }
      return false;
    });
  }, [experienceFilter]);

  // Skill occurrences
  const getSkillOccurrences = (skill: string) => {
    const occurrences: { source: string; context: string }[] = [];
    
    // Search in experience bullets
    resumeData.experience.forEach(exp => {
      exp.bullets.forEach(bullet => {
        if (bullet.toLowerCase().includes(skill.toLowerCase())) {
          occurrences.push({ source: 'Experience', context: `${exp.title} at ${exp.company}` });
        }
      });
    });

    // Search in projects
    resumeData.projects.forEach(proj => {
      if (proj.description.toLowerCase().includes(skill.toLowerCase())) {
        occurrences.push({ source: 'Project', context: proj.name });
      }
      if (proj.tags.some(t => t.toLowerCase().includes(skill.toLowerCase()))) {
        occurrences.push({ source: 'Project Tag', context: proj.name });
      }
    });

    // Search in innovations
    cvData.innovations.forEach(innov => {
      if (innov.description.toLowerCase().includes(skill.toLowerCase())) {
        occurrences.push({ source: 'Innovation', context: innov.title });
      }
    });

    return occurrences;
  };

  // Filter awards
  const filteredAwards = useMemo(() => {
    return cvData.awards.filter(award => {
      const yearMatch = awardYearFilter === 'all' || award.year.toString() === awardYearFilter;
      const typeMatch = awardTypeFilter === 'all' || award.type === awardTypeFilter;
      return yearMatch && typeMatch;
    });
  }, [awardYearFilter, awardTypeFilter]);

  // Get unique award years
  const awardYears = useMemo(() => {
    const years = new Set(cvData.awards.map(a => a.year.toString()));
    return ['all', ...Array.from(years).sort((a, b) => parseInt(b) - parseInt(a))];
  }, []);

  // Styles object - Minimalistic Design
  const styles: Record<string, React.CSSProperties> = {
    container: {
      '--bg': darkMode ? '#0a0a0a' : '#fafafa',
      '--fg': darkMode ? '#fafafa' : '#0a0a0a',
      '--muted': darkMode ? '#737373' : '#737373',
      '--accent': darkMode ? '#fafafa' : '#0a0a0a',
      '--accent-light': darkMode ? '#262626' : '#f5f5f5',
      '--card': darkMode ? '#141414' : '#ffffff',
      '--card-hover': darkMode ? '#1f1f1f' : '#fafafa',
      '--border': darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
      '--highlight-bg': darkMode ? '#262626' : '#f5f5f5',
      '--highlight-text': darkMode ? '#fafafa' : '#0a0a0a',
      '--success': '#22c55e',
      backgroundColor: 'var(--bg)',
      color: 'var(--fg)',
      minHeight: '100vh',
      transition: 'background-color 0.4s ease, color 0.4s ease',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    } as React.CSSProperties,
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: darkMode ? 'rgba(10,10,10,0.8)' : 'rgba(250,250,250,0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      transition: 'all 0.3s ease',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1rem 1.5rem',
      flexWrap: 'wrap',
      gap: '0.75rem',
    },
    navLinks: {
      display: 'flex',
      gap: '0.25rem',
      flexWrap: 'wrap',
    } as React.CSSProperties,
    navLink: {
      padding: '0.5rem 0.875rem',
      borderRadius: '9999px',
      fontSize: '0.8125rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: 'none',
      backgroundColor: 'transparent',
      color: 'var(--muted)',
      letterSpacing: '-0.01em',
    },
    navLinkActive: {
      backgroundColor: 'var(--accent)',
      color: darkMode ? '#0a0a0a' : '#fafafa',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '3rem 1.5rem',
    },
    section: {
      marginBottom: '5rem',
      scrollMarginTop: '100px',
    },
    sectionTitle: {
      fontSize: '0.75rem',
      fontWeight: 600,
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: 'var(--muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    card: {
      backgroundColor: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '1rem',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
    },
    cardHover: {
      boxShadow: darkMode ? '0 0 0 1px rgba(255,255,255,0.1)' : '0 0 0 1px rgba(0,0,0,0.05)',
      transform: 'translateY(-2px)',
    },
    button: {
      padding: '0.625rem 1.25rem',
      borderRadius: '9999px',
      fontSize: '0.8125rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid var(--border)',
      backgroundColor: 'transparent',
      color: 'var(--fg)',
      letterSpacing: '-0.01em',
    },
    buttonPrimary: {
      backgroundColor: 'var(--accent)',
      color: darkMode ? '#0a0a0a' : '#fafafa',
      border: 'none',
    },
    input: {
      padding: '0.625rem 1rem',
      borderRadius: '0.75rem',
      border: '1px solid var(--border)',
      backgroundColor: 'var(--card)',
      color: 'var(--fg)',
      fontSize: '0.875rem',
      width: '100%',
      transition: 'all 0.2s ease',
    },
    tag: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.25rem 0.625rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: 500,
      backgroundColor: 'var(--accent-light)',
      color: 'var(--accent)',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      border: '1px solid transparent',
    },
    bullet: {
      paddingLeft: '1.25rem',
      position: 'relative',
      marginBottom: '0.75rem',
      lineHeight: 1.6,
    },
  };

  // Reduced motion check
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const transitionStyle = prefersReducedMotion ? 'none' : 'all 0.3s ease';

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header} role="banner">
        <nav style={styles.nav} aria-label="Main navigation">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              style={{ ...styles.button, padding: '0.5rem', display: 'none' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:flex"
            >
              {Icons.menu}
            </button>
            <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--accent)' }}>
              ASR
            </span>
          </div>

          <div style={{ ...styles.navLinks, display: mobileMenuOpen ? 'flex' : 'none', flexDirection: 'column', width: '100%', '@media (min-width: 768px)': { display: 'flex', flexDirection: 'row', width: 'auto' } } as React.CSSProperties}
               className="nav-links">
            {sections.slice(0, 8).map(({ id, label }) => (
              <button
                key={id}
                style={{
                  ...styles.navLink,
                  ...(activeSection === id ? styles.navLinkActive : {}),
                }}
                onClick={() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                  setMobileMenuOpen(false);
                }}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                {label}
              </button>
            ))}
          </div>

          <div style={styles.controls}>
            <button
              style={{ ...styles.button, padding: '0.5rem' }}
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
            >
              {Icons.search}
            </button>
            <button
              style={{ ...styles.button, padding: '0.5rem' }}
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? Icons.sun : Icons.moon}
            </button>
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as 'recruiter' | 'full')}
              style={{ ...styles.input, width: 'auto', padding: '0.375rem 0.75rem' }}
              aria-label="View mode"
            >
              <option value="recruiter">Recruiter View</option>
              <option value="full">Full CV View</option>
            </select>
          </div>
        </nav>
      </header>

      {/* Search Modal */}
      {searchOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '10vh 1rem',
            zIndex: 100,
          }}
          onClick={() => setSearchOpen(false)}
        >
          <div
            style={{
              ...styles.card,
              width: '100%',
              maxWidth: '600px',
              maxHeight: '70vh',
              overflow: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              {Icons.search}
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search skills, companies, projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ ...styles.input, border: 'none', outline: 'none' }}
                aria-label="Search"
              />
              <button
                style={{ ...styles.button, padding: '0.375rem' }}
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                {Icons.x}
              </button>
            </div>
            {searchResults && (
              <div>
                {searchResults.length === 0 ? (
                  <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem' }}>No results found</p>
                ) : (
                  searchResults.map(({ section, matches }) => (
                    <div key={section} style={{ marginBottom: '1rem' }}>
                      <h4 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--accent)' }}>
                        {section} ({matches.length})
                      </h4>
                      {matches.slice(0, 5).map((match, i) => (
                        <div
                          key={i}
                          style={{
                            padding: '0.5rem',
                            borderRadius: '0.375rem',
                            marginBottom: '0.25rem',
                            backgroundColor: 'var(--accent-light)',
                          }}
                        >
                          <p style={{ fontSize: '0.875rem' }}>{highlightText(match.text, searchQuery)}</p>
                          <p style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{match.context}</p>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            )}
            {!searchQuery && (
              <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '2rem' }}>
                Start typing to search across all sections...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Keyboard Help Modal */}
      {showKeyboardHelp && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 100,
          }}
          onClick={() => setShowKeyboardHelp(false)}
        >
          <div
            style={{ ...styles.card, maxWidth: '400px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {Icons.keyboard} Keyboard Shortcuts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { key: '/', action: 'Open search' },
                { key: '?', action: 'Toggle this help' },
                { key: 'Esc', action: 'Close modals' },
                { key: 'D', action: 'Toggle dark mode' },
              ].map(({ key, action }) => (
                <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{action}</span>
                  <kbd style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    backgroundColor: 'var(--accent-light)',
                    fontFamily: 'monospace',
                    fontSize: '0.875rem',
                  }}>
                    {key}
                  </kbd>
                </div>
              ))}
            </div>
            <button
              style={{ ...styles.button, ...styles.buttonPrimary, width: '100%', marginTop: '1rem' }}
              onClick={() => setShowKeyboardHelp(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && lightboxPhoto !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            zIndex: 200,
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              padding: '0.5rem',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              color: '#fff',
            }}
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Close lightbox"
          >
            {Icons.x}
          </button>
          <div style={{ textAlign: 'center', maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}>
            <div style={{
              width: '80vw',
              height: '60vh',
              position: 'relative',
              borderRadius: '0.5rem',
              overflow: 'hidden',
            }}>
              <img
                src={lightboxPhoto < imageConfig.gallery.length 
                  ? imageConfig.gallery[lightboxPhoto].src 
                  : imageConfig.awards[lightboxPhoto - imageConfig.gallery.length].src}
                alt={lightboxPhoto < imageConfig.gallery.length 
                  ? imageConfig.gallery[lightboxPhoto].alt 
                  : imageConfig.awards[lightboxPhoto - imageConfig.gallery.length].alt}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            <p style={{ color: '#fff', marginTop: '1rem', fontSize: '1rem' }}>
              {lightboxPhoto < imageConfig.gallery.length 
                ? imageConfig.gallery[lightboxPhoto].caption 
                : imageConfig.awards[lightboxPhoto - imageConfig.gallery.length].caption}
            </p>
          </div>
          <div style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '0.5rem',
          }}>
            {[...imageConfig.gallery, ...imageConfig.awards].map((_, idx) => (
              <button
                key={idx}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: idx === lightboxPhoto ? '#fff' : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxPhoto(idx);
                }}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main ref={mainRef} style={styles.main}>
        {/* Hero Section */}
        <section id="hero" style={{ ...styles.section, textAlign: 'center', paddingTop: '2rem', paddingBottom: '3rem', position: 'relative' }}>
          {/* Profile Photo */}
          <div style={{
            width: '120px',
            height: '120px',
            margin: '0 auto 2rem',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid var(--border)',
            position: 'relative',
            zIndex: 2,
          }}>
            <Image
              src={imageConfig.profile.src}
              alt={imageConfig.profile.alt}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          
          {/* 3D Floating Elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
            zIndex: 0,
          }}>
            {/* Holybro X500 Drone */}
            <div style={{
              position: 'absolute',
              top: '8%',
              right: '5%',
              width: '100px',
              height: '100px',
              animation: 'float 6s ease-in-out infinite',
              opacity: 0.12,
            }}>
              <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '100%', height: '100%' }}>
                {/* X-frame body */}
                <line x1="30" y1="30" x2="90" y2="90" strokeWidth="3" />
                <line x1="90" y1="30" x2="30" y2="90" strokeWidth="3" />
                {/* Center plate */}
                <rect x="50" y="50" width="20" height="20" rx="3" strokeWidth="2" />
                {/* Motor arms and rotors */}
                <circle cx="20" cy="20" r="18" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx="20" cy="20" r="5" />
                <circle cx="100" cy="20" r="18" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx="100" cy="20" r="5" />
                <circle cx="20" cy="100" r="18" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx="20" cy="100" r="5" />
                <circle cx="100" cy="100" r="18" strokeWidth="1.5" strokeDasharray="4 2" />
                <circle cx="100" cy="100" r="5" />
                {/* Landing gear */}
                <line x1="35" y1="85" x2="35" y2="105" />
                <line x1="85" y1="85" x2="85" y2="105" />
                <line x1="30" y1="105" x2="40" y2="105" />
                <line x1="80" y1="105" x2="90" y2="105" />
              </svg>
            </div>
            
            {/* Circuit Pattern */}
            <div style={{
              position: 'absolute',
              bottom: '20%',
              left: '3%',
              width: '60px',
              height: '60px',
              animation: 'float 8s ease-in-out infinite reverse',
              opacity: 0.1,
            }}>
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '100%', height: '100%' }}>
                <rect x="10" y="10" width="20" height="20" rx="2" />
                <rect x="70" y="10" width="20" height="20" rx="2" />
                <rect x="10" y="70" width="20" height="20" rx="2" />
                <rect x="70" y="70" width="20" height="20" rx="2" />
                <rect x="40" y="40" width="20" height="20" rx="2" />
                <line x1="30" y1="20" x2="40" y2="40" />
                <line x1="70" y1="20" x2="60" y2="40" />
                <line x1="30" y1="80" x2="40" y2="60" />
                <line x1="70" y1="80" x2="60" y2="60" />
              </svg>
            </div>
            
            {/* Gear */}
            <div style={{
              position: 'absolute',
              top: '40%',
              left: '8%',
              width: '50px',
              height: '50px',
              animation: 'spin 20s linear infinite',
              opacity: 0.08,
            }}>
              <svg viewBox="0 0 100 100" fill="currentColor" style={{ width: '100%', height: '100%' }}>
                <path d="M50 10 L55 25 L70 20 L65 35 L80 40 L65 50 L80 60 L65 65 L70 80 L55 75 L50 90 L45 75 L30 80 L35 65 L20 60 L35 50 L20 40 L35 35 L30 20 L45 25 Z" />
                <circle cx="50" cy="50" r="15" fill="var(--bg)" />
              </svg>
            </div>
            
            {/* Robot Head */}
            <div style={{
              position: 'absolute',
              top: '15%',
              left: '10%',
              width: '70px',
              height: '70px',
              animation: 'float 7s ease-in-out infinite 1s',
              opacity: 0.12,
            }}>
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '100%', height: '100%' }}>
                <rect x="20" y="25" width="60" height="50" rx="10" />
                <circle cx="35" cy="45" r="8" />
                <circle cx="65" cy="45" r="8" />
                <line x1="50" y1="25" x2="50" y2="10" />
                <circle cx="50" cy="10" r="5" />
                <line x1="50" y1="75" x2="50" y2="90" />
                <line x1="35" y1="90" x2="65" y2="90" />
              </svg>
            </div>
            
            {/* DNA Helix / Double Helix */}
            <div style={{
              position: 'absolute',
              bottom: '15%',
              right: '10%',
              width: '40px',
              height: '80px',
              animation: 'float 9s ease-in-out infinite 0.5s',
              opacity: 0.1,
            }}>
              <svg viewBox="0 0 50 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '100%', height: '100%' }}>
                <path d="M10 0 Q25 25 10 50 Q-5 75 10 100" />
                <path d="M40 0 Q25 25 40 50 Q55 75 40 100" />
                <line x1="10" y1="25" x2="40" y2="25" />
                <line x1="10" y1="50" x2="40" y2="50" />
                <line x1="10" y1="75" x2="40" y2="75" />
              </svg>
            </div>
            
            {/* Pixhawk Flight Controller */}
            <div style={{
              position: 'absolute',
              top: '60%',
              right: '8%',
              width: '55px',
              height: '40px',
              animation: 'float 7s ease-in-out infinite 2s',
              opacity: 0.1,
            }}>
              <svg viewBox="0 0 100 70" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ width: '100%', height: '100%' }}>
                <rect x="5" y="10" width="90" height="50" rx="5" />
                {/* Connector pins */}
                <line x1="15" y1="10" x2="15" y2="5" />
                <line x1="25" y1="10" x2="25" y2="5" />
                <line x1="35" y1="10" x2="35" y2="5" />
                <line x1="45" y1="10" x2="45" y2="5" />
                <line x1="55" y1="10" x2="55" y2="5" />
                <line x1="65" y1="10" x2="65" y2="5" />
                <line x1="75" y1="10" x2="75" y2="5" />
                <line x1="85" y1="10" x2="85" y2="5" />
                {/* LEDs */}
                <circle cx="20" cy="35" r="4" />
                <circle cx="35" cy="35" r="4" />
                <circle cx="50" cy="35" r="4" />
                {/* USB port */}
                <rect x="70" y="30" width="15" height="10" rx="2" />
              </svg>
            </div>
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: 600, 
            marginBottom: '0.75rem', 
            color: 'var(--fg)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            position: 'relative',
            zIndex: 1,
          }}>
            {resumeData.contact.name}
          </h1>
          
          <p style={{ 
            fontSize: '1.0625rem', 
            color: 'var(--muted)', 
            marginBottom: '2rem',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            position: 'relative',
            zIndex: 1,
          }}>
            Electrical Engineer · Robotics & Embedded Systems · Automotive ECU Expert
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
            <a
              href={`mailto:${resumeData.contact.email}`}
              style={{ ...styles.button, ...styles.buttonPrimary, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
            >
              {Icons.email} Get in Touch
            </a>
            <a
              href={`https://${resumeData.contact.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.button, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
            >
              {Icons.linkedin} LinkedIn
            </a>
          </div>
          
          <div style={{ ...styles.card, maxWidth: '800px', margin: '0 auto', textAlign: 'left', position: 'relative', zIndex: 1 }}>
            <p style={{ lineHeight: 1.7, color: 'var(--fg)', fontSize: '0.9375rem' }}>
              {resumeData.summary}
            </p>
            {viewMode === 'full' && (
              <p style={{ lineHeight: 1.7, color: 'var(--muted)', marginTop: '1rem', fontSize: '0.875rem' }}>
                {cvData.personalProfile}
              </p>
            )}
          </div>
        </section>

        {/* Quick Stats */}
        <section id="stats" style={styles.section}>
          <h2 style={styles.sectionTitle}>Overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1px', background: 'var(--border)', borderRadius: '1rem', overflow: 'hidden' }}>
            {[
              { label: 'Years Experience', value: `${quickStats.yearsExp}+`, target: 'experience', icon: '⏱' },
              { label: 'Companies', value: quickStats.companies, target: 'experience', icon: '🏢' },
              { label: 'OEMs Worked With', value: quickStats.oems, target: 'projects', icon: '🚗' },
              { label: 'Awards', value: quickStats.awards, target: 'awards', icon: '🏆' },
              { label: 'Projects', value: quickStats.projects, target: 'projects', icon: '📦' },
              { label: 'Publications', value: quickStats.publications, target: 'innovations', icon: '📚' },
            ].map(({ label, value, target, icon }) => (
              <button
                key={label}
                onClick={() => {
                  const element = document.getElementById(target);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                style={{
                  backgroundColor: 'var(--card)',
                  padding: '1.5rem 1rem',
                  textAlign: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--card-hover)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                  const overlay = e.currentTarget.querySelector('.stat-overlay') as HTMLElement;
                  if (overlay) overlay.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--card)';
                  e.currentTarget.style.transform = 'scale(1)';
                  const overlay = e.currentTarget.querySelector('.stat-overlay') as HTMLElement;
                  if (overlay) overlay.style.opacity = '0';
                }}
              >
                <div className="stat-overlay" style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.05) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }} />
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem', opacity: 0.6 }}>{icon}</div>
                <div style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em' }}>{value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" style={styles.section}>
          <h2 style={styles.sectionTitle}>Experience</h2>
          
          {/* Quick Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {experienceFilters.map(({ id, label }) => (
              <button
                key={id}
                style={{
                  ...styles.tag,
                  ...(experienceFilter === id ? { backgroundColor: 'var(--fg)', color: 'var(--bg)' } : {}),
                }}
                onClick={() => setExperienceFilter(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {filteredExperiences.map((exp, index) => (
              <div
                key={index}
                style={styles.card}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.75rem',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    const newExpanded = new Set(expandedExperiences);
                    if (newExpanded.has(index)) {
                      newExpanded.delete(index);
                    } else {
                      newExpanded.add(index);
                    }
                    setExpandedExperiences(newExpanded);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      const newExpanded = new Set(expandedExperiences);
                      if (newExpanded.has(index)) {
                        newExpanded.delete(index);
                      } else {
                        newExpanded.add(index);
                      }
                      setExpandedExperiences(newExpanded);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={expandedExperiences.has(index)}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    {exp.company.toLowerCase().includes('bosch') && (
                      <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '0.5rem',
                        overflow: 'hidden',
                        flexShrink: 0,
                        position: 'relative',
                        background: darkMode ? '#1f1f1f' : '#f5f5f5',
                      }}>
                        <Image
                          src={imageConfig.boschLogo}
                          alt="Bosch Logo"
                          fill
                          style={{ objectFit: 'contain', padding: '4px' }}
                        />
                      </div>
                    )}
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{exp.title}</h3>
                      <p style={{ color: 'var(--fg)', fontWeight: 500, fontSize: '0.875rem' }}>{exp.company}</p>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{exp.location}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>{exp.period}</span>
                    <span style={{ transition: transitionStyle, transform: expandedExperiences.has(index) ? 'rotate(180deg)' : 'rotate(0)', color: 'var(--muted)' }}>
                      {Icons.chevronDown}
                    </span>
                  </div>
                </div>
                
                <div
                  style={{
                    maxHeight: expandedExperiences.has(index) ? '2000px' : '0',
                    overflow: 'hidden',
                    transition: transitionStyle,
                  }}
                >
                  {exp.bullets.map((bullet, i) => (
                    <div key={i} style={{ paddingLeft: '1rem', position: 'relative', marginBottom: '0.75rem' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--muted)', fontSize: '0.75rem' }}>•</span>
                      <span style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--fg)' }}>
                        {searchQuery ? highlightText(bullet, searchQuery) : bullet}
                      </span>
                      <button
                        style={{
                          ...styles.button,
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.75rem',
                          marginLeft: '0.5rem',
                          opacity: 0.6,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          copyBullet(bullet, i);
                        }}
                        aria-label="Copy bullet"
                      >
                        {copiedBullet === i ? Icons.check : Icons.copy}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CV Employment Details (Full view only) */}
          {viewMode === 'full' && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Employment Details: {cvData.employment.company}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cvData.employment.roles.map((role, index) => (
                  <div key={index} style={{ ...styles.card, padding: '1rem' }}>
                    <h4 style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.9375rem' }}>{role.title}</h4>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>{role.period}</p>
                    {role.details.map((detail, i) => (
                      <div key={i} style={{ paddingLeft: '1rem', position: 'relative', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--muted)', fontSize: '0.75rem' }}>•</span>
                        {detail}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Skills Section */}
        <section id="skills" style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          
          {/* Resume Skills */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Resume Skills</h3>
            {Object.entries(resumeData.skills).map(([category, skills]) => (
              <div key={category} style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--muted)', marginBottom: '0.5rem' }}>{category}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skills.map((skill) => (
                    <button
                      key={skill}
                      style={{
                        ...styles.tag,
                        ...(selectedSkill === skill ? { backgroundColor: 'var(--accent)', color: '#fff' } : {}),
                      }}
                      onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CV Skills */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>CV Employment Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {cvData.skills.map((skill) => (
                <button
                  key={skill}
                  style={{
                    ...styles.tag,
                    ...(selectedSkill === skill ? { backgroundColor: 'var(--accent)', color: '#fff' } : {}),
                  }}
                  onClick={() => setSelectedSkill(selectedSkill === skill ? null : skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Programming Languages */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Programming Languages</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {cvData.programmingLanguages.map((lang) => (
                <button
                  key={lang}
                  style={{
                    ...styles.tag,
                    ...(selectedSkill === lang ? { backgroundColor: 'var(--accent)', color: '#fff' } : {}),
                  }}
                  onClick={() => setSelectedSkill(selectedSkill === lang ? null : lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Skill Occurrences Modal */}
          {selectedSkill && (
            <div style={{ ...styles.card, marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ fontWeight: 600 }}>
                  Where &quot;{selectedSkill}&quot; appears:
                </h4>
                <button
                  style={{ ...styles.button, padding: '0.375rem' }}
                  onClick={() => setSelectedSkill(null)}
                  aria-label="Close"
                >
                  {Icons.x}
                </button>
              </div>
              {getSkillOccurrences(selectedSkill).length === 0 ? (
                <p style={{ color: 'var(--muted)' }}>No direct occurrences found in other sections.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {getSkillOccurrences(selectedSkill).map((occ, i) => (
                    <li
                      key={i}
                      style={{
                        padding: '0.75rem',
                        borderBottom: i < getSkillOccurrences(selectedSkill).length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <span style={{ ...styles.tag, fontSize: '0.75rem', marginRight: '0.5rem' }}>{occ.source}</span>
                      <span>{occ.context}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </section>

        {/* Projects Section */}
        <section id="projects" style={styles.section}>
          <h2 style={styles.sectionTitle}>{Icons.folder} Selected Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {resumeData.projects.map((project, index) => {
              const projectImageKey = project.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              const hasImage = imageConfig.projects[projectImageKey as keyof typeof imageConfig.projects];
              return (
                <div
                  key={index}
                  style={{
                    ...styles.card,
                    cursor: 'pointer',
                    padding: 0,
                    overflow: 'hidden',
                  }}
                  onClick={() => {
                    const newExpanded = new Set(expandedProjects);
                    if (newExpanded.has(index)) {
                      newExpanded.delete(index);
                    } else {
                      newExpanded.add(index);
                    }
                    setExpandedProjects(newExpanded);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      const newExpanded = new Set(expandedProjects);
                      if (newExpanded.has(index)) {
                        newExpanded.delete(index);
                      } else {
                        newExpanded.add(index);
                      }
                      setExpandedProjects(newExpanded);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-expanded={expandedProjects.has(index)}
                >
                  {/* Project Image */}
                  <div style={{
                    width: '100%',
                    height: '180px',
                    position: 'relative',
                    background: 'linear-gradient(135deg, var(--accent) 0%, #ec4899 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {hasImage ? (
                      <img
                        src={imageConfig.projects[projectImageKey as keyof typeof imageConfig.projects].src}
                        alt={imageConfig.projects[projectImageKey as keyof typeof imageConfig.projects].alt}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.5)' }}>
                        {Icons.folder}
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontWeight: 600, fontSize: '1.125rem' }}>{project.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={styles.tag}>{project.year}</span>
                        <span style={{ transition: transitionStyle, transform: expandedProjects.has(index) ? 'rotate(90deg)' : 'rotate(0)' }}>
                          {Icons.chevronRight}
                        </span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
                      {project.description.substring(0, 100)}...
                    </p>
                    <div
                      style={{
                        maxHeight: expandedProjects.has(index) ? '500px' : '0',
                        overflow: 'hidden',
                        transition: transitionStyle,
                      }}
                    >
                      <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                        {project.description}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {project.tags.map((tag) => (
                          <span key={tag} style={styles.tag}>{tag}</span>
                        ))}
                      </div>
                      <button
                        style={{ ...styles.button, ...styles.buttonPrimary, marginTop: '1rem' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          copyBullet(project.description, index);
                        }}
                      >
                        {copiedBullet === index ? Icons.check : Icons.copy} Copy Description
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" style={styles.section}>
          <h2 style={styles.sectionTitle}>{Icons.image} Photo Gallery</h2>
          
          {/* Event Photos */}
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--muted)' }}>Events & Presentations</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {imageConfig.gallery.map((photo, index) => (
              <div
                key={`gallery-${index}`}
                style={{
                  ...styles.card,
                  padding: 0,
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setLightboxPhoto(index);
                  setIsLightboxOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxPhoto(index);
                    setIsLightboxOpen(true);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${photo.alt}`}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '0.75rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: '#fff',
                  fontSize: '0.875rem',
                }}>
                  {photo.caption || photo.alt}
                </div>
              </div>
            ))}
          </div>

          {/* Awards Photos */}
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--muted)' }}>Awards & Recognition</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {imageConfig.awards.map((photo, index) => (
              <div
                key={`award-${index}`}
                style={{
                  ...styles.card,
                  padding: 0,
                  overflow: 'hidden',
                  aspectRatio: '4/3',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setLightboxPhoto(imageConfig.gallery.length + index);
                  setIsLightboxOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxPhoto(imageConfig.gallery.length + index);
                    setIsLightboxOpen(true);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${photo.alt}`}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                }}>
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '0.75rem',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  color: '#fff',
                  fontSize: '0.875rem',
                }}>
                  {photo.caption || photo.alt}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Innovations Section */}
        <section id="innovations" style={styles.section}>
          <h2 style={styles.sectionTitle}>Innovations, Research & Events</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {cvData.innovations.map((innov, index) => {
              const innovationImages = [
                { title: 'Research on Exploring Applications in Regenerative Medicine', img: imageConfig.innovations[0] },
                { title: 'SWAFIA- Funded Entrepreneurial Research', img: imageConfig.innovations[1] },
                { title: 'Pick and Sell – FIT.FEST', img: imageConfig.innovations[2] },
                { title: 'BoCSE – Asia and Pacific Chapter', img: imageConfig.innovations[3] },
                { title: 'Datathon', img: imageConfig.innovations[4] },
                { title: 'Automation Hackathon', img: imageConfig.innovations[5] },
              ];
              const innovationImage = innovationImages.find(i => i.title === innov.title)?.img;
              
              return (
                <div
                  key={index}
                  style={{
                    ...styles.card,
                    padding: 0,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    const img = e.currentTarget.querySelector('.innov-img') as HTMLElement;
                    if (img) img.style.transform = 'scale(1.05)';
                    const overlay = e.currentTarget.querySelector('.innov-overlay') as HTMLElement;
                    if (overlay) overlay.style.opacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    const img = e.currentTarget.querySelector('.innov-img') as HTMLElement;
                    if (img) img.style.transform = 'scale(1)';
                    const overlay = e.currentTarget.querySelector('.innov-overlay') as HTMLElement;
                    if (overlay) overlay.style.opacity = '0';
                  }}
                >
                  {/* Background Image with Fade */}
                  {innovationImage && (
                    <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                      <img
                        className="innov-img"
                        src={innovationImage.src}
                        alt={innovationImage.alt}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '100%',
                        background: 'linear-gradient(to top, var(--card) 0%, transparent 60%)',
                      }} />
                      {/* Floating Circuit Pattern Overlay */}
                      <div className="innov-overlay" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        pointerEvents: 'none',
                      }}>
                        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5" style={{ 
                          width: '100%', 
                          height: '100%', 
                          opacity: 0.15,
                          color: 'var(--fg)',
                        }}>
                          <circle cx="30" cy="30" r="15" strokeDasharray="4 4" />
                          <circle cx="170" cy="30" r="15" strokeDasharray="4 4" />
                          <circle cx="30" cy="170" r="15" strokeDasharray="4 4" />
                          <circle cx="170" cy="170" r="15" strokeDasharray="4 4" />
                          <line x1="45" y1="30" x2="155" y2="30" />
                          <line x1="30" y1="45" x2="30" y2="155" />
                          <line x1="170" y1="45" x2="170" y2="155" />
                          <line x1="45" y1="170" x2="155" y2="170" />
                        </svg>
                      </div>
                    </div>
                  )}
                  
                  {/* Content */}
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', gap: '0.5rem' }}>
                      <h3 style={{ fontWeight: 600, fontSize: '0.9375rem', lineHeight: 1.3 }}>{innov.title}</h3>
                      <span style={{ ...styles.tag, flexShrink: 0, fontSize: '0.75rem' }}>{innov.year}</span>
                    </div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.6 }}>{innov.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Honors Section */}
        <section id="honors" style={styles.section}>
          <h2 style={styles.sectionTitle}>{Icons.award} Academic Honors & Fellowships</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {cvData.honors.map((honor, index) => (
              <div key={index} style={{ ...styles.card, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ ...styles.tag, minWidth: '60px', textAlign: 'center' }}>{honor.year}</span>
                <span style={{ fontSize: '0.875rem' }}>{honor.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Volunteering Section */}
        <section id="volunteering" style={styles.section}>
          <h2 style={styles.sectionTitle}>{Icons.heart} Volunteering & Community Service</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {cvData.volunteering.map((v, index) => (
              <div key={index} style={{ ...styles.card, padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 500 }}>{v.period}</span>
                </div>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.5 }}>{v.activity}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Extra-curricular Section */}
        <section id="extracurricular" style={styles.section}>
          <h2 style={styles.sectionTitle}>{Icons.users} Extra-curricular Activities</h2>
          <div style={{ ...styles.card, display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {cvData.extracurricular.map((activity, index) => (
              <span
                key={index}
                style={{
                  ...styles.tag,
                  backgroundColor: 'var(--accent-light)',
                  fontSize: '0.875rem',
                }}
              >
                {activity}
              </span>
            ))}
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards" style={styles.section}>
          <h2 style={styles.sectionTitle}>{Icons.award} Awards & Leadership</h2>
          
          {/* Filters */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', display: 'block' }}>Year</label>
              <select
                value={awardYearFilter}
                onChange={(e) => setAwardYearFilter(e.target.value)}
                style={{ ...styles.input, width: 'auto' }}
              >
                {awardYears.map((year) => (
                  <option key={year} value={year}>{year === 'all' ? 'All Years' : year}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem', display: 'block' }}>Type</label>
              <select
                value={awardTypeFilter}
                onChange={(e) => setAwardTypeFilter(e.target.value)}
                style={{ ...styles.input, width: 'auto' }}
              >
                <option value="all">All Types</option>
                <option value="workplace">Workplace</option>
                <option value="leadership">Leadership</option>
                <option value="academic">Academic</option>
              </select>
            </div>
          </div>

          {/* Awards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredAwards.map((award, index) => (
              <div key={index} style={{ ...styles.card, padding: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{award.award}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span style={{ ...styles.tag, fontSize: '0.75rem' }}>{award.year}</span>
                    <span style={{ ...styles.tag, fontSize: '0.75rem', backgroundColor: award.type === 'workplace' ? '#dcfce7' : award.type === 'leadership' ? '#fef3c7' : '#e0e7ff', color: award.type === 'workplace' ? '#166534' : award.type === 'leadership' ? '#92400e' : '#3730a3' }}>
                      {award.type}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{award.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" style={styles.section}>
          <h2 style={styles.sectionTitle}>{Icons.book} Publications</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cvData.publications.map((pub, index) => (
              <div key={index} style={{ ...styles.card, borderLeft: '4px solid var(--accent)' }}>
                <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', fontStyle: 'italic' }}>{pub.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '0.25rem' }}>
                  <strong>Status:</strong> {pub.status}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
                  <strong>Venue:</strong> {pub.venue}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={styles.section}>
          <h2 style={styles.sectionTitle}>{Icons.email} Contact</h2>
          
          {/* Toggle */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button
              style={{
                ...styles.button,
                ...(contactSource === 'resume' ? styles.buttonPrimary : {}),
              }}
              onClick={() => setContactSource('resume')}
            >
              Resume Contact
            </button>
            <button
              style={{
                ...styles.button,
                ...(contactSource === 'cv' ? styles.buttonPrimary : {}),
              }}
              onClick={() => setContactSource('cv')}
            >
              CV Contact
            </button>
          </div>

          {/* Contact Info */}
          <div style={styles.card}>
            {contactSource === 'resume' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {Icons.phone}
                  <a href="tel:+19297932559" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                    {resumeData.contact.phone}
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {Icons.email}
                  <a href={`mailto:${resumeData.contact.email}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                    {resumeData.contact.email}
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {Icons.linkedin}
                  <a href={`https://${resumeData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                    {resumeData.contact.linkedin}
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {Icons.location}
                  <span>{resumeData.contact.location}</span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  {Icons.location}
                  <span>{cvData.contact.address}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {Icons.phone}
                  <a href="tel:+918300161938" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                    {cvData.contact.phone}
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {Icons.email}
                  <a href={`mailto:${cvData.contact.email}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                    {cvData.contact.email}
                  </a>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {Icons.linkedin}
                  <a href={cvData.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                    {cvData.contact.linkedin}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Languages */}
          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>Language Proficiency</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {cvData.languages.map((lang) => (
                <span key={lang} style={styles.tag}>{lang}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Raw Documents Section */}
        <section id="raw" style={styles.section}>
          <h2 style={styles.sectionTitle}>{Icons.fileText} Raw Documents</h2>
          
          {/* Resume */}
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              style={{
                ...styles.button,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
              }}
              onClick={() => {
                const newExpanded = new Set(expandedRawDocs);
                if (newExpanded.has('resume')) {
                  newExpanded.delete('resume');
                } else {
                  newExpanded.add('resume');
                }
                setExpandedRawDocs(newExpanded);
              }}
              aria-expanded={expandedRawDocs.has('resume')}
            >
              <span style={{ fontWeight: 600 }}>Resume (Verbatim)</span>
              <span style={{ transition: transitionStyle, transform: expandedRawDocs.has('resume') ? 'rotate(180deg)' : 'rotate(0)' }}>
                {Icons.chevronDown}
              </span>
            </button>
            <div
              style={{
                maxHeight: expandedRawDocs.has('resume') ? '1000px' : '0',
                overflow: 'hidden',
                transition: transitionStyle,
              }}
            >
              <pre
                style={{
                  ...styles.card,
                  marginTop: '0.5rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  lineHeight: 1.6,
                  maxHeight: '500px',
                  overflow: 'auto',
                }}
              >
                {RESUME_RAW_TEXT}
              </pre>
            </div>
          </div>

          {/* CV */}
          <div>
            <button
              style={{
                ...styles.button,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '1rem',
              }}
              onClick={() => {
                const newExpanded = new Set(expandedRawDocs);
                if (newExpanded.has('cv')) {
                  newExpanded.delete('cv');
                } else {
                  newExpanded.add('cv');
                }
                setExpandedRawDocs(newExpanded);
              }}
              aria-expanded={expandedRawDocs.has('cv')}
            >
              <span style={{ fontWeight: 600 }}>CV (Verbatim)</span>
              <span style={{ transition: transitionStyle, transform: expandedRawDocs.has('cv') ? 'rotate(180deg)' : 'rotate(0)' }}>
                {Icons.chevronDown}
              </span>
            </button>
            <div
              style={{
                maxHeight: expandedRawDocs.has('cv') ? '2000px' : '0',
                overflow: 'hidden',
                transition: transitionStyle,
              }}
            >
              <pre
                style={{
                  ...styles.card,
                  marginTop: '0.5rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'monospace',
                  fontSize: '0.75rem',
                  lineHeight: 1.6,
                  maxHeight: '500px',
                  overflow: 'auto',
                }}
              >
                {CV_RAW_TEXT}
              </pre>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--border)', marginTop: '2rem' }}>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} {resumeData.contact.name}. Built with Next.js 15.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            Press <kbd style={{ padding: '0.125rem 0.375rem', borderRadius: '0.25rem', backgroundColor: 'var(--accent-light)', fontFamily: 'monospace' }}>?</kbd> for keyboard shortcuts
          </p>
        </footer>
      </main>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            font-size: 10pt;
          }
          header, .controls, button, select, input {
            display: none !important;
          }
          .nav-links {
            display: none !important;
          }
          main {
            padding: 0 !important;
          }
          section {
            page-break-inside: avoid;
          }
        }

        @media (min-width: 768px) {
          .nav-links {
            display: flex !important;
            flex-direction: row !important;
            width: auto !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
            animation: none !important;
          }
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: var(--bg);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--border);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--muted);
        }

        /* Focus styles for accessibility */
        *:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        mark {
          background-color: var(--highlight-bg, #fef08a);
          color: var(--highlight-text, #854d0e);
        }
      `}</style>
    </div>
  );
}
